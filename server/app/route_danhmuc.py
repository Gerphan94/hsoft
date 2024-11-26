from flask import Flask, jsonify, request, Blueprint
from .db import get_cursor
dm = Blueprint('dm', __name__)

@dm.route('/danhmuc', methods=['GET'])
def get_danhmuc():
    """
    Get Danh Muc data
    ---
    tags:
      - Danh mục
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
    return jsonify({"message": "ok"}), 200


@dm.route('/danhmuc/danhmuc-coso-tamanh/<site>', methods=['GET'])
def danhmuc_coso_tamanh(site):
  """
    Danh mục Cơ s BV TÂM ANH
    ---
    tags:
      - Danh mục
    parameters:
      - name: site
        in: path
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
  
  
  cursor = get_cursor(site)
  stm = 'SELECT ID, TEN FROM DMKHUDT'
  cosos = cursor.execute(stm).fetchall()
  return jsonify([{"id": row[0], "name": row[1]} for row in cosos]), 200


@dm.route('/danhmuc/khoaphong-all', methods=['GET'])
def danhmuc_khoaphong_all():
    """
    Get Danh mục Khoa Phòng
    ---
    tags:
      - Danh mục
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: khu
        in: query
        type: number
        required: true
        default: 1
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
    site = request.args.get('site', 'HCM_DEV')
    khu = request.args.get('area', '1')
    cursor = get_cursor(site)
    col_names = ['makp', 'tenkp', 'loai']
    stm = f"SELECT MAKP, TENKP, LOAI FROM BTDKP_BV WHERE KHU = {khu}"
    result = []
    khoas = cursor.execute(stm).fetchall()
    for khoa in khoas:
        result.append(dict(zip(col_names, khoa)))
    return jsonify(result), 200
      
      
    
@dm.route('/danhmuc/khoa', methods=['GET'])
def danhmuc_khoaphong():
    """
    Get Danh mục Khoa Phòng
    ---
    tags:
      - Danh mục
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: khu
        in: query
        type: string
        required: true
        description: The site identifier
        default: 1
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
    site = request.args.get('site', 'HCM_DEV')
    khu = request.args.get('khu', '1')
    cursor = get_cursor(site)
    stm = '''
      SELECT
        MAKP,
        TENKP
      FROM
        BTDKP_BV
      WHERE
        LOAI = 0
        AND MABA IS NOT NULL
        AND KHU = :khu
        AND KHAMBENH = 0
        AND CAPCUU = 0
    '''
    khoas = cursor.execute(stm, khu=khu).fetchall()
    result = [{"id": khoa[0], "name": khoa[1]} for khoa in khoas]
    return jsonify(result), 200
  
@dm.route('/danhmuc/phong-in-khoa', methods=['GET'])
def danhmuc_phong_in_khoa():
    """
    Get Danh mục Phòng In Khoa
    ---
    tags:
      - Danh mục
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: makp
        in: query
        type: string
        required: true
        description: Mã khoa
        default: 048
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
    site = request.args.get('site', 'HCM_DEV')
    makp = request.args.get('makp', '048')
    cursor = get_cursor(site)
    stm = 'SELECT ID, TEN FROM DMPHONG WHERE MAKP = :makp'
    phongs = cursor.execute(stm, makp=makp).fetchall()
    return jsonify([{"id": phong[0], "name": phong[1]} for phong in phongs]), 200
  
@dm.route('/danhmuc/giuong-in-phong', methods=['GET'])
def danhmuc_giuong_in_phong():
  """
    Get Danh mục Giuong in Phòng
    ---
    tags:
      - Danh mục
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: idphong
        in: query
        type: string
        required: true
        description: ID Phòng
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
  site = request.args.get('site', 'HCM_DEV')
  idphong = request.args.get('idphong')
  cursor = get_cursor(site)
  col_names = ['id', 'ma', 'ten', 'hide', 'codegiuongnt']
  stm = 'SELECT ID, MA, TEN, HIDE, CODEGIUONGNT FROM DMGIUONG WHERE IDPHONG = :idphong ORDER BY STT'
  giuongs = cursor.execute(stm, idphong=idphong).fetchall()
  return jsonify([dict(zip(col_names, giuong)) for giuong in giuongs]), 200
  
    
        
    
