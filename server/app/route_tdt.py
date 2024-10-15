import getpass
import oracledb
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor

tdt = Blueprint('tdt', __name__)

@tdt.route('/tdt/dien-bien/<site>/<pid>/<idkhoa>', methods=['GET'])
def get_tdt(site, pid, idkhoa):
   """
   Diễn biến bệnh
   ---
   tags:
      - Tờ điều trị
   responses:
      200:
        description: Success
        content:
          application/json:
            schema:
               type: object
               properties:
                  message:
                  type: string
                  example: ok
    """
   cursor = get_cursor(site)
   query = f'''
      
   '''
    
   
   return jsonify({"message": "ok"}), 200