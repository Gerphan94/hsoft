
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now, schema_mutil

noitru = Blueprint('noitru', __name__)


@noitru.route('/noitru/dskhoa/<site>/<khu>', methods=['GET'])
def noitru_dskhoa(site, khu):
    cursor = get_cursor(site)
    result = []
    stm = f'SELECT MAKP, TENKP FROM BTDKP_BV WHERE LOAI = 0 AND KHAMBENH = 0 AND KHU = {khu}'
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

@noitru.route('/noitru/quanlygiuong', methods=['GET'])
def noitru_quanlygiuong():
  """
    Quản lý giường nội trú
    ---
    tags:
      - Nội trú
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
        description: Mã Khoa Phòng
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
  site = request.args.get('site')
  makp = request.args.get('makp')
  cursor = get_cursor(site)
  stm  = f'''
      SELECT
        A.ID,
        A.MA,
        A.TEN AS TENGIUONG,
        A.MABH,
        A.HIDE,
        A.CODEGIUONGNT,
        A.MABN,
        C.HOTEN,
        A.TINHTRANG,
        B.TEN AS TENPHONG
      FROM
        DMGIUONG A
      INNER JOIN DMPHONG B ON
        A.IDPHONG = B.ID
      LEFT JOIN BTDBN C ON
        A.MABN = C.MABN
      WHERE
        B.MAKP = {makp}
      ORDER BY
        A.STT ASC
    '''
  col_names = ['id', 'ma', 'tengiuong', 'mabh', 'hide', 'codegiuongnt', 'mabn', 'hoten', 'tinhtrang', 'tenphong']
  result = []
  giuongs = cursor.execute(stm).fetchall()
  for giuong in giuongs:
    result.append(dict(zip(col_names, giuong)))
  return jsonify(result), 200
  
  
@noitru.route('/noitru/hiendien', methods=['GET'])
def noitru_hiendien():
    """
    Get Danh sách hiện diện BN
    ---
    tags:
      - Nội trú
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
        description: Mã Khoa Phòng
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
    site = request.args.get('site')
    makp = request.args.get('makp')
    cursor = get_cursor(site)
    
    result = []
    col_names = ['id', 'mavaovien', 'maql', 'mabn', 'hoten', 'phai', 'ngaysinh',
                 'namsinh', 'ngayvv', 'ngayvk', 'mabs', 'maicd', 'chandoan', 'madoituong', 'doituong', 'mau_abo', 'mau_rh','sothe','bsnhapkhoa',  'phong', 'giuong']
    stm = f'''
        WITH BED AS (
          SELECT
            A.PID,
            B.NAME AS TENPHONG,
            A.NAME AS TENGIUONG,
            ROW_NUMBER() OVER (PARTITION BY A.PID
          ORDER BY
            A.ID) AS RN
          FROM
            ITTAHCM_BED.DM_GIUONG A
          INNER JOIN ITTAHCM_BED.DM_PHONG B ON
            A.PHONG_ID = B.ID
          WHERE
            A.PID IS NOT NULL
          ORDER BY
            A.PID 
          ),
          TMP_BHYT AS (
          SELECT
            TO_CHAR(MAQL) AS MAQL ,
            SOTHE
          FROM
            BHYT
          WHERE
            SUDUNG = 1 
          ),
          TMP_HIENDIEN AS (
          SELECT
            TO_CHAR(A.ID) AS IDKHOA ,
            TO_CHAR(A.MAVAOVIEN) AS MAVAOVIEN,
            TO_CHAR(A.MAQL) AS MAQL,
            A.MABN,
            B.HOTEN,
            B.PHAI,
            TO_CHAR(B.NGAYSINH, 'dd/MM/yyyy') AS NGAYSINH,
            B.NAMSINH,
            A.NGAYVV,
            A.NGAY AS NGAYVK,
            NK.MABS,
            NK.MAICD,
            NK.CHANDOAN,
            D.MADOITUONG ,
            E.DOITUONG,
            B.MAU_ABO,
            B.MAU_RH
          FROM
            HIENDIEN A
          INNER JOIN BTDBN B ON
            A.MABN = B.MABN
          INNER JOIN ICD10 C ON
            A.MAICD = C.CICD10
          INNER JOIN NHAPKHOA NK ON A.ID = NK.ID
          LEFT JOIN BENHANDT D ON
            A.MAVAOVIEN = D.MAVAOVIEN
            AND A.MAQL = D.MAQL
          INNER JOIN DOITUONG E ON
            D.MADOITUONG = E.MADOITUONG
          WHERE
            A.MAKP = {makp}
            AND A.NHAPKHOA = 1
          ORDER BY
            A.NGAY DESC
          )
          SELECT HD.*, BH.SOTHE, DMBS.HOTEN AS BSNHAPKHOA, BED.TENPHONG, BED.TENGIUONG
          FROM TMP_HIENDIEN HD
          LEFT JOIN TMP_BHYT BH ON HD.MAQL = BH.MAQL
          INNER JOIN DMBS ON HD.MABS = DMBS.MA
          LEFT JOIN BED ON HD.MABN = BED.PID AND BED.RN = 1
    '''
    data_list = cursor.execute(stm).fetchall()
    for data in data_list:
        obj = dict(zip(col_names, data))
        result.append(obj)
    return jsonify(result), 200
