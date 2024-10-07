import getpass
import oracledb
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor

tdt = Blueprint('tdt', __name__)

@tdt.route('/tdt', methods=['GET'])
def get_tdt():
   print("Call API tdt")
   return jsonify({"message": "ok"}), 200