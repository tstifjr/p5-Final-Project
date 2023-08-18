from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-_password_hash', '-squares.user', '-squares.games', 'games_won')
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    squares = db.relationship('Square', back_populates='user', cascade = "all, delete-orphan")
    _games = association_proxy('squares', 'games')
    
    @property
    def games(self):
        list = [l for l in self._games if l != []]
        return [el for item in list for el in item]
    
    @hybrid_property
    def games_won(self):
        return len(self.games)
    
    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_password):
        encrypted_hashword = bcrypt.generate_password_hash(new_password.encode('utf-8'))
        hashword_str = encrypted_hashword.decode('utf-8')
        self._password_hash = hashword_str

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.id}: {self.username}>'