@noitru.route('/noitru/hiendien-phongluu/<site>/<mmyy>', methods=['GET'])
def noitru_hiendienphongluu(site, mmyy):
    """
    Get Danh sách hiện diện Phòng lưu
    ---
    tags:
      - Phòng Lưu
    parameters:
      - name: site
        in: path
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: mmyy
        in: path
        type: string
        required: true
        default: 1024
        description: 
     
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
    schema = 'HSOFTTAMANH' + mmyy
    col_names = ['mavv', 'maql','mabn', 'hoten', 'ngaysinh', 'phai', 'ngayvao','noigioithieu',
                 'nhantu', 'madoituong', 'doituong', 'sovaovien', 'ngayra','ketquaid', 'ketqua', 'ttlucrv','xutri']
    stm = f'''
        SELECT 
        TO_CHAR(A.MAVAOVIEN) AS MAVAOVIEN,
        TO_CHAR(A.MAQL) AS MAQL,
        A.MABN,
        B.HOTEN,
        TO_CHAR(B.NGAYSINH, 'dd/MM/yyyy') AS NGAYSINH,
        B.PHAI,
        TO_CHAR(A.NGAY, 'dd/MM/yyyy HH24:MI') AS NGAYVAO,
        CASE
            WHEN DENTU = 1 THEN 'Cơ quan y tế'
            WHEN DENTU = 2 THEN 'Tự đến'
            ELSE 'Khác'
        END AS NOIGIOITHIEU,
        CASE
            WHEN NHANTU = 1 THEN 'Cấp cứu'
            WHEN NHANTU = 2 THEN 'KKB'
            ELSE 'Khoa điều trị'
        END AS NHANTU,
        A.MADOITUONG,
        C.DOITUONG,
        A.SOVAOVIEN,
        TO_CHAR(A.NGAYRV , 'dd/MM/yyyy HH24:MI') AS NGAYRA,
        A.KETQUA,
        E.TEN,
        A.TTLUCRV,
        D.TEN
    FROM
        {schema}.BENHANCC A
    INNER JOIN 
        BTDBN B ON
        A.MABN = B.MABN
    INNER JOIN 
        DOITUONG C ON
        A.MADOITUONG = C.MADOITUONG
    INNER JOIN
        XUTRIKB D ON
        A.TTLUCRV = D.MA
    LEFT JOIN 
        KETQUA E ON
        A.KETQUA = E.MA
    ORDER BY
        A.NGAY DESC
    '''
    hiendiens = cursor.execute(stm).fetchall()
    result = []
    for hiendien in hiendiens:
        result.append(dict(zip(col_names, hiendien)))
    return jsonify(result), 200


@noitru.route('/noi-tru/insert-bhyt/<site>', methods=['POST'])
def noitru_insertbhyt(site):
    
    cursor = get_cursor(site)
    
    if site != 'HCM_UAT' and site != 'HCM_DEV':
        return jsonify({'error':'Site không có quyền'}), 500
    data = request.get_json()
    mabn = data['pid']
    maql = data['maql']
    sothe = data['sothe']
    fromDate = datetime.strptime(data['fromDate'], '%d/%m/%Y')
    toDate = datetime.strptime(data['toDate'], '%d/%m/%Y')
    ngayud = datetime.now()
    mabv = data['mabv']
    madoituong = 1
    
    stm_check = f"SELECT COUNT(*) FROM BHYT WHERE MABN = '{mabn}' AND MAQL = '{maql}' AND SUDUNG = 1"
    count = cursor.execute(stm_check).fetchone()[0]
    if (count == 0):
        stm = f'''
            INSERT INTO BHYT
            (MABN, MAQL, SOTHE, DENNGAY, MABV, MAPHU, TUNGAY, SUDUNG, TRAITUYEN, NGAYUD, KIEMTRA, MUCLUONG, CANBO, LOAIDT, MIENCHITRA, LOAIKV )
            VALUES ('{mabn}','{maql}','{sothe}',TO_DATE('{toDate}', 'YYYY-MM-DD HH24:MI:SS') , {mabv}, 0, TO_DATE('{fromDate}', 'YYYY-MM-DD HH24:MI:SS'), 1, 0, TO_TIMESTAMP('{ngayud}', 'YYYY-MM-DD HH24:MI:SS.FF'), 1, 0, 0, 0, 0, 0)
        '''
        stm_update = f"UPDATE BENHANDT SET MADOITUONG = {madoituong} WHERE MABN = '{mabn}' AND MAQL = '{maql}'"
     
        try:
            cursor.execute(stm)
            cursor.execute(stm_update)
            cursor.connection.commit()
            return jsonify({'message': 'Thêm BHYT thành công'}), 200
        except Exception as e:
            return jsonify({'error':'Không thêm được BHYT'}), 500
    else:
        return jsonify({'error':'Bệnh nhân đã có thẻ'}), 500
    
@noitru.route('/noitru/thuoc/danhsach-phieudalap/<site>/<makp>/<string_ngay>', methods=['GET'])
def get_thuoc_danhsach_phieudalap(site, makp, string_ngay):
    """
    Danh sách phiếu đã lập
    ---
    tags:
      - Nội trú
    parameters:
      - name: site
        in: path
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: makp
        in: path
        type: string
        required: true
        default: 048
        description: 
      - name: string_ngay
        in: path
        type: string
        required: true
        description: vd 20241106
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
    
    schema = 'HSOFTTAMANH' + string_ngay[4:6]+string_ngay[2:4]
    cursor = get_cursor(site)
    result = []
    
    stm = f'''
        WITH ApprovedIDs AS (
            SELECT A.ID
            FROM {schema}.D_DUYET A
            WHERE A.MAKHOA IN (SELECT ID FROM D_DUOCKP WHERE MAKP = '{makp}')
            AND TO_CHAR(A.NGAY, 'yyyyMMdd') = '{string_ngay}'
        ),
        TMP_TABLE AS (
            SELECT DISTINCT
                B.IDDUYET,
                A.MAKHO,
                C.TEN
            FROM {schema}.D_DUTRUCT A
            JOIN {schema}.D_DUTRULL B ON A.ID = B.ID
            JOIN D_DMKHO C ON A.MAKHO = C.ID
            WHERE B.IDDUYET IN (SELECT ID FROM ApprovedIDs)
            UNION ALL
            SELECT DISTINCT
                B.IDDUYET,
                A.MAKHO,
                C.TEN
            FROM {schema}.D_XTUTRUCCT A
            JOIN {schema}.D_XTUTRUCLL B ON A.ID = B.ID
            JOIN D_DMKHO C ON A.MAKHO = C.ID
            WHERE B.IDDUYET IN (SELECT ID FROM ApprovedIDs)
        )
        SELECT
            TO_CHAR(A.ID) AS IDDUYET,
            B.TEN AS TENPHIEU,
            C.TEN AS TENKHOADUOC,
            D.TEN AS TENTT ,
            A.DONE,
            TMP_TABLE.MAKHO,
            TMP_TABLE.TEN AS TENKHO
        FROM
            {schema}.D_DUYET A
        INNER JOIN D_LOAIPHIEU B ON
            A.PHIEU = B.ID
        INNER JOIN D_DUOCKP C ON
            A.MAKHOA = C.ID
        INNER JOIN D_DUOCKP D ON
            A.MAKP = D.ID
        INNER JOIN TMP_TABLE ON A.ID = TMP_TABLE.IDDUYET
    '''
    col_names = ['idduyet', 'tenphieu', 'tenkhoaduoc', 'tentt', 'done', 'makho', 'tenkho']
    phieus = cursor.execute(stm).fetchall()
    for phieu in phieus:
        result.append(dict(zip(col_names, phieu)))
    return jsonify(result), 200
    
    
