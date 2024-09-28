
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now

noitru = Blueprint('noitru', __name__)


@noitru.route('/noitru/dskhoa/<site>', methods=['GET'])
def noitru_dskhoa(site):
    cursor = get_cursor(site)
    result = []
    stm = 'SELECT * FROM BTDKP_BV WHERE LOAI = 0 AND KHAMBENH = 0'
    khoas = cursor.execute(stm).fetchall()
    for khoa in khoas:
        result.append({
            'id': khoa[0],
            'name': khoa[1]
        })
    return jsonify(result)

@noitru.route('/noitru/danhsach-khoaphong/<site>', methods=['GET'])
def get_khoaphong(site):
    """
    Get a list of all department IDs and names for a given site.
    """
    cursor = get_cursor(site)
    stm = '''
        SELECT DISTINCT B.MAKP AS ID , B.TENKP AS NAME 
        FROM D_DUOCKP A
        INNER JOIN BTDKP_BV B ON A.MAKP = B.MAKP
        ORDER BY B.TENKP ASC
    '''
    departments = cursor.execute(stm).fetchall()
    result = [
        {'id': department[0], 'name': department[1]}
        for department in departments
    ]
    return jsonify(result)
