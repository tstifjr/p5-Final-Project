from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Square(db.Model, SerializerMixin):
    __tablename__ = "squares"

    id = db.Column(db.Integer, primary_key=True)
    board_pos = db.Column(db.Integer, nullable=False)
    row_num = db.Column(db.Integer)
    col_num = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    def __repr__(self):
        return f'<Square {self.board_pos} : W: {self.col_num}, L: {self.row_num}>'