@noitru.route('/noitru/thuoc-danhsach-theo-idkhoa/<site>/<string:idkhoa>', methods=['GET'])
def noitru_get_thuoc_dutrull_by_idkhoa(site, idkhoa):
    """
    Get list of thuoc du tru by idkhoa
    """
    cursor = get_cursor(site)
    result = []
    ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]
    iNow = datetime.now()  
    print(iNow)
    schema_ar = list(schema_mutil(ngaynhapkhoa, iNow))
    print(schema_ar)
    col_names = ['id', 'idduyet', 'songay', 'ngaytao', 'tenphieu', 'done', 'makhoaduockp', 'tenduockp', 'loaiphieu', 'schema'] 
    for schema in reversed(schema_ar):
        stm =f'''
            WITH DSPHIEU AS (
                SELECT A.ID, A.IDDUYET, A.SONGAY
                FROM {schema}.D_DUTRULL A
                WHERE A.IDKHOA = '{idkhoa}'
                UNION ALL 
                SELECT B.ID, B.IDDUYET, B.SONGAY
                FROM {schema}.D_XTUTRUCLL B
                WHERE B.IDKHOA = '{idkhoa}'
            )
            SELECT to_char(DS.ID) AS ID, DS.IDDUYET, DS.SONGAY, B.NGAY AS NGAYTAO , C.TEN AS TENPHIEU, B.DONE, B.MAKHOA, D.TEN AS TENDUOCKP,
            CASE
                WHEN B.LOAI = 1 AND C.XUATVIEN = 0 THEN 1
                WHEN B.LOAI = 2 THEN 2
                ELSE 3
            END AS LOAIPHIEU, 
            'HSOFTTAMANH' || '' || TO_CHAR(B.NGAY, 'MMyy') AS SCHEMA
            FROM DSPHIEU DS
            INNER JOIN {schema}.D_DUYET B ON DS.IDDUYET = B.ID
            INNER JOIN D_LOAIPHIEU C ON C.ID = B.PHIEU
            INNER JOIN D_DUOCKP D ON B.MAKP = D.ID
            ORDER BY NGAYTAO DESC
        '''
        dutrull = cursor.execute(stm).fetchall()
        for dutru in dutrull:
            result.append(dict(zip(col_names, dutru)))
    return jsonify(result), 200

