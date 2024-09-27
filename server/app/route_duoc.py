import getpass
import oracledb
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now

duoc = Blueprint('duco', __name__)

@duoc.route('/duoc/dm_duocbv/<site>', methods=['GET'])
def duoc_dm_duocbv(site):
    cursor =get_cursor(site)
    result = []
    stm = 'SELECT ID, TEN FROM D_NHOMBO ORDER BY ID ASC'
    duocbvs = cursor.execute(stm).fetchall()
    for duocbv in duocbvs:
        result.append({
            'id': duocbv[0],
            'name': duocbv[1]
        })  
    return jsonify(result)

@duoc.route('/duoc/dmbd/<site>', methods=['GET'])
def duoc_dmbd(site):
    cursor =get_cursor(site)
    result = []
    return jsonify(result)

@duoc.route('/duoc/tonkho_ketoa_pk/<site>/<type>', methods=['GET'])
def tonkho_ketoa_pk(site, type):
    cursor =get_cursor(site)
    result = []
    if (site == 'HCM_DEV'):
        khoBHYT_ids = "4, 90, 91, 89"
        khoNT_ids = "16, 86, 87"
    else:
        khoBHYT_ids = "4, 90, 91, 89"
        khoNT_ids = "16,86,87"
    
    if(type == 'BHYT'):
        kho_ids = khoBHYT_ids
    else:
        kho_ids = khoNT_ids    

    stm =f'''
        SELECT C.MA,  C.TEN || ' ' || C.HAMLUONG AS TEN_HAMLUONG, C.DANG AS DVT, C.DONVIDUNG AS DVD, C.DUONGDUNG, C.BHYT ,sum(a.TONDAU) AS TONTHUC, sum(A.SLYEUCAU) AS BOOKING ,  (sum(a.TONDAU) - sum(A.SLYEUCAU)) AS TONKHADUNG
        FROM {schema_now()}.D_TONKHOTH A
        INNER JOIN D_DMKHO B ON A.MAKHO = B.ID
        INNER JOIN D_DMBD C ON A.MABD = C.ID
        WHERE A.MAKHO IN ({kho_ids})
        GROUP BY C.MA, C.TEN || ' ' || C.HAMLUONG, C.DUONGDUNG, C.DANG, C.DONVIDUNG, C.BHYT
    '''
    col_name = ['mabd', 'tenbd', 'dvt', 'dvd', 'duongdung', 'bhyt', 'tonthuc', 'booking', 'tonkhadung']
  
    datas = cursor.execute(stm).fetchall()
    for data in datas:
        obj = {}
        for idx, col in  enumerate(col_name):
            obj[col] = data[idx]
        result.append(obj)
    return jsonify(result), 200

@duoc.route('/duoc/danhsach-kho/<site>', methods=['GET'])
def duoc_tonkho_theokho_dskho(site):
    cursor =get_cursor(site)
    result = []
    hcm_kho_ids = "4, 90, 91, 89, 2, 102, 104"
    if (site == 'HCM_DEV'):
        kho_ids = hcm_kho_ids
    else:
        kho_ids = hcm_kho_ids 
    stm = f'''SELECT ID, TEN FROM D_DMKHO WHERE id IN ({kho_ids})'''
    schemaa = schema_now()
    khos = cursor.execute(stm).fetchall()
    for kho in khos:
        result.append({
            'id': kho[0],
            'name': kho[1]
        })
    return jsonify(result)


@duoc.route('/duoc/tonkho/theokho/<site>/<idkho>', methods=['GET'])
def duoc_tonkho_theokho(site, idkho):
    cursor =get_cursor(site)
    result = []
    col_name = ['id', 'mabd', 'tenbd','tenhc', 'dvt', 'dvd', 'duongdung', 'bhyt', 'tondau', 'slnhap', 'slxuat', 'toncuoi', 'slyeucau', 'tonkhadung', 'dalieu', 'duocbvid', 'maatc', 'adr','adrcao', 'sluongdvbsd']
    stm = f'''
        SELECT  A.MABD AS ID, C.MA,  C.TEN || ' ' || C.HAMLUONG AS TEN_HAMLUONG, C.TENHC, C.DANG AS DVT, C.DONVIDUNG AS DVD, C.DUONGDUNG, C.BHYT, A.TONDAU, A.SLNHAP, A.SLXUAT, (A.TONDAU + A.SLNHAP - A.SLXUAT) AS TONCUOI, A.SLYEUCAU , (A.TONDAU + A.SLNHAP - A.SLXUAT - A.SLYEUCAU) AS TONKD, D.DALIEU, C.NHOMBO, C.MAATC, C.ADR,D.ADRCAO, C.SOLUONGDVSD
        FROM {schema_now()}.D_TONKHOTH A 
        INNER JOIN D_DMBD C ON A.MABD = C.ID
        INNER JOIN D_DMBD_ATC D ON C.ID = D.ID
        WHERE A.MAKHO = {idkho}
    '''
    datas = cursor.execute(stm).fetchall()
    for data in datas:
        obj = {}
        for idx, col in  enumerate(col_name):
            obj[col] = data[idx]
        result.append(obj)
    return jsonify(result), 200

