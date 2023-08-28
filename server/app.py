from flask import make_response, request, session
from flask_restful import Resource

from config import app, db, api
from models import User, Game, Square
import random

##### Restful Routes
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users)

    def post(self):
        data = request.get_json()

        check_name = User.query.filter_by(username = data.get('username')).first()
        if check_name :
            return make_response({'error' : 'Sorry, username is already taken'}, 404)
        
        try:
            new_user = User(username = data['username'], password_hash = data['password'])
        except Exception as e:
            return make_response({'error' : "Error is: "+ str(e)}, 404)
        
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        
        if user:
            return make_response(user.to_dict(rules=('games_won',)))
        else:
            return make_response({"error" : "no user exists"}, 404)

    # def patch(self, id):
    #     pass

    # def delete(self, id):
    #     user = User.query.filter_by(id=id).first()
    #     if user:
    #         db.session.delete(user)
    #         db.session.commit()
    #         return make_response({}, 204)
    #     else:
    #         return make_response({"error":"invalid user: Does not exist"}, 404)

api.add_resource(UserById, '/users/<int:id>')

class Squares(Resource):
    def get(self):
        all_squares = [square.to_dict() for square in Square.query.all()]
        return make_response(all_squares)

    def post(self):
        data = request.get_json()
        check_square = Square.query.filter(Square.board_pos == data.get('board_pos')).first()

        
        if check_square:
            return make_response({"error": "this tile was already selected by someone"}, 402)
        
        try:
            new_square = Square(board_pos = data['board_pos'], user_id = data['user_id'])
        except Exception as e:
            return make_response({"error" : f"invalid request: {str(e)} "}, 422)
        
        db.session.add(new_square)
        db.session.commit()
        return make_response(new_square.to_dict(), 201)
    
    def delete(self):
        Square.query.delete()
        db.session.commit()
        return make_response({}, 204)

api.add_resource(Squares, '/squares')

class SquaresById(Resource):
    def get(self, id):
        square = Square.query.filter_by(id=id).first()
        
        if square:
            return make_response(square.to_dict())
        else:
            return make_response({"error" : "no square exists"}, 404)

    def patch(self, id):
        square = Square.query.filter_by(id=id).first()
        data = request.get_json()
        if not square :
            return make_response({"error" : "no square exists"}, 404)
        
        try:
            for attr in data:
                setattr(square, attr, data[attr])
        except Exception as e:
            return make_response({"error" : f"invalid request: {str(e)} "}, 404)

        db.session.commit()
        return make_response(square.to_dict())

    def delete(self, id):
        square = Square.query.filter_by(id=id).first()
        if square:
            db.session.delete(square)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error":"invalid square: Does not exist"}, 404)

api.add_resource(SquaresById, '/squares/<int:id>')

class Games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]
        return make_response(games)
    
    def post(self):
        data = request.get_json()
        try:
            new_game = Game(win_score = data['win_score'], 
                            lose_score = data['lose_score'], 
                            round = data['round'], 
                            win_team = data['win_team'], 
                            lose_team = data['lose_team'],
                            square_id = data['square_id'])
        except Exception as e:
            return make_response({"error" : f"invalid request: {str(e)} "}, 404)
        
        db.session.add(new_game)
        db.session.commit()
        return make_response(new_game.to_dict())

api.add_resource(Games, '/games')

class GameById(Resource):
    def get(self, id):
        game = Game.query.filter_by(id=id).first()
        
        if game:
            return make_response(game.to_dict())
        else:
            return make_response({"error" : "no game exists"}, 404)
        
    def patch(self, id):
        game = Game.query.filter_by(id=id).first()
        data = request.get_json()
        if not game :
            return make_response({"error" : "no game exists"}, 404)
        
        try:
            for attr in data:
                setattr(game, attr, data[attr])
        except Exception as e:
            return make_response({"error" : f"invalid request: {str(e)} "}, 404)      

        db.session.commit()
        return make_response(game.to_dict()) 

api.add_resource(GameById, '/games/<int:id>')

class BoardById (Resource):
    def get(self, id):
        pass

    def patch(self, id):
        pass

api.add_resource(BoardById, '/boards/<int:id>')
###Individual Views#########
#Login view
@app.route('/login', methods = ["POST"])
def login():
    data = request.get_json()
    username, password = data.values()
    user = User.query.filter_by(username = username).first()

    if not user:
        return make_response({'error' : f'User: {username} not found'}, 404)

    if user.authenticate(password):
        session['user_id'] = user.id
        return make_response(user.to_dict(rules = ('-_password_hash',)))
    else:
        return make_response({'error' : "Password is incorrect"}, 404)

#Logout view
@app.route('/logout', methods = ["DELETE"])
def logout():
    session['user_id'] = None
    return make_response({}, 204)

#check session view
@app.route('/checksession')
def check_session():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return make_response(user.to_dict())
    else:
        return make_response({'message': 'Unauthorized'}, 401)
    
#randomly fill out remaining ssquares on board
@app.route('/fillboard', methods = ["POST"])
def fill_board():
    data = request.get_json()
    print(data)
    sq_num_list = data['empty_squares']
    if len(sq_num_list) == 0:
        return make_response({"error" : f"All squares filled"}, 404)
    print(sq_num_list)
    dict_list = []
    for num in sq_num_list:
        user = random.choice(User.query.all())
        try:
            new_square = Square(board_pos = num, user_id = user.id)
            db.session.add(new_square)
            db.session.commit()
        except Exception as e:
            return make_response({"error" : f"invalid request: {str(e)} "}, 404)
        
        dict_list.append(new_square.to_dict())
    return make_response(dict_list, 201)

#srubs the games database from having assigned squares
@app.route('/scrubgames', methods = ["DELETE"])
def scrub_games():
    for game in Game.query.all():
        game.square_id = None
    
    db.session.commit()
    return make_response({}, 204)


#get Leaderboards
@app.route('/leaderboard')
def get_leaderboard():
    # leader_list = db.session.query(User, db.func.count(Game.id).label('games_won')).join(User.squares).join(Square.games).group_by(User.id).order_by(db.desc('games_won')).all()
    # res_dict_list = []
    # for tuple in leader_list:
    #     res_dict = tuple[0].to_dict(only=('username', 'id'))
    #     res_dict['games_won'] = tuple[1]
    #     res_dict_list.append(res_dict)
    #     return make_response(res_dict_list)
    leaders = [user.to_dict(only = ('username', 'id', 'games_won')) for user in User.query.all()]
    is_sorted = sorted(leaders, key = lambda x : x['games_won'], reverse=True)
    return make_response(is_sorted)

if __name__ == '__main__':
    app.run(port=5555, debug = True)