@noitru.route('/noitru/thuoc-dutrull-thongtin/<site>/<int:type>/<id>/<ngay>', methods=['GET'])
def noitru_phieu_info(site,type, id, ngay):
    cursor = get_cursor(site)
    result = {}
    if type == 2:
        d_table = 'D_XTUTRUCLL'
    else:
        d_table = 'D_DUTRULL'
        
    stm = f'''
        SELECT A.ID, C.TEN, D.MAICD, D.CHANDOAN,
        D.MACH, D.NHIETDO,D.HUYETAP, D.NHIPTHO, D.CANNANG, D.CHIEUCAO
        FROM {schema_now()}.{d_table} A
        INNER JOIN {schema_now()}.D_DUYET B ON A.IDDUYET = B.ID
        INNER JOIN D_LOAIPHIEU C ON C.ID = B.PHIEU
        LEFT JOIN {schema_now()}.D_DAUSINHTON D ON D.IDDUTRU = A.ID 
        WHERE A.ID = '{id}'
    '''
    detail = cursor.execute(stm).fetchone()
    result['id'] = detail[0]
    result['ten'] = detail[1]
    result['maicd'] = detail[2]
    result['chandoan'] = detail[3]
    result['dst'] = { 'mach': detail[4], 'nhietdo': detail[5], 'huyetap': detail[6], 'nhiptho': detail[7], 'cannang': detail[8], 'chieucao': detail[9] }
    return jsonify(result), 200