@duoc.route('/duoc/tonbhyt/<site>', methods=['GET'])
def tonbhyt(site):
    cursor =get_cursor(site)
    result = []
    stm = '''
        SELECT A.ID, A.MA, A.TEN, A.DANG, to_Char(B.DENNGAY_AX, 'dd/MM/yyyy') , A.SLTHAUBH AS TONBH_BD, 
        (A.SLTHAUBH - A.SLTHAUBH_SUDUNG) AS TONBH_THUC,
        SLTHAUBH_SUDUNG AS DADUNG,
        A.SLTHAUBH_YEUCAU AS TONBH_TREO,
        (A.SLTHAUBH - A.SLTHAUBH_SUDUNG - A.SLTHAUBH_YEUCAU) AS TONBH_KD
        FROM HSOFTTAMANH.D_DMBD A
        INNER JOIN HSOFTTAMANH.D_DMBDTHONGTU B ON A.ID = B.ID
        WHERE A.SLTHAUBH <> 0
    '''
    datas = cursor.execute(stm).fetchall()
    for data in datas:
        id_bd = data[0]
        theodois = cursor.execute(f"SELECT LOSX, HANDUNG FROM HSOFTTAMANH0524.D_THEODOI WHERE MABD = {id_bd}").fetchall()
        losx = []
        for theodoi in theodois:
            losx.append({"losx": theodoi[0], 'hsd': theodoi[1]})
        result.append({
            'id': data[0],
            "ma": data[1],
            "ten": data[2],
            "dvt": data[3],
            'hieulucthau': data[4],
            'losx': losx,
            
            "tonbd": data[5],
            "tonthuc": data[6],
            "dadung": data[7],
            "tontreo": data[8],
            "tonkd": data[9]
        })
    return jsonify(result)



@duoc.route('/duoc/danhsach-tutruc/<site>/<makp>', methods=['GET'])
def get_tutrucs(site, makp):
    cursor = get_cursor(site)
    stm = f'SELECT ID, TEN FROM D_DUOCKP WHERE MAKP = {makp}'
    rows = cursor.execute(stm).fetchall()
    return jsonify([dict(id=row[0], name=row[1]) for row in rows])

@duoc.route('/duoc/tutruc/tontutruc/<site>/<idtutruc>', methods=['GET'])
def get_tutruc_tonkho(site, idtutruc):
    """
    Get tonkho of a tutruc
    """
    cursor = get_cursor(site)
    result = []
    stm = f'''
        SELECT  a.mabd AS id, c.ma AS mabd,  c.ten || ' ' || c.hamluong AS ten_hamluong, c.dang AS dvt, c.donvidung AS dvd, c.duongdung, c.bhyt, a.tondau, a.slnhap, a.slxuat, (a.tondau + a.slnhap - a.slxuat) AS toncuoi, a.slyeucau , (a.tondau + a.slnhap - a.slxuat - a.slyeucau) AS tonkhadung, d.dalieu, c.nhombo, c.maatc, c.adr, d.adrcao
        FROM {schema_now()}.d_tutructh a 
        INNER JOIN d_dmbd c ON a.mabd = c.id
        INNER JOIN d_dmbd_atc d ON c.id = d.id
        WHERE a.makp = :idtutruc
    '''

    col_names = [
        'id',
        'mabd',
        'tenbd',
        'dvt',
        'dvd',
        'duongdung',
        'bhyt',
        'tondau',
        'slnhap',
        'slxuat',
        'toncuoi',
        'slyeucau',
        'tonkhadung',
        'dalieu',
        'duocbvid',
        'maatc',
        'adr',
        'adrcao'
    ]

    datas = cursor.execute(stm, {'idtutruc': idtutruc}).fetchall()
    for data in datas:
        obj = {}
        for idx, col in enumerate(col_names):
            obj[col] = data[idx]
        result.append(obj)
    return jsonify(result), 200

@duoc.route('/duoc/tutruc/tontutruc-chitiet/<site>/<idtutruc>', methods=['GET'])
def duoc_tontutruc_chitiet(site, idtutruc):
    cursor =get_cursor(site)
    result = []
    cols = ['mabd', 'tenbd', 'dvt', 'dvd', 'duongdung', 'bhyt', 'tondau', 'slnhap', 'slxuat', 'toncuoi', 'handung', 'losx', 'nhombo', 'dalieu']
    stm = f'''
        SELECT A.MABD , B.TEN || ' ' || B.HAMLUONG AS TEN_HAMLUONG , B.DANG, B.DONVIDUNG, B.DUONGDUNG , B.BHYT,  A.TONDAU , A.SLNHAP , A.SLXUAT, (A.TONDAU + A.SLNHAP - A.SLXUAT) AS TONCUOI,  D.HANDUNG , D.LOSX, B.NHOMBO, C.DALIEU 
        FROM {schema_now()}.D_TUTRUCCT A
        INNER JOIN D_DMBD B ON A.MABD = B.ID
        INNER JOIN D_DMBD_ATC C ON B.ID = C.ID
        LEFT JOIN {schema_now()}.D_THEODOI D ON A.STT = D.ID
        WHERE A.MAKP = {idtutruc}
    '''
    datas = cursor.execute(stm).fetchall()
    for data in datas:
        obj = {}
        for idx, col in  enumerate(cols):
            obj[col] = data[idx]
        result.append(obj)
    return jsonify(result), 200