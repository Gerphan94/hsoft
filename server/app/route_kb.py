
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now, schema_mutil

kb = Blueprint('kb', __name__)


@kb.route('/khambenh/<site>/<ngay>', methods=['GET'])
def khambenh(site , ngay):
    imonth = ngay[4:6]
    iyear = ngay[2:4]
    schema = "HSOFTTAMANH" + imonth + iyear

    cursor = get_cursor(site)
    result = []
    
    stm = f'''
        SELECT A.MABN, C.HOTEN,
        CASE
            WHEN C.PHAI = 0 THEN 'Nam'
            ELSE 'Nữ'
        END AS PHAI,
        TO_CHAR(C.NGAYSINH, 'dd/MM/yyyy') as NGAYSINH  , B.TENKP, D.DOITUONG, TO_CHAR(A.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAYTN,
        TO_CHAR(E.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAYKB, A.DONE,
        E.MAVAOVIEN, E.MAQL AS MAQLKB, A.MAQL AS MAQLTN
        FROM {schema}.TIEPDON A
        INNER JOIN HSOFTTAMANH.BTDKP_BV B ON A.MAKP = B.MAKP
        INNER JOIN HSOFTTAMANH.BTDBN C ON A.MABN  = C.MABN
        INNER JOIN HSOFTTAMANH.DOITUONG D ON A.MADOITUONG = D.MADOITUONG
        LEFT  JOIN {schema}.BENHANPK E ON A.MAVAOVIEN = E.MAVAOVIEN AND A.MAKP = E.MAKP
        
        
        WHERE  TO_CHAR(A.NGAY, 'yyyyMMdd') = '{ngay}'
        ORDER BY A.NGAY ASC
    '''
    
    khambenhs = cursor.execute(stm).fetchall()
    for kb in khambenhs:
        
        kb_maql = kb[10]
        result.append({
            "mabn": kb[0],
            "hoten": kb[1],
            "phai": kb[2],
            "ngaysinh": kb[3],
            "tenkp": kb[4],
            "doituong": kb[5],
            "ngaytn": kb[6],
            "ngaykb": kb[7],
            "done": kb[8],
            'mavaovie': kb[9],
            'maqlkb': kb[10],
            'maqltn': kb[11]  
        })

    return jsonify(result)