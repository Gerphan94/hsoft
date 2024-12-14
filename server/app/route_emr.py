
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now, schema_mutil

emr = Blueprint('emr', __name__)





@emr.route('/emr/danhmuc-bieumau-emr', methods=['GET'])
def emr_dm_bieumau_emr():
  """
    Get Danh mục biểu mẫu EMR
    ---
    tags:
      - EMR
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
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
  site = request.args.get('site')
  cursor = get_cursor(site)
  
 
  
  
    
  
  
  result = []
  
  stm = f'''
    SELECT
      B.ID AS IDGAY,
      B.TEN AS TENGAY,
      A.ID AS IDBIEUMAU,
      A.MAPHIEU,
      A.GHICHU AS TENMAU,
      A.STT,
      A.SLKYSO ,
      A.LOAIPHIEU ,
      A.CHOPHEPXOA
    FROM E_DMBIEUMAU A
    INNER JOIN E_DMGAY B ON A.GAYID = B.ID
    ORDER BY A.GAYID, A.ID
  '''
  col_names = ['idgay', 'tengay', 'idbieumau', 'maphieu', 'tenmau', 'stt', 'slkyso', 'loaiphieu', 'chophepxoa']
  bieumau = cursor.execute(stm).fetchall()
  for bieumau in bieumau:
      result.append(dict(zip(col_names, bieumau)))
  

  return jsonify(result), 200
  
@emr.route('/emr/danhsach-pck-thuoc/<site>/<pid>', methods=['GET'])
def emr_ds_pck_thuoc(site, pid):
    """
    Get Danh sách phiếu công khai thuốc
    ---
    tags:
      - EMR
    parameters:
      - name: site
        in: path
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: pid
        in: path
        type: string
        required: true
        description: Mã bệnh nhân
     
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
    result =[]
    cursor = get_cursor(site)
    col_names = ['id', 'sophieu', 'makp', 'tenkp', 'ngay', 'ngaytao', 'ngaycapnhat']
    stm1 = f'''
        SELECT
            ID,
            SOPHIEU,
            MAKP,
            TENKP,
            TO_CHAR(NGAY, 'dd/MM/yyyy') AS NGAY,
            TO_CHAR("CreateDate" ,'dd/MM/yyyy HH24:Mi' ) AS NGAYTAO,
            TO_CHAR("LastUpdateDate" ,'dd/MM/yyyy HH24:Mi' ) AS NGAYCAPNHAT
        FROM
            HSOFTTAMANH.PCK_THUOC pt
        WHERE
            MABN = :pid
    '''
    
    stm2 = f'''
    
    '''
    
    
    pckll = cursor.execute(stm1, {'pid': pid}).fetchall()
    for pck in pckll:
        
        result.append(dict(zip(col_names, pck)))
        idphieu = pck[0]
        
        
    return jsonify(result)
