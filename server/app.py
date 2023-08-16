from flask import make_response, request, session
from flask_restful import Resource

from config import app, db, api
from models import User

#User RESTful Resources
class Users(Resource):
    def get(self):
        pass

    def post(self):
        data = request.get_json()
        username, password = data.values()

        # check for available name...
        check_name = User.query.filter_by(username = username).first()
        if check_name :
            return make_response({'error' : 'Sorry, username is already taken'}, 404)
        
        try:
            new_user = User(username = username, password_hash = password)
        except Exception as e:
            return make_response({'error' : "Error is: "+ str(e)}, 404)
        
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(only=('username',)), 201)
    
api.add_resource(Users, '/users')
class UserById(Resource):
    def get(self):
        pass

    def patch(self):
        pass

    def delete(self):
        pass

api.add_resource(UserById, '/users/<int:id>')
class Squares(Resource):
    def get(self):
        pass

    def post(self):
        pass

api.add_resource(Squares, '/squares')

class SquaresById(Resource):
    def get(self):
        pass

    def patch(self):
        pass

    def delete(self):
        pass

api.add_resource(SquaresById, '/squares/<int:id>')

# class Games(Resource):
#     def get(self):
#         pass

#     def post(self):
#         pass

# app.add_resource(Games, '/games')

# class GameById(Resource):
#     def get(self):
#         pass

# app.add_resource(GameById, '/games/<int:id>')

###Individual Views
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
        return make_response(user.to_dict(only = ('username',)))
    else:
        return make_response({'error' : "Password is inccorect"}, 404)

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
        return make_response(user.to_dict(only=('username',)))
    else:
        return make_response({'message': 'Unauthorized'}, 401)


if __name__ == '__main__':
    app.run(port=5555, debug = True)