@dm.route('/danhmuc/danhmuc-khoaphong-in/<site>/<khoaphong_string>', methods=['GET'])
def danhmuc_khoaphong_in(site, khoaphong_string):
    """
    Get Danh mục Khoa Phòng
    ---
    tags:
      - Danh mục
    parameters:
      - name: site
        in: path
        type: string
        required: true
        description: The site identifier
      - name: khoaphong_string
        in: path
        type: string
        required: true
        description: The Khoa Phong string
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
    query = f"""
        SELECT MAKP, TENKP
        FROM BTDKP_BV
        WHERE MAKP IN ({khoaphong_string})
        ORDER BY MAKP ASC
    """
    results = cursor.execute(query).fetchall()
    return jsonify([{"id": row[0], "name": row[1]} for row in results]), 200

@dm.route("/danhmuc/nhom-nhanvien/<site>", methods=["GET"])
def get_nhom_nhanvien(site):
    """
    Get all nhom nhan vien from database
    """
    cursor = get_cursor(site)
    query = """
        SELECT id, ten
        FROM NHOMNHANVIEN
        ORDER BY id ASC
    """
    results = cursor.execute(query).fetchall()
    nhom_nhan_vien_list = [{"id": row[0], "name": row[1]} for row in results]
    return jsonify(nhom_nhan_vien_list), 200

@dm.route('/danhmuc/taikhoan-hsoft', methods=['GET'])
def danhmuc_taikhoan():
    """
    Get Tài khoản Hsoft
    ---
    tags:
      - Danh mục
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: Site (HCM_DEV, HN_DEV,...)
        default: HCM_DEV
      - name: khu
        in: query
        type: string
        required: true
        description: Quận Tân Bình, Quận 8, Quận 7
        default: 1
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
    
    site = request.args.get('site', 'HCM_DEV')
    khu = request.args.get('area', 1)
    cursor = get_cursor(site)
    result = []
    col_names = ['id', 'userid', 'password_', 'tentaikhoan', 'manhomtk', 'makp', 'mabs', 
                 'hoten', 'manhomnv','tennhom', 'viettat', 'duyetkhambhyt', 'sochungchi', 'chungthuso', 'pin', 'khoakyrv' ]
    
    stm = f'''
        WITH DMNV AS (
          SELECT A.MA, A.HOTEN, A.NHOM, B.TEN , A.VIETTAT , A.DUYETKHAMBHYT, A.SOCHUNGCHI, C.CHUNGTHUSO, C.PIN, A.KHOAKYRV
          FROM DMBS A 
          LEFT JOIN NHOMNHANVIEN B ON A.NHOM = B.ID
          LEFT JOIN DMBS_SIGNATURE C ON A.MA = C.MANV
          WHERE A.NHOM <> 9 AND C.KHU = '{khu}'
        )
        SELECT A.ID, A.USERID, A.PASSWORD_,A.HOTEN AS TENTAIKHOAN, A.MANHOM, A.MAKP, B.*
        FROM DLOGIN A
        INNER JOIN DMNV B ON A.MABS = B.MA
        WHERE A.HIDE = 0  AND A.KHU LIKE '%{khu}%'
        ORDER BY A.ID 
    '''
    taikhoans = cursor.execute(stm).fetchall()
    for taikhoan in taikhoans:
        obj = {}
        for idx, col in  enumerate(col_names):
            makp_string =  str(taikhoan[5]).rstrip(',')
            obj[col] = taikhoan[idx]
            obj['makp'] = makp_string
        result.append(obj)
    return jsonify(result), 200

@dm.route('/danhmuc-vienphi/nhomnbhyt/<site>/', methods=['GET'])
def vienphi_nhomnbhyt(site):
    cursor = get_cursor(site)
    result = []
    stm = f'SELECT ID, TEN FROM V_NHOMBHYT ORDER BY ID ASC'
    try:
        nhombhyts = cursor.execute(stm).fetchall()
        if nhombhyts is not None:
            for nhombhyt in nhombhyts:
                result.append({
                    'id': nhombhyt[0],
                    'name': nhombhyt[1]
                })
        else:
            result.append({
                'id': None,
                'name': None
            })
    except Exception as e:
        result.append({
            'error': str(e)
        })
    finally:
        return jsonify(result)
    

@dm.route('/danhmuc-vienphi/loaivp/<site>/<idnhom>', methods=['GET'])
def vienphi_dmloaivp(site, idnhom):
    cursor = get_cursor(site)
    result = []
    stm = f'SELECT ID, TEN FROM V_LOAIVP WHERE ID_NHOM = {idnhom} ORDER BY ID ASC'
    loaivps = cursor.execute(stm).fetchall()
    for loaivp in loaivps:
        result.append({
            'id': loaivp[0],
            'name': loaivp[1]
        })  
    return jsonify(result), 200

