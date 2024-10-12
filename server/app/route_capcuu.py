
from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor
from flasgger import swag_from

capcuu = Blueprint('capcuu', __name__)

@capcuu.route('/capcuu', methods=['GET'])
@swag_from({
    'tags': ['CapCuu'],
    'summary': 'Get Cap cuu',
    'description': 'This endpoint retrieves Danh Muc data.',
    'responses': {
        200: {
            'description': 'Success message',
            'examples': {
                'application/json': {
                    'message': 'ok'
                }
            }
        }
    }
})
def get_capcuu():
    """
    Get Danh Muc data
    ---
    responses:
      200:
        description: Returns Danh Muc data
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: ok
    """
    print("Call API capcuu thành công")
    return jsonify({"message": "ok"}), 200

@capcuu.route('/test', methods=['GET'])
@swag_from({
   'tags': ['Test'],
   'summary': 'Test Route',
   'responses': {
       200: {
           'description': 'Success message',
           'examples': {
               'application/json': {
                   'message': 'test ok'
               }
           }
       }
   }
})
def test_route():
   return jsonify({"message": "test ok"}), 200
