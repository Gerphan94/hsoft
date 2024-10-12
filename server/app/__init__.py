from flask import Flask, session, g
from flask_cors import CORS
import oracledb
from flask import Flask, jsonify, request
from flask_cors import CORS
from flasgger import Swagger

# from .route_main import main
from .route_danhmuc import dm
from .route_duoc import duoc
from .route_noitru import noitru
from .route_sql import sql
from .route_kb import kb
from .route_tdt import tdt
# SECRET_KEY = os.urandom(24)
SECRET_KEY = "th3DC0d3v3ryS3cr3tK3y"

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/*": {"origins": "*"}})
    swagger = Swagger(app, template={
    "info": {
        "title": "Hsoft API",
        "description": "An example API using Flask and Swagger",
        "version": "1.0.0"
    }
})

    app.register_blueprint(dm)
    app.register_blueprint(duoc)
    app.register_blueprint(noitru)
    app.register_blueprint(sql)
    app.register_blueprint(kb)
    app.register_blueprint(tdt)

    return app