@noitru.route('/noitru/thuoc-dutruct', methods=['GET'])
def noitru_dutruct():
    """
    Dự trù CT
    ---
    tags:
      - Nội trú
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: id
        in: query
        type: string
        required: true
        description: ID Phiếu
      - name: thangnam
        in: query
        type: string
        required: true
        description: MMYY
        default: 1124
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
    id = request.args.get('id')
    thangnam = request.args.get('thangnam')
    schema = 'HSOFTTAMANH' + thangnam
    cursor = get_cursor(site)
    def get_chandoan_dst():
        stm = f'''
                SELECT
                    A.ID,
                    D.MAICD,
                    D.CHANDOAN,
                    D.MACH,
                    D.NHIETDO,
                    D.HUYETAP,
                    D.NHIPTHO,
                    D.CANNANG,
                    D.CHIEUCAO
                FROM
                    {schema}.D_DUTRULL A
                INNER JOIN {schema}.D_DUYET B ON
                    A.IDDUYET = B.ID
                LEFT JOIN {schema}.D_DAUSINHTON D ON
                    D.IDDUTRU = A.ID
                WHERE
                    A.ID = :id
        '''
        detail = cursor.execute(stm, {'id': id}).fetchone()
        return {
            'id': detail[0],
            'maicd': detail[1],
            'chandoan': detail[2],
            'dst': {
                'mach': detail[3],
                'nhietdo': detail[4],
                'huyetap': detail[5],
                'nhiptho': detail[6],
                'cannang': detail[7],
                'chieucao': detail[8]
            }
        }

    def get_thuoc():
        result = []
        col_names = ['stt_index', 'tt', 'doituong','idbd', 'mabd', 'ten_hamluong', 'dang', 'donvidung', 
                    'duongdung', 'solan', 'lan', 'soluong', 'sang', 'trua', 'chieu', 'toi', 'giobd', 
                    'giodung ','lieudungthuoc', 'tocdo', 'cachdung','dalieu', 'ghichu', 
                    'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'dalieu', 'usingdvsd']
        stm = f'''
            SELECT
                A.STT AS STT_INDEX,
                A.TT,
                B.DOITUONG,
                A.MABD AS IDBD,
                C.MA AS MABD,
                (C.TEN || ' ' || C.HAMLUONG) AS TEN_HAMLUONG,
                C.DANG,
                C.DONVIDUNG,
                A.DUONGDUNG,
                A.SOLAN ,
                A.LAN ,
                A.SLYEUCAU AS SOLUONG,
                A.N1 AS SANG,
                A.N2 AS TRUA,
                A.N3 AS CHIEU,
                A.BS AS TOI,
                A.GIOBD,
                A.GIODUNG,
                A.LIEUDUNGTHUOC,
                A.TOCDO,
                A.CACHDUNG,
                A.DALIEU,
                A.GHICHU,
                A.L1,
                A.L2,
                A.L3,
                A.L4,
                A.L5,
                A.L6,
                A.DALIEU,
                A.DVSD AS USINGDVSD
            FROM
                {schema}.D_DUTRUCT A
            INNER JOIN D_DOITUONG B ON
                B.MADOITUONG = A.MADOITUONG
            INNER JOIN D_DMBD C ON
                C.ID = A.MABD
            WHERE
                A.ID = :id
            ORDER BY
                A.TT ASC
        '''
        dutruct = cursor.execute(stm, {'id': id}).fetchall()
        for dutru in dutruct:
            result.append(dict(zip(col_names, dutru)))
        return result
   
    return jsonify({'detail': get_chandoan_dst(), 'thuoc': get_thuoc()}), 200

@noitru.route('/noitru/thuoc-xtutrucct', methods=['GET'])
def noitru_xtutrucct():
    """
    Xuất tủ trực CT
    ---
    tags:
      - Nội trú
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: id
        in: query
        type: string
        required: true
        description: ID Phiếu
      - name: thangnam
        in: query
        type: string
        required: true
        description: MMYY
        default: 1124
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
    id = request.args.get('id')
    thangnam = request.args.get('thangnam')
    schema = 'HSOFTTAMANH' + thangnam
    cursor = get_cursor(site)
    result = []
    col_names = ['stt_index', 'tt', 'doituong','idbd', 'mabd', 'ten_hamluong', 'dang', 'donvidung', 
                 'duongdung', 'solan', 'lan', 'soluong', 'sang', 'trua', 'chieu', 'toi', 'giobd', 
                 'giodung ','lieudungthuoc', 'tocdo', 'cachdung','dalieu', 'ghichu', 
                 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'dalieu', 'usingdvsd']
    stm = f'''
        SELECT
            A.STT AS STT_INDEX,
            A.TT,
            B.DOITUONG,
            A.MABD AS IDBD,
            C.MA AS MABD,
            (C.TEN || ' ' || C.HAMLUONG) AS TEN_HAMLUONG,
            C.DANG,
            C.DONVIDUNG,
            A.DUONGDUNG,
            A.SOLAN ,
            A.LAN ,
            A.SLYEUCAU AS SOLUONG,
            A.N1 AS SANG,
            A.N2 AS TRUA,
            A.N3 AS CHIEU,
            A.BS AS TOI,
            A.GIOBD,
            A.GIODUNG,
            A.LIEUDUNGTHUOC,
            A.TOCDO,
            A.CACHDUNG,
            A.DALIEU,
            A.GHICHU,
            A.L1,
            A.L2,
            A.L3,
            A.L4,
            A.L5,
            A.L6,
            A.DALIEU,
            A.DVSD AS USINGDVSD
        FROM
            {schema}.D_XTUTRUCCT A
        INNER JOIN D_DOITUONG B ON
            B.MADOITUONG = A.MADOITUONG
        INNER JOIN D_DMBD C ON
            C.ID = A.MABD
        WHERE
            A.ID = :id
        ORDER BY
            A.TT ASC
    '''
    xtutrucct = cursor.execute(stm, {'id': id}).fetchall()
    for xtutruc in xtutrucct:
        result.append(dict(zip(col_names, xtutruc)))
    return jsonify(result), 200
  
