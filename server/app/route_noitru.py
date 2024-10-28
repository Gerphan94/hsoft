
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now, schema_mutil

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

@noitru.route('/noitru/hiendien/<site>/<makp>', methods=['GET'])
def noitru_hiendien(site, makp):
    """
    Get Danh sách hiện diện BN
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
        description: Mã Khoa Phòng
     
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
    stm = f'''
        WITH tmp_bhyt AS (
            SELECT TO_CHAR(MAQL) AS MAQL , SOTHE FROM BHYT WHERE SUDUNG = 1 
        )
        SELECT TO_CHAR(A.ID), TO_CHAR(A.MAVAOVIEN) AS MAVAOVIEN, TO_CHAR(A.MAQL), A.MABN, B.HOTEN, B.PHAI, B.NAMSINH, A.NGAYVV, A.NGAY AS NGAYVK, A.MAICD, D.MADOITUONG , E.DOITUONG, F.SOTHE, B.MAU_ABO, B.MAU_RH
        FROM HIENDIEN A
        INNER JOIN BTDBN B ON A.MABN = B.MABN
        INNER JOIN ICD10 C ON A.MAICD = C.CICD10
        left JOIN BENHANDT D ON A.MAVAOVIEN = D.MAVAOVIEN AND A.MAQL = D.MAQL
        INNER JOIN DOITUONG E ON D.MADOITUONG = E.MADOITUONG
        LEFT JOIN tmp_bhyt F ON A.MAQL = F.MAQL
        WHERE A.MAKP = {makp} AND A.NHAPKHOA = 1 
        ORDER BY A.NGAY DESC
    '''
    data_list = cursor.execute(stm).fetchall()
    
    for data in data_list:
        result.append({
            'id': data[0],
            'mavaovien': data[1],
            'maql': data[2],
            'mabn': data[3],
            'hoten': data[4],
            'phai': data[5],
            'namsinh': data[6],
            'ngayvv': data[7].strftime("%d/%m/%Y %H:%M"),
            'ngayvk': data[8].strftime("%d/%m/%Y %H:%M"),
            'maicd': data[9],
            'madoituong': data[10],
            'doituong': data[11],
            'sothe': data[12],
            'mauabo': data[13],
            'maurh': data[14]
        })
    
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
            
            print(str(e))
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
            A.ID AS IDDUYET,
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

@noitru.route('/noitru/thuoc-chitiet/<site>/<type>/<id>', methods=['GET'])
def noitru_dutru_ct(site,type, id):
    cursor = get_cursor(site)
    result = []
    col_names = ['stt_index', 'tt', 'doituong','idbd', 'mabd', 'ten_hamluong', 'dang', 'donvidung', 'duongdung', 'solan', 'lan', 'soluong', 'sang', 'trua', 'chieu', 'toi', 'giobd', 'giodung ','lieudungthuoc', 'tocdo', 'cachdung','dalieu', 'ghichu', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'dalieu', 'usingdvsd']
    d_table = ''
    print("type is" , type)
    if type == '2':
        d_table = 'D_XTUTRUCCT'
    else:
        d_table = 'D_DUTRUCT'
    stm = f'''
        SELECT A.STT AS STT_INDEX, A.TT, B.DOITUONG, A.MABD AS IDBD, C.MA AS MABD, (C.TEN || ' ' || C.HAMLUONG) AS TEN_HAMLUONG, C.DANG, C.DONVIDUNG, A.DUONGDUNG,
        A.SOLAN , A.LAN ,  A.SLYEUCAU AS SOLUONG,
        A.N1 AS SANG, A.N2 AS TRUA, A.N3 AS CHIEU, A.BS AS TOI, A.GIOBD, A.GIODUNG, A.LIEUDUNGTHUOC, A.TOCDO, A.CACHDUNG, A.DALIEU, A.GHICHU, A.L1, A.L2, A.L3, A.L4, A.L5, A.L6, A.DALIEU, A.DVSD AS USINGDVSD
        FROM {schema_now()}.{d_table} A
        INNER JOIN D_DOITUONG B ON B.MADOITUONG = A.MADOITUONG
        INNER JOIN D_DMBD C ON C.ID = A.MABD 
        WHERE A.ID = '{id}'
        ORDER BY A.TT ASC
    '''
    dutruct = cursor.execute(stm).fetchall()
    for dutru in dutruct:
        result.append(dict(zip(col_names, dutru)))
    return jsonify(result), 200
