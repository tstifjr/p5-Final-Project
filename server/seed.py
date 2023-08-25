import random
import math


from app import app
from config import db
from models import User, Square, Game
import random

class Score:
    all = []
    def __init__(self, home_score, away_score, clock):
        self.home_score = home_score
        self.away_score = away_score
        self.clock = clock
        Score.all.append(self)
    
    def __repr__(self):
        return f"<Time Remaining: {self.clock}, Home: {self.home_score}, Away: {self.away_score}>"
    

def half_sim(h=0, a=0, t=20):
    l = random.randint(22,25)
    tr = t
    for i in range(l):
        tr = tr - (t/l)
        tuple = math.modf(tr)
        clock = f'{int(tuple[1])}:{round(tuple[0] * 60)}'
        h+= random.randint(0,3)
        a+= random.randint(0,3)
        Score(h, a, clock) 

    # print(Score.all[-1])
    return(Score.all[-1])

# at_half = half_sim()
# final = half_sim(at_half.home_score, at_half.away_score)

team_list = [
    "Duke Blue Devils",
    "North Carolina Tar Heels",
    "Kentucky Wildcats",
    "Kansas Jayhawks",
    "Michigan State Spartans",
    "Villanova Wildcats",
    "Gonzaga Bulldogs",
    "UCLA Bruins",
    "Arizona Wildcats",
    "Syracuse Orange",
    "Texas Longhorns",
    "Florida Gators",
    "Louisville Cardinals",
    "Indiana Hoosiers",
    "Ohio State Buckeyes",
    "Wisconsin Badgers",
    "Michigan Wolverines",
    "Maryland Terrapins",
    "Oregon Ducks",
    "Virginia Cavaliers",
    "North Carolina State Wolfpack",
    "Iowa Hawkeyes",
    "Purdue Boilermakers",
    "West Virginia Mountaineers",
    "Illinois Fighting Illini",
    "Tennessee Volunteers",
    "Arkansas Razorbacks",
    "Auburn Tigers",
    "Houston Cougars",
    "Colorado Buffaloes"
]

if __name__ == "__main__":
    with app.app_context():
        print('...Deleting Users')
        User.query.delete()
        print("...seeding Users")
        u1 = User(username="tjstifter", password_hash = "qweqweqwe")
        u2 = User(username="tesj20", password_hash = "qazqazqaz")
        u3 = User(username="user111", password_hash = "user1user")
        u4 = User(username ="user222", password_hash = "user2user")
        u5 = User(username ="basketwhiz", password_hash = "bball1")
        u6 = User(username ="magicmoe", password_hash = "bball2")
        u7 = User(username ="terpfan1", password_hash = "terp2win")
        db.session.add_all([u1, u2, u3, u4, u5, u6, u7])
        db.session.commit()

        print('...Deleting Squares')
        Square.query.delete()
        print("...seeding squares")
        rand_num_list = random.sample(range(0,100), 70)
        squares_list = []
        for i in range(0,70):
            sq = Square(user_id = random.randint(1,7), board_pos = rand_num_list[i])
            squares_list.append(sq)
        
        db.session.add_all(squares_list)
        db.session.commit()

        print("...Deleting Games")
        Game.query.delete()
        print("...seeding games")
        game_list = []
        
        for i in range(1,41):
            rand_round = random.choice([64, 32, 16, 8, 4, 2])
            rand_teams = random.sample(team_list, 2)
            
            at_half = half_sim()
            # rand_sq = random.choice(squares_list)
            # win_score = max([at_half.home_score, at_half.away_score])
            # lose_score = min([at_half.home_score, at_half.away_score])
            
            # game1 = Game(round = rand_round, win_team = rand_teams[0], lose_team = rand_teams[1], square_id = rand_sq.id, win_score = win_score, lose_score = lose_score)
            
            # game_list.append(game1)
            final = half_sim(at_half.home_score, at_half.away_score)
            rand_sq = random.choice(squares_list)
            win_score = max([final.home_score, final.away_score])
            lose_score = min([final.home_score, final.away_score])

            game2 = Game(round = rand_round, win_team = rand_teams[0], lose_team = rand_teams[1], win_score = win_score, lose_score = lose_score)

            game_list.append(game2)

        db.session.add_all(game_list)
        db.session.commit()