@noitru.route('/noitru/thuoc-phatiem', methods=['GET'])
def noitru_thuoc_phatiem():
  """
    Thuốc PHa Tiêm
    ---
    tags:
      - Nội trú
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: thangnam
        in: query
        type: string
        required: true
        description: MMYY
        default: 1124
      - name: idtoathuoc
        in: query
        type: string
        required: true
        description: id toa thuốc (iddutru, idxtutruc)
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
  idtoathuoc = request.args.get('idtoathuoc')
  thangnam = request.args.get('thangnam')
  schema = 'HSOFTTAMANH' + thangnam
  cursor = get_cursor(site)
  result = []
  
  def get_phathuoc_detail(phathuocid):
    col_names = ['id', 'ma', 'tenbd', 'tenhc', 'dvt', 'duongdung']
    stm = f"SELECT ID, MA, TENBD , TENHC, DANG, DUONGDUNG FROM {schema}.D_PHATHUOCTIEM WHERE PHATHUOCID = {phathuocid}"
    thuocs = cursor.execute(stm).fetchall()
    result = []
    for thuoc in thuocs:
      result.append(dict(zip(col_names, thuoc)))
    return result
    
  stm = f'''
      SELECT DISTINCT TO_CHAR(PHATHUOCID) AS PHATHUOCID, THUOCPHA, CACHPHA 
      FROM {schema}.D_PHATHUOCTIEM 
      WHERE TOATHUOCID = {idtoathuoc}
    '''
  phathuoctiems = cursor.execute(stm).fetchall()
  
  for phathuoctiem in phathuoctiems:
    obj = {}
    obj['phathuocid'] = phathuoctiem[0]
    obj['thuocpha'] = phathuoctiem[1]
    obj['cachpha'] = phathuoctiem[2]
    obj['detail'] = get_phathuoc_detail(phathuoctiem[0])
    result.append(obj)
  return jsonify(result), 200
    
   
    
    
    
  
    


@noitru.route('/noitru/get-chidinh-by-idkhoa/<site>/<string:idkhoa>', methods=['GET'])
def noitru_getchidinhbyidkhoa(site, idkhoa):
    """
    Danh sách chỉ định dịch vụ
    ---
    tags:
      - Nội trú
    parameters:
      - name: site
        in: path
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: idkhoa
        in: path
        type: string
        required: true
        description: IDNHAPKHOA
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
    
    ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]
    iNow = datetime.now()  
    schema_ar = list(schema_mutil(ngaynhapkhoa, iNow))
    
    col_names = ['id','ngay', 'doituong', 'tendichvu', 'soluong', 'dongia', 'idchidinh', 'ghichu', 'thuchien', 'ngayylenh', 'ngaythuchien', 'maphieu', 'benhpham', 'idloai', 'idnhom', 'loaiba']
    for schema in reversed(schema_ar):
        stm = f'''
            SELECT
                A.ID,
                TO_CHAR(A.NGAY, 'dd/MM/yyyy') AS NGAY,
                C.DOITUONG,
                B.TEN,
                A.SOLUONG,
                A.DONGIA,
                TO_CHAR(A.IDCHIDINH) AS IDCHIDINH,
                A.GHICHU,
                A.THUCHIEN,
                TO_CHAR(A.NGAY, 'dd/MM/yyyy HH24:MI') AS NGAYYLENH,
                TO_CHAR(A.NGAYTHUCHIEN, 'dd/MM/yyyy HH24:MI') AS NGAYTHUCHIEN,
                A.MAPHIEU,
                D.TEN AS BENHPHAM,
                E.ID AS IDLOAI,
                E.ID_NHOM AS IDNHOM,
                A.LOAIBA
            FROM
                {schema}.V_CHIDINH A
            INNER JOIN V_GIAVP B ON
                B.ID = A.MAVP
            INNER JOIN DOITUONG C ON
                C.MADOITUONG = A.MADOITUONG
            INNER JOIN DMBENHPHAM D ON
                D.ID = A.BENHPHAM
            INNER JOIN V_LOAIVP E ON
                B.ID_LOAI = E.ID
            WHERE
                A.IDKHOA = '{idkhoa}'
                AND A.MADOITUONG <> 3
            ORDER BY
                NGAY DESC,
                NGAYYLENH ASC
        '''
        chidinh = cursor.execute(stm).fetchall()
        for chidinh in chidinh:
            result.append(dict(zip(col_names, chidinh)))
    return jsonify(result), 200



