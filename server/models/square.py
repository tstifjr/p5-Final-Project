from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Square(db.Model, SerializerMixin):
    __tablename__ = "squares"

    serialize_rules = ('-user.squares', '-games.square')

    id = db.Column(db.Integer, primary_key=True)
    board_pos = db.Column(db.Integer, nullable=False)
    row_num = db.Column(db.Integer)
    col_num = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'squares')
    games = db.relationship('Game', back_populates = 'square')
    
    def __repr__(self):
        return f'<Square {self.id}, Pos: {self.board_pos}, (W,L) : ({self.col_num},{self.row_num})>'