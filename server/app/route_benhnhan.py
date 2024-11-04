from flask import Flask, jsonify, request, Blueprint
from .db import get_cursor

benhnhan = Blueprint('benhnhan', __name__)

@benhnhan.route('/benhnhan/get-random-benhnhan/<site>', methods=['GET'])
def benhnhan_get_random_benhnhan(site):
    """
    Random Bệnh nhân List
    ---
    tags:
      - Bệnh nhân
    parameters:
      - name: site
        in: path
        type: string
        required: true
        description: Site (HCM_DEV, HN_DEV,...)
        default: HCM_DEV
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
    year_ar == [23, 24]
    random_year = random.choice(year_ar)
    
    cursor = get_cursor(site)
    
    stm = '''
        SELECT
            A.MABN
        FROM
            BTDBN A
        INNER JOIN DIENTHOAI B ON
            A.MABN = B.MABN
        WHERE
            A.MABN LIKE '23%'
            AND LENGTH(B.DIDONG) > 9
            AND HOTEN NOT LIKE '%TEST%'
            AND A.MANN IS NOT NULL
            AND A.MADANTOC IS NOT NULL
        ORDER BY
            DBMS_RANDOM.VALUE,
            A.MABN
        FETCH FIRST 20 ROWS ONLY;
    '''
    results = cursor.execute(stm).fetchall()
    return jsonify(results)
