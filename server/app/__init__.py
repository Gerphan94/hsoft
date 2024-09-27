from flask import Flask, session, g
from flask_cors import CORS
import oracledb
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import json
import os, sys
# from .route_main import main
from .route_danhmuc import dm
from .route_duoc import duoc
from .route_noitru import noitru
# SECRET_KEY = os.urandom(24)
SECRET_KEY = "th3DC0d3v3ryS3cr3tK3y"

    # Close the connection and cursor when the request ends
# @app.teardown_appcontext
# def close_db_connection(exception):
#     cursor = g.pop('cursor', None)
#     if cursor is not None:
#         cursor.close()
        
#     db = g.pop('db', None)
#     if db is not None:
#         db.close()
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.register_blueprint(dm)
    app.register_blueprint(duoc)
    app.register_blueprint(noitru)

    return app
