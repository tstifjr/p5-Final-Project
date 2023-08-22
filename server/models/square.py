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
    
    @validates('board_pos')
    def validate_board_pos(self, key, new_board_pos):
        if not isinstance(new_board_pos, int):
            raise TypeError ('needs to be a number')
        elif not new_board_pos in range(0,100):
            raise ValueError ('needs to be a number betweeen 0 and 99')
        elif Square.query.filter_by(board_pos=new_board_pos).first():
            raise ValueError ('board position unavailable')

        return new_board_pos

    @validates('col_num', 'row_num')
    def validate_col_row(self, key, new_num):
        if not isinstance(new_num, int) and not new_num == None:
            raise TypeError ('needs to be a number')     
        elif not new_num in range(0,10) and not new_num == None:
            raise ValueError ('needs to be a number betweeen 0 and 9')

        return new_num       
        
    def __repr__(self):
        return f'<Square {self.id}, Pos: {self.board_pos}, ({self.col_num},{self.row_num})>'