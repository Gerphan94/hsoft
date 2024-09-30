
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

@noitru.route('/noitru/hiendien/<site>/<makp>', methods=['GET'])
def noitru_hiendien(site, makp):
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
            'ngayvv': data[7].strftime("%d/%m/%Y, %H:%M"),
            'ngayvk': data[8].strftime("%d/%m/%Y, %H:%M"),
            'maicd': data[9],
            'madoituong': data[10],
            'doituong': data[11],
            'sothe': data[12],
            'mauabo': data[13],
            'maurh': data[14]
        })
    
    return jsonify(result), 200

@noitru.route('/noitru/thuoc-dutrull-by-idkhoa/<site>/<string:idkhoa>', methods=['GET'])
def noitru_get_thuoc_dutrull_by_idkhoa(site, idkhoa):
    """
    Get list of thuoc du tru by idkhoa
    """
    cursor = get_cursor(site)
    result = []
    col_names = ['id', 'idduyet', 'songay', 'ngaytao', 'tenphieu', 'done', 'makhoaduockp', 'tenduockp', 'loaiphieu', 'schema'] 

    query = f'''
        WITH DSPHIEU AS (
                SELECT A.ID, A.IDDUYET, A.SONGAY
                FROM {schema_now()}.D_DUTRULL A
                WHERE A.IDKHOA = '{idkhoa}'
                UNION ALL 
                SELECT B.ID, B.IDDUYET, B.SONGAY
                FROM {schema_now()}.D_XTUTRUCLL B
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
            INNER JOIN {schema_now()}.D_DUYET B ON DS.IDDUYET = B.ID
            INNER JOIN D_LOAIPHIEU C ON C.ID = B.PHIEU
            INNER JOIN D_DUOCKP D ON B.MAKP = D.ID
            ORDER BY NGAYTAO DESC
    '''
    dutrull = cursor.execute(query).fetchall()
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
    col_names = ['stt_index', 'tt', 'doituong','idbd', 'mabd', 'ten_hamluong', 'dang', 'donvidung', 'duongdung', 'solan', 'lan', 'soluong', 'sang', 'trua', 'chieu', 'toi', 'giobd', 'giodung ','lieudungthuoc', 'tocdo', 'cachdung','dalieu', 'ghichu', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6']
    d_table = ''
    print("type is" , type)
    if type == '2':
        d_table = 'D_XTUTRUCCT'
    else:
        d_table = 'D_DUTRUCT'
    stm = f'''
        SELECT A.STT AS STT_INDEX, A.TT, B.DOITUONG, A.MABD AS IDBD, C.MA AS MABD, (C.TEN || ' ' || C.HAMLUONG) AS TEN_HAMLUONG, C.DANG, C.DONVIDUNG, A.DUONGDUNG,
        A.SOLAN , A.LAN ,  A.SLYEUCAU AS SOLUONG,
        A.N1 AS SANG, A.N2 AS TRUA, A.N3 AS CHIEU, A.BS AS TOI, A.GIOBD, A.GIODUNG, A.LIEUDUNGTHUOC, A.TOCDO, A.CACHDUNG, A.DALIEU, A.GHICHU, A.L1, A.L2, A.L3, A.L4, A.L5, A.L6
        FROM {schema_now()}.{d_table} A
        INNER JOIN D_DOITUONG B ON B.MADOITUONG = A.MADOITUONG
        INNER JOIN D_DMBD C ON C.ID = A.MABD 
        WHERE A.ID = '{id}'
        ORDER BY A.TT ASC
    '''
    print(stm)
    dutruct = cursor.execute(stm).fetchall()
    for dutru in dutruct:
        result.append(dict(zip(col_names, dutru)))
    return jsonify(result), 200
    