@noitru.route('/noitru/get-sodokcb-in-hiendien', methods=['GET'])
def noitru_get_sodokcb_in_hiendien():
    """
    Khám chữa bệnh theo hiện diện
    ---
    tags:
      - Nội trú
    parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: mabn
        in: query
        type: string
        required: true
        description:
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
    cursor = get_cursor(site)
    mabn = request.args.get('mabn')
    def get_hiendien():
      stm = "SELECT ID, MAVAOVIEN, MAQL, TO_CHAR(NGAYVV, 'MMYY') AS THANGNAM FROM HIENDIEN  WHERE mabn = :pid"
      return cursor.execute(stm, pid=mabn).fetchone()
    
    def get_khoadieutri(maql, mavv):
      print(maql, mavv)
      stm = f'''
          SELECT
          TO_CHAR(A.ID) AS IDKHOA,
          TO_CHAR({mavv}) AS MAVAOVIEN,
          TO_CHAR(A.MAQL) AS MAQL,
          B.MAKP,
          B.TENKP,
          A.NGAY AS NGAYVAO,
          C.NGAY AS NGAYRA,
          C.KETQUA
        FROM
          NHAPKHOA A
        INNER JOIN BTDKP_BV B ON
          A.MAKP = B.MAKP
        LEFT JOIN XUATKHOA C ON
          A.ID = C.ID
        WHERE
          A.MAQL = {maql}
        ORDER BY
          A.NGAY ASC
      '''
      
      return cursor.execute(stm).fetchall()
    
    def get_previous(mavv, thangnam):
      schema = "HSOFTTAMANH" + thangnam
      stm_cc = f"SELECT '', MAVAOVIEN, MAQL FROM {schema}.BENHANCC WHERE MAVAOVIEN = :mavv"
      benhancc = cursor.execute(stm_cc, mavv=mavv).fetchone()
      
      return benhancc
    
    hiendien = get_hiendien()
    idkhoa = hiendien[0]
    mavv = hiendien[1]
    maql = hiendien[2]
    thangnam = hiendien[3]
    result = []
    type = 0
    col_names = ['idkhoa', 'mavaovien', 'maql', 'makp', 'tenkp', 'ngayvao', 'ngayra', 'ketqua']
    previous = get_previous(mavv, thangnam)
    
    khoadieutris = get_khoadieutri(maql, mavv)
    print(list(khoadieutris))
    for khoadieutri in khoadieutris:
        result.append(dict(zip(col_names, khoadieutri)))
  

    return jsonify(result), 200