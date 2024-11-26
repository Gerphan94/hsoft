from flask import Flask, jsonify, request, Blueprint
from .db import get_cursor
from datetime import datetime


dsphieu = Blueprint('dsphieu', __name__)
default_date = datetime.now().strftime('%Y%m%d') 

@dsphieu.route('/dsphieu/theodoi-khangsinh', methods=['GET'])
def get_dsphieu_theodoikhangsinh():

    """
    Theo dõi kháng sinh
    ---
    tags:
      - Danh sách phiếu
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: fromdate
        in: query
        type: number
        required: true
        description: YYYYMMDD
      - name: todate
        in: query
        type: number
        required: true
        description: YYYYMMDD
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
    def check_date(date):
        if len(date) != 8:
            return False
        try:
            datetime.strptime(date, '%Y%m%d')
            return True
        except ValueError:
            return False


    site = request.args.get('site')
    fromdate = request.args.get('fromdate')
    todate = request.args.get('todate')

    if not check_date(fromdate) or not check_date(todate):
        return jsonify({'error': 'Invalid date format'}), 400
    
    cursor = get_cursor(site)
    
    def get_ds_khoa(fromdate, todate):
      stm = f'''
        SELECT DISTINCT KHOADIEUTRI , TENKHOADIEUTRI 
        FROM  TA_KHANGSINHLL 
        WHERE ISACTIVE = 1 AND PHACDO IS NOT NULL AND NGAY BETWEEN TO_DATE({fromdate}, 'YYYYMMDD') AND TO_DATE({todate}, 'YYYYMMDD')
        ORDER BY KHOADIEUTRI
      '''
      result = []
      data = cursor.execute(stm).fetchall()
      for d in data:
        result.append(dict(zip(['idkhoa', 'tenkhoa'], d)))
      return data
    
    def get_danhsach_by_khoa(fromdate, todate, makp):
      cols_name = ['idkhoa', 'idtrack', 'mabn', 'hoten', 'ngaybatdau', 'ngayketthuc', 'phacdo', 'giaidoan', 'songaydieutri']
      stm = f'''
          SELECT DISTINCT TO_CHAR(A.IDKHOA) AS IDKHOA , A.IDTRACK, A.MABN, B.HOTEN, A.NGAYBATDAU, A.NGAYKETHUC, A.PHACDO , A.GIAIDOAN , A.KHOANGNGAYDIEUTRI
          FROM TA_KHANGSINHLL A
          INNER JOIN BTDBN B ON A.MABN = B.MABN
          WHERE A.NGAY BETWEEN TO_DATE({fromdate}, 'YYYYMMDD') AND TO_DATE({todate}, 'YYYYMMDD') 
          AND A.KHOADIEUTRI = {makp}
          AND A.ISACTIVE = 1 
          AND A.PHACDO IS NOT NULL
      '''
      result = []
      for data in cursor.execute(stm).fetchall():
        obj = dict(zip(cols_name, data))
        idtrack = data[1]
        stm = f'''
          SELECT B.ID,  B.TENBD || ' (' || B.TENHC || ')' AS TENTHUOC, B.SOLUONG , B.NGAYKS, B.DUYETKS, A.NGAYYLENH
          FROM TA_KHANGSINHLL A
          INNER JOIN TA_KHANGSINHCT B ON A.IDTRACK = B.IDTRACK
          WHERE A.IDTRACK = {idtrack} AND A.ISACTIVE = 1 AND a.PHACDO IS NOT NULL
        '''
        detail = cursor.execute(stm).fetchall()
        detail_ar = []
        for d in detail:
          detail_ar.append(dict(zip(['id','tenthuoc', 'soluong', 'ngayks', 'duyetks', 'ngayylenh'], d)))
        obj['detail'] = detail_ar
        result.append(obj)
      return result
    
    result = []
    data_by_khoa = get_ds_khoa(fromdate, todate)
    for data in data_by_khoa:
      obj = dict(zip(['makp', 'tenkhoa'], data))
      obj['partients'] = get_danhsach_by_khoa(fromdate, todate, data[0])
      result.append(obj)
    return jsonify(result), 200
      
    
   
    
  