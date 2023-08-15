from flask import make_response, request
from flask_restful import Resource

from config import app, db, api
from models import User

@app.route('/login', methods = ["POST"])
def login():
    data = request.get_json()

    if data['username']:
        return make_response({"message": "recevied username"})
    else:
        return make_response({'message' : "DEfault Error"}, 404)

@app.route('/signup', methods = ["POST"])
def signup():
    data = request.get_json()

    if data['username']:
        return make_response({"message": f"user {data['username']} has been signed in"})
    else:
        return make_response({'message' : "DEfault Error"}, 404)
    
@app.route('/index')
def index():
    return make_response({"message" : "welcome to my app"})



if __name__ == '__main__':
    app.run(port=5555, debug = True)