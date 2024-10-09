import getpass
import oracledb
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor

dm = Blueprint('dm', __name__)


# stm = '''
#         SELECT ID, TEN
#         FROM NHOMNHANVIEN 
#         ORDER BY ID ASC
#     '''

@dm.route('/danhmuc/danhmuc-khoaphong-in/<site>/<khoaphong_string>', methods=['GET'])
def danhmuc_khoaphong_in(site, khoaphong_string):
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

@dm.route('/danhmuc/taikhoan-hsoft/<site>', methods=['GET'])
def danhmuc_taikhoan(site):
    cursor = get_cursor(site)
    
    result = []
    col_names = ['id', 'userid', 'password_', 'tentaikhoan', 'manhomtk', 'makp', 'mabs', 'hoten', 'manhomnv','tennhom', 'viettat', 'duyetkhambhyt', 'sochungchi', 'chungthuso', 'pin' ]
    
    stm = f'''
        WITH DMNV AS (
        SELECT A.MA, A.HOTEN, A.NHOM, B.TEN , A.VIETTAT , A.DUYETKHAMBHYT, A.SOCHUNGCHI, C.CHUNGTHUSO, C.PIN
        FROM DMBS A 
        LEFT JOIN NHOMNHANVIEN B ON A.NHOM = B.ID
        LEFT JOIN DMBS_SIGNATURE C ON A.MA = C.MANV
        WHERE A.NHOM <> 9
        )
        SELECT A.ID, A.USERID, A.PASSWORD_,A.HOTEN AS TENTAIKHOAN, A.MANHOM, A.MAKP, B.*
        FROM DLOGIN A
        INNER JOIN DMNV B ON A.MABS = B.MA
        WHERE A.HIDE = 0
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
    cursor = get_cursor(site)
    result = []
    col_name = ['id', 'idloai', 'idnhom', 'idnhombhyt', 'mavp', 'ten', 'dvt', 'bhyt', 'giath', 'giabh', 'giadv', 'trongoi', 'benhphamrangbuoc']
    stm = f'''
    SELECT A.ID, A.ID_LOAI, B.ID_NHOM, C.IDNHOMBHYT, A.MA, A.TEN, A.DVT, A.BHYT, A.GIA_TH , A.GIA_BH , A.GIA_DV, A.TRONGOI, A.BENHPHAMRANGBUOC
    FROM V_GIAVP A
    INNER JOIN V_LOAIVP B ON A.ID_LOAI = B.ID
    INNER JOIN V_NHOMVP C ON B.ID_NHOM = C.MA
    WHERE A.DIEUTIET = 0 AND A.HIDE = 0 AND A.TRONGOI = 0
    ORDER BY A.TEN ASC
    '''
    giavps = cursor.execute(stm).fetchall()
    for giavp in giavps:
        obj = {}
        for idx, col in  enumerate(col_name):
            obj[col] = giavp[idx]
        result.append(obj)
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

