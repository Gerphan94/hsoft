from flask import Flask, jsonify, request, Blueprint
from .db import get_cursor
import random
import datetime
benhnhan = Blueprint('benhnhan', __name__)

@benhnhan.route('/benhnhan/get-random-benhnhan', methods=['GET'])
def benhnhan_get_random_benhnhan():
    """
    Random Bệnh nhân List
    ---
    tags:
      - Bệnh nhân
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: Site (HCM_DEV, HN_DEV,...)
        default: HCM_DEV
      - name: type
        in: query
        type: number
        required: true
        description: 
        default: 0
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
    site = request.args.get('site')
    itype = int(request.args.get('type'))
    cursor = get_cursor(site)

    def get_benhnhan_noitru_bhyt():
      today = datetime.datetime.now().strftime('%Y%m%d')
      stm = f'''
        SELECT A.MABN, B.HOTEN, B.PHAI
        FROM BHYT A
        INNER JOIN BTDBN B ON A.MABN = B.MABN
        INNER JOIN DIENTHOAI C ON C.MABN = A.MABN
        WHERE
          A.SUDUNG = 1
          AND LENGTH(C.DIDONG) > 9
          AND HOTEN NOT LIKE '%TEST%'
          AND B.MANN IS NOT NULL
          AND B.MADANTOC IS NOT NULL
          AND TO_DATE(TO_CHAR(A.DENNGAY, 'YYYYMMDD'), 'YYYYMMDD') > TO_DATE({today}, 'YYYYMMDD')
        ORDER BY
          DBMS_RANDOM.VALUE,
          A.MABN
        FETCH FIRST 20 ROWS ONLY
      '''
      return cursor.execute(stm).fetchall() 
    
    def get_benhnhan_default():
      year_ar = [23, 24]
      random_year = random.choice(year_ar)
      stm = f'''
          SELECT A.MABN, A.HOTEN, A.PHAI
          FROM BTDBN A
          INNER JOIN DIENTHOAI B ON A.MABN = B.MABN
          WHERE
              A.MABN LIKE '{random_year}%'
              AND LENGTH(B.DIDONG) > 9
              AND HOTEN NOT LIKE '%TEST%'
              AND A.MANN IS NOT NULL
              AND A.MADANTOC IS NOT NULL
          ORDER BY
              DBMS_RANDOM.VALUE,
              A.MABN
          FETCH FIRST 20 ROWS ONLY
      '''
      return cursor.execute(stm).fetchall()
    
    if itype == 1 :
      benhnhans = get_benhnhan_noitru_bhyt()
    else:
      benhnhans = get_benhnhan_default()
    
    results = []
    for benhnhan in benhnhans:
        results.append({'mabn': benhnhan[0], 'hoten':  benhnhan[1], 'phai': benhnhan[2]})
    return jsonify(results), 200
