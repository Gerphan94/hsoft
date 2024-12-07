
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
  
  def get_gays():
    result = []
    stm = f"SELECT ID, TEN FROM E_DMGAY ORDER BY STT"
    gays = cursor.execute(stm).fetchall()
    for gay in gays:
      obj = dict(zip(['idgay', 'tengay'], gay))
      result.append(obj)
    return result
  
  def get_bieumaus():
    result = []
    stm = f"SELECT ID, MAPHIEU, SLKYSO, GHICHU AS TENBIEUMAU, LOAIPHIEU, TRANGTHAI, CHOPHEPXOA FROM E_DMBIEUMAU WHERE GAYID = '{idgay}'"
    col_names = ['idbieumau', 'maphieu', 'slkyso', 'tenbieumau', 'loaiphieu', 'trangthai', 'chophepxoa']
    bieumaus = cursor.execute(stm).fetchall()
    for bieumau in bieumaus:
     result.append(dict(zip(col_names, bieumau)))
    return result
    
  def get_bieumauky(idbieumau):
    result = []
    stm = f'''
        SELECT A.STT, A.THUTUKY,A.GHICHU , A.ANCHOR , A.DORONG , A.CHIEUCAO , A.LECHTREN , A.LECHTRAI  ,  B.TEN AS VAITRO, C.TEN AS LOAIKY
        FROM E_DMBIEUMAUKY A
        LEFT JOIN E_DMVAITRO B ON A.VAITRO = B.ID
        INNER JOIN E_DMLOAIKY C ON A.LOAI = C.ID 
        WHERE BIEUMAUID = {idbieumau}
      '''
    col_names = ['stt', 'thutuky', 'ghichu', 'anchor', 'dorong', 'chieucao', 'lechtren', 'lechtrai', 'vaitro', 'loai']
    kys = cursor.execute(stm).fetchall()
    for ky in kys:
      obj = dict(zip(col_names, ky))
      result.append(obj)
    return result
  
  result = []
  gays = get_gays()
  for gay in gays:
    idgay = gay['idgay']
    bieumaus = get_bieumaus()
    for bieumau in bieumaus:
      idbieumau = bieumau['idbieumau']
      bieumau['kys'] = get_bieumauky(idbieumau)
    gay['bieumaus'] = bieumaus
    result.append(gay)

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
