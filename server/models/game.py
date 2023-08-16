from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    win_score = db.Column(db.Integer)
    lose_score = db.Column(db.Integer)
    round = db.Column(db.Integer)
    win_team = db.Column(db.String)
    lose_team = db.Column(db.String)
    square_id = db.Column(db.Interger, db.ForeignKey('squares.id'))

    def __repr__(self):
        return f'<Game {self.id} : Score: {self.win_score} : {self.lose_score}>'