@dm.route('/danhmuc-vienphi/gia-vp/<site>', methods=['GET'])
def vienphi_giavp(site):
    """
    Danh mục Giá viện phí
    ---
    tags:
      - Danh mục - viện phí
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
  
    cursor = get_cursor(site)
    result = []
    col_names = ['id', 'mavp', 'tenvp', 'dvt', 'bhyt', 'giath', 'giabh', 'giadv', 
              'idnhombhyt', 'tennhombhyt', 'idnhom', 'tennhom', 'idloai', 'tenloai',
              'trongoi', 'benhphamrangbuoc', 'luuy']
    stm = f'''
      SELECT
        A.ID, 
        A.MA,
        A.TEN,
        A.DVT,
        A.BHYT,
        A.GIA_TH ,
        A.GIA_BH ,
        A.GIA_DV,
        C.IDNHOMBH,
        C.TENBHYT,
        B.ID_NHOM,
        C.TENNHOM,
        A.ID_LOAI,
        B.TEN AS TENLOAI,
        A.BENHPHAMRANGBUOC,
        A.LUUY
      FROM
        V_GIAVP A
      INNER JOIN V_LOAIVP B ON
        A.ID_LOAI = B.ID
      INNER JOIN (
        SELECT A.MA, A.TEN AS TENNHOM, B.ID AS IDNHOMBH, B.TEN AS TENBHYT 
        FROM V_NHOMVP A
        INNER JOIN V_NHOMBHYT B ON A.IDNHOMBHYT = B.ID
        ORDER BY A.MA ASC
        ) C ON
        B.ID_NHOM = C.MA
      WHERE
        A.DIEUTIET = 0
        AND A.HIDE = 0
        AND A.TRONGOI = 0
      ORDER BY
        A.TEN ASC
    '''
    giavps = cursor.execute(stm).fetchall()
    for giavp in giavps:
        result.append(dict(zip(col_names, giavp)))
    return jsonify(result), 200

    
    

@dm.route('/vien-phi/gia-vp/theo-nhom-bhyt/<site>/<bhytid>', methods=['GET'])
def vienphi_giavp_bhyt(site, bhytid):
    cursor = get_cursor(site)
    
    result = []
    col_name = ['id', 'idloai', 'mavp', 'ten', 'dvt', 'bhyt', 'giath', 'giabh', 'giadv', 'trongoi', 'benhphamrangbuoc']
    stm = f'''
    SELECT A.ID, A.ID_LOAI, A.MA, A.TEN, A.DVT, A.BHYT, A.GIA_TH , A.GIA_BH , A.GIA_DV, A.TRONGOI, A.BENHPHAMRANGBUOC
    FROM V_GIAVP A
    WHERE ID_LOAI IN (
        SELECT ID FROM V_LOAIVP 
        INNER JOIN V_NHOMVP ON V_LOAIVP.ID_NHOM = V_NHOMVP.MA
        WHERE V_NHOMVP.IDNHOMBHYT = {bhytid}
    )
    ORDER BY A.ID_LOAI ASC
    '''
    giavps = cursor.execute(stm).fetchall()
    for giavp in giavps:
        obj = {}
        for idx, col in  enumerate(col_name):
            obj[col] = giavp[idx]
        result.append(obj)
    return jsonify(result), 200  
  
@dm.route('/danhmuc/dinhduong-chedoan', methods=['GET'])
def dinhduong_chedoan():
  """
    Danh mục chế độ ăn
    ---
    tags:
      - Danh mục
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
  col_names = ['id', 'ma', 'ten', 'benhly', 'idnhom', 'tennhom', 'ischild']
  query = f'''
    SELECT A.ID, A.MA, A.TEN, A.BENHLY , A.IDNHOM, B.TEN , A.TREEM
    FROM TA_CHEDOAN A
    INNER JOIN TA_NHOMCHEDOAN B ON A.IDNHOM = B.ID
    WHERE A.ISACTIVE = 1
    ORDER BY A.IDNHOM, MA
  '''
  chedoans = cursor.execute(query).fetchall()
  for chedoan in chedoans:
    result.append(dict(zip(col_names, chedoan)))
  return jsonify(result), 200
  

