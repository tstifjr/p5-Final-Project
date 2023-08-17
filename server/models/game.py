from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    serialize_rules = ('-square.games', '-square.user')

    id = db.Column(db.Integer, primary_key=True)
    win_score = db.Column(db.Integer)
    lose_score = db.Column(db.Integer)
    round = db.Column(db.Integer)
    win_team = db.Column(db.String)
    lose_team = db.Column(db.String)
    square_id = db.Column(db.Integer, db.ForeignKey('squares.id'))

    square = db.relationship('Square', back_populates='games')
    user = association_proxy('square', 'user')

    def __repr__(self):
        return f'<Game {self.id} : Score: {self.win_score} : {self.lose_score}>'