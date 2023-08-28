from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Board(db.Model, SerializerMixin):
    __tablename__ = "boards"

    id = db.Column(db.Integer, primary_key = True)
    colnums = db.Column(db.String)
    rownums = db.Column(db.String)
    game_cnt = db.Column(db.Integer)
    empty_squares = db.Column(db.Integer)

    # can add one-to-many relationship with squares at some point

    def __repr__(self):
        return f'<Board: {self.id}>'