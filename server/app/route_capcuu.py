import getpass
import oracledb
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor

capcuu = Blueprint('capcuu', __name__)

@capcuu.route('/capcuu', methods=['GET'])
def get_capcuu():
    print("Call API capcuu thành công")
    
    
    return jsonify({"message": "ok"}), 200