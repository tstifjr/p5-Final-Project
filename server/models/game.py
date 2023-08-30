from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    serialize_rules = ('-square.games', '-square.user', 'user', '-user.games', '-user.squares')

    id = db.Column(db.Integer, primary_key=True)
    win_score = db.Column(db.Integer)
    lose_score = db.Column(db.Integer)
    round = db.Column(db.Integer)
    win_team = db.Column(db.String)
    lose_team = db.Column(db.String)
    square_id = db.Column(db.Integer, db.ForeignKey('squares.id'))

    square = db.relationship('Square', back_populates='games')
    user = association_proxy('square', 'user')

    @validates('win_score', 'lose_score')
    def validate_scores(self, key, new_score):
        if not isinstance(new_score, int):
            raise ValueError('Must be a number')
        
        return new_score

    @validates('win_team', 'lose_team')
    def validate_teams(self, key, new_team):
        if not isinstance(new_team, str):
            raise ValueError('Must be a string')
        
        return new_team
    
    @validates('round')
    def validate_round(self, key, new_round):
         if not isinstance(new_round, int):
            raise ValueError('Must be a number')
         elif new_round == 1 or (not (new_round and (not(new_round & (new_round-1))) ) ) :
             raise ValueError('Not a viable round')
         
         return new_round
        
    def __repr__(self):
        return f'<Game {self.id} : Score: {self.win_score} : {self.lose_score}>'