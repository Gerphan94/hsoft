import getpass
import oracledb
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import json


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# connection = oracledb.connect(
#     user="hsofttamanh",
#     password='hsofttamanh',
#     dsn="hsoft-dev.vdc.tahcm.vn/dev3")


medicine_cols = ['id', 'mabd', 'tenbd', 'dvt', 'dvd', 'duongdung', 'bhyt', 'tondau', 'slnhap', 'slxuat', 'toncuoi', 'slyeucau', 'tonkhadung', 'dalieu', 'duocbvid', 'maatc']


def schema_now():
    inow = datetime.now()
    format_string = inow.strftime('%m%y')
    return f'HSOFTTAMANH{format_string}'

def schema_mutil(fromDate, toDate):

    # Initialize an empty set to store unique MMYY strings
    date_strings = set()
    # Loop through each date in the range
    current_date = fromDate
    while current_date <= toDate:
        # Format the current date as MMYY and add it to the set
        date_strings.add('HSOFTTAMANH' + current_date.strftime('%m%y'))
        # Move to the next day
        current_date += timedelta(days=1)
    # Convert the set to a sorted list
    # sorted_date_strings = sorted(date_strings)
    return date_strings


def conn_info(env):
   
    if (env == 'HN_LIVE'):
        return {
            'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"hsoft-primary.bvta.vn/hsoft.quang"
        }
    elif (env == 'HN_DEV'):
        return {
            'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"192.168.8.5/hndev"
        }
    elif (env == 'HCM_UAT'):
        return {
            'user':"hsofttamanh",
            'password':'HSOFTTAMANH2023',
            'dsn':"hsoft-dev.vdc.tahcm.vn/uat1"
        }
        
    else:
        return {
            'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"hsoft-dev.vdc.tahcm.vn/dev3"
        }
        
def arrays_equal(arr1, arr2):
    return set(arr1) == set(arr2)
        
@app.route('/thongtin_benhnhan/<site>/<pid>', methods=['GET'])
def person_info(site ,pid):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = {}
    
    stm = f'''
            SELECT MABN, HOTEN, to_char(NGAYSINH, 'ddMMyyyy') AS NGAYSINH, PHAI
            FROM hsofttamanh.BTDBN 
            WHERE MABN = '{pid}'
        '''
    person  = cursor.execute(stm).fetchall()
    if (len(person) == 0):
        return jsonify({'msg': 'Không thấy thông tin!'}), 404
    person = person[0]
    col_name = ['pid', 'hoten', 'ngaysinh', 'phai']
    for idx, col in  enumerate(col_name):
        result[col] = person[idx]
    return  jsonify(result), 200


@app.route('/goikham_list/<site>/<viewDate>' , methods=['GET'])
def goikham_list(site, viewDate):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    
    print(viewDate)
    
    
    return jsonify(result), 200

@app.route('/goikham/<site>/<pid>' , methods=['GET'])
def goitkham(site, pid):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = f'''
        SELECT A.ID, TO_CHAR(A.NGAY, 'dd/MM/yyyy HH:mm')  , A.IDGOI, B.TEN, A.SOTIEN, A.IDTTRV 
        FROM V_THEODOIGOILL A
        INNER JOIN V_GIAVP B ON A.IDGOI = B.ID
        WHERE A.MABN = {pid}
    '''
    col_name = ['id', 'ngay', 'idgoi', 'tengoi', 'sotien', 'idtt' ]
    
    gois = cursor.execute(stm).fetchall()
    for goi in gois:
        obj = {}
        for idx, col in  enumerate(col_name):

            obj[col] = str(goi[idx])
        result.append(obj)
    return jsonify(result), 200   

@app.route('/goikham_chitiet/<site>/<idgoi>' , methods=['GET'])
def goikham_chitiet(site, idgoi):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = f'''
        SELECT A.MAVP, C.MA, C.TEN , A.SOLUONG , A.SLSUDUNG, B.STT, B.DONGIA , B.DONGIAGOI
        FROM V_THEODOIGOICT A
        INNER JOIN V_TRONGOI B ON A.FID = B.FID
        INNER JOIN V_GIAVP C ON A.MAVP = C.ID
        WHERE  A.ID = '{idgoi}'
        ORDER BY B.STT ASC
    '''
    col_name = ['id', 'mavp', 'ten', 'sl', 'slsudung', 'stt', 'dongia', 'dongiagoi']
    
    details = cursor.execute(stm).fetchall()
    for detail in details:
        obj = {}
        for idx, col in  enumerate(col_name):
            obj[col] = detail[idx]
        result.append(obj)
    return jsonify(result), 200

@app.route('/goikham_check/<site>' , methods=['GET'])
def goikham_check(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = f'''
        SELECT ID, IDGOI  FROM V_THEODOIGOILL 
        WHERE NGAY = TO_DATE('29-05-2024', 'DD-MM-YYYY')
    '''
    
    myList = cursor.execute(stm).fetchall()
    
    for ele in myList:
        id = ele[0]
        idgoi = ele[1]
        stm1 =f"SELECT FID FROM V_THEODOIGOICT WHERE id = '{id}'"
        FID1 = [row[0] for row in cursor.execute(stm1).fetchall()]
        stm2 = f"SELECT FID FROM V_TRONGOI WHERE id = {idgoi}"
        FID2 = [row[0] for row in cursor.execute(stm2).fetchall()]
        icheck = arrays_equal(FID1, FID2)
        if (icheck is False):
            print(id)
    return jsonify(result), 200
    
    
    
# ĐẶT KHÁM
@app.route('/taolichkham/<site>', methods=['POST'])
def taolichkham(site):
    if (site != 'HCM_DEV'):
        return jsonify({'message':'Site không được tạo'}), 400
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    result = []
    
    data = request.get_json()
    pid = data['pid']
    makp = data['makp']
    tenkp = data['tenkp']
    
    stm1 = f'''
        SELECT A.MABN, A.HOTEN, to_char(A.NGAYSINH, 'ddMMyyyy') AS NGAYSINH, A.NAMSINH, A.PHAI, A.THON AS DIACHI, A.MAPHUONGXA ,  B.DIDONG
        FROM hsofttamanh.BTDBN A
        LEFT JOIN DIENTHOAI B ON A.MABN = B.MABN
        WHERE A.MABN = '{pid}'   
    '''
    col_name = ['pid', 'hoten', 'ngaysinh', 'namsinh', 'phai', 'diachi', 'maphuongxa', 'didong']
    df = pd.read_sql_query(stm1, connection)
    json_data = df.to_json(orient='records', force_ascii=False)
    
    print("Json data is", type(json_data) )
    BN = json.loads(json_data)[0]
    # BN = cursor.execute(stm1).fetchall()
    den = datetime.now()
    ngay = den -  timedelta(days=2)
    id = ngay.strftime("%y%m%d%H%M%S%f")
    userid = '5258' # Tổng đầi TA
    mabs = '0155'
    # 210914100519872735
    # 240523084655583762
    insert_stm = f'''
        INSERT INTO DATKHAM (MABN , NGAY, DEN, DIENTHOAI, DIDONG , KHAM, MABS, USERID, NGAYUD, HOTEN, NAMSINH, NGAYSINH,  PHAI, DIACHI, MAKP, TUOIVAO, ID, MAPHUONGXA)
        VALUES ({pid}, {ngay}, {den}, {BN['DIDONG']},  {BN['DIDONG']}, {tenkp}, {mabs}, {userid}, {ngay}, {BN['HOTEN']}, {BN['NGAYSINH']}, {BN['PHAI']}, {BN['DIACHI']}, {makp} , '010', {id}, );
    '''
    
    print(insert_stm)
    
    

    # smt =f'''
    #     INSERT INTO DATKHAM (MABN , NGAY, DEN, DIENTHOAI , DIDONG , KHAM, ID, TTLUCRV)
    #     VALUES ('21065331', {ngay}, {den}, '0987888888', 0987888888, 'Phòng Khám Sản - phụ khoa 3);
    # '''
    
    
    return jsonify(result), 200
    
    
 
    
@app.route('/hien_dien/<site>/<pid>', methods=['GET'])
def hien_dien(site ,pid):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = {}
    stm = f'''
        SELECT A.ID, A.MABN, to_char(A.NGAYVV, 'dd/MM/yyyy HH24:MI') as NGAYVV, to_char(A.NGAY, 'dd/MM/yyyy HH24:MI') as NGAYNK  , B.TENKP, A.MAVAOVIEN, A.MAQL  
        FROM hsofttamanh.HIENDIEN A
        INNER JOIN hsofttamanh.BTDKP_BV B ON A.MAKP = B.MAKP
        WHERE A.mabn = '{pid}'
    '''
    noitrus = cursor.execute(stm).fetchall()
    # RETURN EMPTY IF DONT EXIST
    if (len(noitrus) == 0):
        return jsonify({'hiendien': [], 'personinfo': {}})
    obj_hd = []
    for noitru in noitrus:
        obj_hd.append({
            'id': str(noitru[0])
            ,
            'pid': str(noitru[1]),
            'ngayvv': noitru[2],
            'ngaynk': noitru[3],
            'tenkp': noitru[4],
            'mavaovien': str(noitru[5]),
            'maql': str(noitru[6]),
            'loaiba':'Nội trú'
        })
   
    stm2 = f'''
        SELECT MABN, HOTEN, to_char(NGAYSINH, 'dd/MM/yyyy') AS NGAYSINH, 
            CASE
                WHEN PHAI = 0 THEN 'Nam'
                ELSE 'Nữ'
            END AS PHAI
        FROM hsofttamanh.BTDBN 
        WHERE MABN = '{pid}'
    '''
    obj_person = {}
    person_info = cursor.execute(stm2).fetchall()[0]
    if(person_info):
        obj_person['pid'] = str(person_info[0]) 
        obj_person['hoten'] = person_info[1]
        obj_person['ngaysinh'] = person_info[2]
        obj_person['phai'] = person_info[3]
    
    result['hiendien'] = obj_hd
    result['personinfo'] = obj_person
    return jsonify(result)

@app.route('/hien_dien/dutru_benhnhan/<site>/<hiendien_id>', methods=['GET'])
def hien_dien_dutru_benhnhan(site , hiendien_id):

    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    hiendien_stm = f"SELECT MAVAOVIEN, NGAYVV FROM HSOFTTAMANH.HIENDIEN WHERE ID = '{hiendien_id}'"
    hiendien = cursor.execute(hiendien_stm).fetchall()[0]
    hiendien_mavv = hiendien[0]
    # hiendien_ngayvv = hiendien[1]
    schema = 'HSOFTTAMANH0424'
    
    stm = f'''
        SELECT IDDUYET FROM {schema}.D_DUTRULL A
        WHERE MAVAOVIEN = '{hiendien_mavv}'
    '''

    result = []
    phieus = cursor.execute(stm).fetchall()
    
    for phieuId in phieus:
        id_duyet = phieuId[0]
        obj = {}
        stm = f'''
            SELECT A.id, to_char(A.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAY, B.TEN, C.TEN AS DUOCKP,
            to_char(A.NGAYTAO, 'dd/MM/yyyy HH24:MI:SS') as NGAYTAO, 
            to_char(A.NGAYUD, 'dd/MM/yyyy HH24:MI:SS') AS NGAYUD,
            CASE
                WHEN A.DONE = 0 THEN 'Mới'
                WHEN A.DONE = 1 THEN 'Chuyển đi'
                WHEN A.DONE = 2 THEN 'Duyệt'
                WHEN A.DONE = 3 THEN 'Lấy số liệu'
                ELSE to_char(A.DONE)
            END AS TRANGTHAI
            FROM {schema}.D_DUYET A
            INNER JOIN HSOFTTAMANH.D_LOAIPHIEU B ON B.id = A.PHIEU
            INNER JOIN HSOFTTAMANH.D_DUOCKP C ON A.MAKP = C.ID 
            WHERE A.id = '{id_duyet}'
        '''
        phieu = cursor.execute(stm).fetchall()[0]
        
        obj = {
            "id": str(phieu[0]),
            "ngay": phieu[1],
            "ten": phieu[2],
            'duockp': phieu[3],
            "ngaytao": phieu[4],
            "ngayud": phieu[5],
            "trangthai": phieu[6]
        }
        result.append(obj)
    return jsonify(result)


@app.route('/hien_dien/dutruCT/<site>/<id>', methods=['GET'])
def dutruCT(site , id):
    schema = 'HSOFTTAMANH0424'

    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    result = []
    
    stm = f'''
        SELECT A.ID, A.MABN, B.HOTEN  FROM {schema}.D_DUTRULL A 
        INNER JOIN HSOFTTAMANH.BTDBN B ON A.MABN = B.MABN
        WHERE A.IDDUYET  =  {id}
    '''
    dutrull = cursor.execute(stm).fetchall()
    
    for dutru in dutrull:
        dutru_id = dutru[0]
        pid = dutru[1]
        hoten = dutru[2]
        stm2 = f'''
            SELECT A.STT, D.MA, D.TEN, A.DUONGDUNG, B.DOITUONG, A.DONGIA, A.SLYEUCAU, C.TEN, A.DALIEU
            FROM {schema}.D_DUTRUCT A
            INNER JOIN HSOFTTAMANH.D_DOITUONG B ON A.MADOITUONG = B.MADOITUONG 
            INNER JOIN HSOFTTAMANH.D_DMKHO C ON A.MAKHO = C.ID
            INNER JOIN HSOFTTAMANH.D_DMBD D ON A.MABD = D.ID
            WHERE A.ID = '{dutru_id}'
        '''
        thuocs = cursor.execute(stm2).fetchall()
        
        thuoc_ar = []
        for thuoc in thuocs:
            thuoc_ar.append({
                "stt": thuoc[0],
                "mathuoc": thuoc[1],
                "tenthuoc": thuoc[2],
                "duongdung": thuoc[3],
                "doituong": thuoc[4],
                "dongia": thuoc[5],
                "slyc": thuoc[6],
                "tenkho": thuoc[7],
                "dalieu": thuoc[8]
            })
        result.append({
            'mabn': pid,
            "hoten": hoten,
            "thuoc": thuoc_ar
        })
    print(list(result))
    return jsonify(result)

@app.route('/khambenh/<site>/<ngay>', methods=['GET'])
def khambenh(site , ngay):
    imonth = ngay[4:6]
    iyear = ngay[2:4]
    schema = "HSOFTTAMANH" + imonth + iyear
  
    result = []
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    stm = f'''
        SELECT A.MABN, C.HOTEN,
        CASE
            WHEN C.PHAI = 0 THEN 'Nam'
            ELSE 'Nữ'
        END AS PHAI,
        TO_CHAR(C.NGAYSINH, 'dd/MM/yyyy') as NGAYSINH  , B.TENKP, D.DOITUONG, TO_CHAR(A.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAYTN,
        TO_CHAR(E.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAYKB, A.DONE,
        E.MAVAOVIEN, E.MAQL AS MAQLKB, A.MAQL AS MAQLTN
        FROM {schema}.TIEPDON A
        INNER JOIN HSOFTTAMANH.BTDKP_BV B ON A.MAKP = B.MAKP
        INNER JOIN HSOFTTAMANH.BTDBN C ON A.MABN  = C.MABN
        INNER JOIN HSOFTTAMANH.DOITUONG D ON A.MADOITUONG = D.MADOITUONG
        LEFT  JOIN {schema}.BENHANPK E ON A.MAVAOVIEN = E.MAVAOVIEN AND A.MAKP = E.MAKP
        
        
        WHERE  TO_CHAR(A.NGAY, 'yyyyMMdd') = '{ngay}'
        ORDER BY A.NGAY ASC
    '''
    
    khambenhs = cursor.execute(stm).fetchall()
    for kb in khambenhs:
        
        kb_maql = kb[10]
        result.append({
            "mabn": kb[0],
            "hoten": kb[1],
            "phai": kb[2],
            "ngaysinh": kb[3],
            "tenkp": kb[4],
            "doituong": kb[5],
            "ngaytn": kb[6],
            "ngaykb": kb[7],
            "done": kb[8],
            'mavaovie': kb[9],
            'maqlkb': kb[10],
            'maqltn': kb[11]  
        })

    return jsonify(result)

@app.route('/khambenh/xuattt/<site>/<maql>', methods=['GET'])
def khambenh_xuattutruc(site , maql):
    result = []
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    stm = f'''
        
    '''
    
    return jsonify(result)
    
# NOI TRU ######################################################################
# API for NOI TRU ##############################################################
# ##############################################################################

@app.route('/noitru/dskhoa/<site>', methods=['GET'])
def noitru_dskhoa(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = 'SELECT * FROM BTDKP_BV WHERE LOAI = 0 AND KHAMBENH = 0'
    khoas = cursor.execute(stm).fetchall()
    for khoa in khoas:
        result.append({
            'id': khoa[0],
            'name': khoa[1]
        })
    return jsonify(result)

@app.route('/noitru/hiendien/<site>/<makp>', methods=['GET'])
def noitru_hiendien(site, makp):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
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

@app.route('/noi-tru/get-benhandt-doituong/<site>/<maql>', methods=['GET'])
def noitru_benhandt_doituong(site, maql):
    cn = conn_info(site)
    cursor = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn']).cursor()
    result = {}
    stm = f'''
        SELECT A.MABN, D.HOTEN, B.MADOITUONG, B.DOITUONG, C.SOTHE , C.TUNGAY , C.DENNGAY, C.MABV
        FROM BENHANDT A
        INNER JOIN DOITUONG B ON A.MADOITUONG = B.MADOITUONG 
        LEFT JOIN BHYT C ON A.MAQL = C.MAQL
        INNER JOIN BTDBN D ON A.MABN = D.MABN
        WHERE  A.MAQL = '{maql}'
    '''
    benhandt = cursor.execute(stm).fetchone()
    result['pid'] = benhandt[0]
    result['pname'] = benhandt[1]
    result['madoituong'] = benhandt[2]
    result['doituong'] = benhandt[3]
    result['sothe'] = benhandt[4]
    result['tungay'] = benhandt[5]
    result['denngay'] = benhandt[6]
    result['mabv'] = benhandt[7]
    
    return jsonify(result), 200

@app.route('/noi-tru/update-doituong/<site>', methods=['POST'])
def noitru_updatedoituong(site):
    cn = conn_info(site)
    cursor = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn']).cursor()
    if site != 'HCM_UAT':
        return jsonify({'error':'Site không có quyền'}), 403
    data = request.get_json()
    pid = data['pid']
    maql = data['maql']
    madoituong = data['madoituong']
    try:
        stm = f"UPDATE BENHANDT SET MADOITUONG = {madoituong} WHERE MABN = '{pid}' AND MAQL = '{maql}'"
        cursor.execute(stm)

        return jsonify({'message': 'Cập nhật đối tượng bhyt thành công'}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': str(e)}), 500

@app.route('/noi-tru/insert-bhyt/<site>', methods=['POST'])
def noitru_insertbhyt(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    connection.autocommit = True
    cursor = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn']).cursor()
    
    if site != 'HCM_UAT':
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
            
        
@app.route('/noi-tru/get-nhap-khoa-of-bn/<site>/<string:maql>', methods=['GET'])
def noitru_nhapkhoaofbn(site, maql):
    cn = conn_info(site)
    cursor = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn']).cursor()
    result = []
    stm = f'''
        SELECT TO_CHAR(A.ID) AS IDKHOA, B.TENKP FROM NHAPKHOA A
        INNER JOIN BTDKP_BV B ON A.MAKP = B.MAKP 
        WHERE A.MAQL = '{maql}'
        ORDER BY A.NGAY DESC
    '''
    nhapkhoa = cursor.execute(stm).fetchall()
    for nhapkhoa in nhapkhoa:
        result.append({
            'id': nhapkhoa[0],
            'name': nhapkhoa[1]
        })
    return jsonify(result), 200

@app.route('/noi-tru/get-chidinh-by-idkhoa/<site>/<string:idkhoa>', methods=['GET'])
def noitru_getchidinhbyidkhoa(site, idkhoa):
    cn = conn_info(site)
    cursor = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn']).cursor()
    result = []
    
    ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]
    iNow = datetime.now()  
    schema_ar = list(schema_mutil(ngaynhapkhoa, iNow))
    
    col_names = ['ngay', 'doituong', 'tendichvu', 'soluong', 'dongia', 'idchidinh', 'ghichu', 'thuchien', 'ngayylenh', 'ngaythuchien', 'maphieu', 'benhpham', 'idloai', 'idnhom']
    for schema in reversed(schema_ar):
        stm = f'''
            SELECT TO_CHAR(A.NGAY, 'dd/MM/yyyy') AS NGAY, C.DOITUONG, B.TEN, A.SOLUONG, A.DONGIA, TO_CHAR(A.IDCHIDINH) AS IDCHIDINH, A.GHICHU, A.THUCHIEN, TO_CHAR(A.NGAY, 'dd/MM/yyyy HH24:MI') AS NGAYYLENH, TO_CHAR(A.NGAYTHUCHIEN, 'dd/MM/yyyy HH24:MI') AS NGAYTHUCHIEN, A.MAPHIEU, D.TEN AS BENHPHAM, E.ID AS IDLOAI, E.ID_NHOM AS IDNHOM
            FROM {schema}.V_CHIDINH A
            INNER JOIN V_GIAVP B ON B.ID = A.MAVP
            INNER JOIN DOITUONG C ON C.MADOITUONG = A.MADOITUONG
            INNER JOIN DMBENHPHAM D ON D.ID = A.BENHPHAM 
            INNER JOIN V_LOAIVP E ON B.ID_LOAI = E.ID
            WHERE A.IDKHOA =  '{idkhoa}'
            AND A.MADOITUONG <> 3
            ORDER BY NGAY DESC, NGAYYLENH ASC
        '''
        chidinh = cursor.execute(stm).fetchall()
        for chidinh in chidinh:
            result.append(dict(zip(col_names, chidinh)))
    return jsonify(result), 200

@app.route('/noitru/dutrull_ofBN_inHiendien/<site>/<idkhoa>', methods=['GET'])
def noitru_dutrull_ofBN_inHiendien(site, idkhoa):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]
    iNow = datetime.now()  
    schema_ar = list(schema_mutil(ngaynhapkhoa, iNow))
    print(schema_ar)
    # get all phieu 
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



@app.route('/noitru/phieu_info/<site>/<int:type>/<id>/<ngay>', methods=['GET'])
def noitru_phieu_info(site,type, id, ngay):
    print(ngay)
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
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


@app.route('/noitru/phieuct/<site>/<type>/<id>', methods=['GET'])
def noitru_dutru_ct(site,type, id):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    col_names = ['stt_index', 'tt', 'doituong','idbd', 'mabd', 'ten_hamluong', 'dang', 'donvidung', 'duongdung', 'solan', 'lan', 'soluong', 'sang', 'trua', 'chieu', 'toi', 'giobd', 'giodung ','lieudungthuoc', 'tocdo', 'cachdung','daliem']
    d_table = ''
    print("type is" , type)
    if type == '2':
        d_table = 'D_XTUTRUCCT'
    else:
        d_table = 'D_DUTRUCT'
    
    stm = f'''
        SELECT A.STT AS STT_INDEX, A.TT, B.DOITUONG, A.MABD AS IDBD, C.MA AS MABD, (C.TEN || ' ' || C.HAMLUONG) AS TEN_HAMLUONG, C.DANG, C.DONVIDUNG, A.DUONGDUNG,
        A.SOLAN , A.LAN ,  A.SLYEUCAU AS SOLUONG,
        A.N1 AS SANG, A.N2 AS TRUA, A.N3 AS CHIEU, A.BS AS TOI, A.GIOBD, A.GIODUNG, A.LIEUDUNGTHUOC, A.TOCDO, A.CACHDUNG, A.DALIEU
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

@app.route('/noitru/tutruc_ct/<site>/<id>', methods=['GET'])
def noitru_tutruc_ct(site, id):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    col_names = ['stt_index', 'tt', 'doituong', 'mabd', 'ten_hamluong', 'dang', 'donvidung', 'duongdung', 'solan', 'lan', 'soluong', 'sang', 'trua', 'chieu', 'toi', 'giobd', 'giodung ','lieudungthuoc', 'tocdo', 'cachdung','daliem']
    stm = f'''
        SELECT A.STT AS STT_INDEX, A.TT, B.DOITUONG, A.MABD, (C.TEN || ' ' || C.HAMLUONG) AS TEN_HAMLUONG, C.DANG, C.DONVIDUNG, A.DUONGDUNG,
        A.SOLAN , A.LAN ,  A.SLYEUCAU AS SOLUONG,
        A.N1 AS SANG, A.N2 AS TRUA, A.N3 AS CHIEU, A.BS AS TOI, A.GIOBD, A.GIODUNG, A.LIEUDUNGTHUOC, A.TOCDO, A.CACHDUNG, A.DALIEU
        FROM {schema_now()}.D_XTUTRUCCT A
        INNER JOIN D_DOITUONG B ON B.MADOITUONG = A.MADOITUONG
        INNER JOIN D_DMBD C ON C.ID = A.MABD 
        WHERE A.ID = '{id}'
        ORDER BY A.TT ASC
    '''
    dutruct = cursor.execute(stm).fetchall()
    for dutru in dutruct:
        result.append(dict(zip(col_names, dutru)))
    return jsonify(result), 200

@app.route('/noitru/toaravien_ct/<site>/<id>', methods=['GET'])
def noitru_toaravien_ct(site, id):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = f'''

    
    '''

    return jsonify(result), 200

@app.route('/to-dieu-tri/get-empty-dien-bien/<site>/<idkhoa>', methods=['GET'])
def to_dieu_tri_get_empty_dien_bien(site, idkhoa):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]
    iNow = datetime.now()  
    schema_ar = list(schema_mutil(ngaynhapkhoa, iNow))
    print(schema_ar)
    for schema in (schema_ar):
        stm =f'''
            WITH DB_THUOC AS (
                SELECT IDSEQ 
                FROM {schema}.TA_DIENBIENYL 
                WHERE ISACTIVE = 1
            ),
            DB_CLS AS (
                SELECT IDSEQ 
                FROM {schema}.TA_DIENBIENCLS 
                WHERE ISACTIVE = 1
            )
            SELECT A.*
            FROM {schema}.TA_DIENBIEN A
            LEFT JOIN DB_THUOC B ON A.IDSEQ = B.IDSEQ
            LEFT JOIN DB_CLS C ON A.IDSEQ = C.IDSEQ
            WHERE A.IDKHOA = '{idkhoa}'
            AND A.ISSIGNED = 0
            AND B.IDSEQ IS NULL 
            AND C.IDSEQ IS NULL
            ORDER BY A.NGAY DESC
        '''
        

    return jsonify(result), 200



####################################################################

@app.route('/datkham/error_datkham/<site>/<ngay>/<upper>', methods=['GET'])
def error_datkham(site , ngay, upper):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    if (upper):
        stm = f'''
            SELECT A.MABN, C.HOTEN , A.KHAM , A.MAKP, B.TENKP, to_char(A.DEN, 'dd/MM/yyyy HH24:MI:SS') as NGAY, A.DONE
            FROM HSOFTTAMANH.DATKHAM  A
            INNER JOIN HSOFTTAMANH.BTDKP_BV B ON A.MAKP = B.MAKP
            INNER JOIN HSOFTTAMANH.BTDBN C ON A.MABN = C.MABN
            WHERE to_char(A.DEN,'yyyyMMdd') = '{ngay}' AND UPPER(TRIM(A.KHAM)) <> UPPER(TRIM(B.TENKP))
        '''
    else:
        stm = f'''
            SELECT A.MABN, C.HOTEN , A.KHAM , A.MAKP, B.TENKP, to_char(A.DEN, 'dd/MM/yyyy HH24:MI:SS') as NGAY, A.DONE
            FROM HSOFTTAMANH.DATKHAM  A
            INNER JOIN HSOFTTAMANH.BTDKP_BV B ON A.MAKP = B.MAKP
            INNER JOIN HSOFTTAMANH.BTDBN C ON A.MABN = C.MABN
            WHERE to_char(A.DEN,'yyyyMMdd') = '{ngay}' AND (A.KHAM) <> (B.TENKP)
        '''
    ds = cursor.execute(stm).fetchall()
    for bn in ds:
        result.append(
            {
                "mabn": bn[0],
                "hoten": bn[1],
                "khamhen": bn[2],
                "makp": bn[3],
                "tenkp": bn[4],
                "ngay": bn[5],
                "done": bn[6]
            }
        )
    return jsonify(result)

#################################################################
# API DƯỢC ######################################################
# ###############################################################


@app.route('/duoc/dm_duocbv/<site>', methods=['GET'])
def duoc_dm_duocbv(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = 'SELECT ID, TEN FROM D_NHOMBO ORDER BY ID ASC'
    
    duocbvs = cursor.execute(stm).fetchall()
    for duocbv in duocbvs:
        result.append({
            'id': duocbv[0],
            'name': duocbv[1]
        })  
    return jsonify(result)




@app.route('/duoc/dmbd/<site>', methods=['GET'])
def duoc_dmbd(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    return jsonify(result)

@app.route('/duoc/dup_act/<site>/<idkho>', methods=['GET'])
def duoc_dup_act(site, idkho):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm =f'''
        SELECT B.MAATC AS ID, B.MAATC AS NAME
        FROM {schema_now()}.D_TONKHOTH A
        INNER JOIN D_DMBD B ON A.MABD = B.ID 
        WHERE A.MAKHO = {idkho}
        GROUP BY MAATC
        HAVING COUNT(MAATC) > 1
    '''
    
    ATCS = cursor.execute(stm).fetchall()
    for ATC in ATCS:
        result.append({
            'id': ATC[0],
            'name': ATC[1]
        }) 
    return jsonify(result)


@app.route('/duoc/tonkho_ketoa_pk/<site>/<type>', methods=['GET'])
def tonkho_ketoa_pk(site, type):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
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
    

@app.route('/duoc/tonkho/<site>/<id_nhom>', methods=['GET'])
def duoc_tonkho(site, id_nhom):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = f'SELECT ID, TEN FROM D_DMKHO WHERE nhom = {id_nhom} AND ID > 0'
    khos = cursor.execute(stm).fetchall()
    return jsonify(result)

@app.route('/duoc/tonkho/theokho/dskho/<site>', methods=['GET'])
def duoc_tonkho_theokho_dskho(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
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

@app.route('/duoc/tonkho/theokho/<site>/<idkho>', methods=['GET'])
def duoc_tonkho_theokho(site, idkho):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    col_name = ['id', 'mabd', 'tenbd','tenhc', 'dvt', 'dvd', 'duongdung', 'bhyt', 'tondau', 'slnhap', 'slxuat', 'toncuoi', 'slyeucau', 'tonkhadung', 'dalieu', 'duocbvid', 'maatc', 'adr', 'sluongdvbsd']
    stm = f'''
        SELECT  A.MABD AS ID, C.MA,  C.TEN || ' ' || C.HAMLUONG AS TEN_HAMLUONG, C.TENHC, C.DANG AS DVT, C.DONVIDUNG AS DVD, C.DUONGDUNG, C.BHYT, A.TONDAU, A.SLNHAP, A.SLXUAT, (A.TONDAU + A.SLNHAP - A.SLXUAT) AS TONCUOI, A.SLYEUCAU , (A.TONDAU + A.SLNHAP - A.SLXUAT - A.SLYEUCAU) AS TONKD, D.DALIEU, C.NHOMBO, C.MAATC, C.ADR, C.SOLUONGDVSD
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
    
@app.route('/duoc/tonbhyt/<site>', methods=['GET'])
def tonbhyt(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
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

# TỦ TRỰC


@app.route('/duoc/tutruc/ds_khoaphong/<site>', methods=['GET'])
def duoc_dm_khoaphong(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = '''
        SELECT DISTINCT B.MAKP AS ID , B.TENKP AS NAME 
        FROM D_DUOCKP A
        INNER JOIN BTDKP_BV B ON A.MAKP = B.MAKP
        ORDER BY B.TENKP ASC
    '''
    
    khoaphongs = cursor.execute(stm).fetchall()
    for khoaphong in khoaphongs:
        result.append({
            'id': khoaphong[0],
            'name': khoaphong[1]
        })  
    return jsonify(result)

@app.route('/duoc/tutruc/ds_tutruc/<site>/<makp>', methods=['GET'])
def duoc_dm_tutruc(site, makp):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = f'SELECT ID, TEN FROM D_DUOCKP WHERE MAKP = {makp}'
    tutrucs = cursor.execute(stm).fetchall()
    for tutruc in tutrucs:
        result.append({
            'id': tutruc[0],
            'name': tutruc[1]
        })  
    return jsonify(result)  

@app.route('/duoc/tutruc/tontutruc/<site>/<idtutruc>', methods=['GET'])
def duoc_tontutruc(site, idtutruc):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = f'''
        SELECT  A.MABD AS ID, C.MA,  C.TEN || ' ' || C.HAMLUONG AS TEN_HAMLUONG, C.DANG AS DVT, C.DONVIDUNG AS DVD, C.DUONGDUNG, C.BHYT, A.TONDAU, A.SLNHAP, A.SLXUAT, (A.TONDAU + A.SLNHAP - A.SLXUAT) AS TONCUOI,A.SLYEUCAU , (A.TONDAU + A.SLNHAP - A.SLXUAT - A.SLYEUCAU) AS TONKD, D.DALIEU, C.NHOMBO, C.MAATC
        FROM {schema_now()}.D_TUTRUCTH A 
        INNER JOIN D_DMBD C ON A.MABD = C.ID
        INNER JOIN D_DMBD_ATC D ON C.ID = D.ID
        WHERE A.MAKP = {idtutruc}
    
    '''
    datas = cursor.execute(stm).fetchall()
    for data in datas:
        obj = {}
        for idx, col in  enumerate(medicine_cols):
            obj[col] = data[idx]
        result.append(obj)
    return jsonify(result), 200

# ############################################################
# VIỆN PHÍ ###################################################
# ############################################################


@app.route('/vienphi/nhomnbhyt/<site>/', methods=['GET'])
def vienphi_nhomnbhyt(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = f'SELECT ID, TEN FROM V_NHOMBHYT ORDER BY ID ASC'
    
    nhombhyts = cursor.execute(stm).fetchall()
    for nhombhyt in nhombhyts:
        result.append({
            'id': nhombhyt[0],
            'name': nhombhyt[1]
        })  
    return jsonify(result)

@app.route('/vienphi/loaivp/<site>/<idnhom>', methods=['GET'])
def vienphi_dmloaivp(site, idnhom):
    cn = conn_info(site)    
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = f'SELECT ID, TEN FROM V_LOAIVP WHERE ID_NHOM = {idnhom} ORDER BY ID ASC'
    loaivps = cursor.execute(stm).fetchall()
    for loaivp in loaivps:
        result.append({
            'id': loaivp[0],
            'name': loaivp[1]
        })  
    return jsonify(result), 200

@app.route('/vien-phi/tree-loaivp/<site>', methods=['GET'])
def vienphi_treeloaivp(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm1 = f'SELECT ID, TEN FROM V_NHOMBHYT ORDER BY ID ASC'
    nhoms = cursor.execute(stm1).fetchall()

    for nhom in nhoms:
        stm2 = f'''
            WITH TMP AS(
                SELECT ID_LOAI, COUNT(*) AS COUNT  FROM V_GIAVP
                GROUP BY ID_LOAI 
            ) 
            SELECT A.ID, A.TEN, TMP.COUNT
            FROM V_LOAIVP A
            INNER JOIN V_NHOMVP B ON A.ID_NHOM = B.MA
            INNER JOIN TMP ON A.ID = TMP.ID_LOAI
            WHERE B.IDNHOMBHYT = {nhom[0]} ORDER BY B.IDNHOMBHYT ASC
        
        '''
        loais = cursor.execute(stm2).fetchall()
        childs = []
        for loai in loais:
            childs.append({
                'id': loai[0],
                'name': loai[1],
                'total': loai[2]
            })
        
        result.append({
            'id': nhom[0],
            'name': nhom[1],
            'child': childs
        })
    
    return jsonify(result), 200     

@app.route('/vien-phi/gia-vp/theo-nhom-bhyt/<site>/<bhytid>', methods=['GET'])
def vienphi_giavp_bhyt(site, bhytid):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
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

@app.route('/vien-phi/gia-vp/theo-loaivp/<site>/<idloai>', methods=['GET'])
def vienphi_giavp_loaivp(site, idloai):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    result = []
    col_name = ['id', 'idloai', 'mavp', 'ten', 'dvt', 'bhyt', 'giath', 'giabh', 'giadv', 'trongoi', 'benhphamrangbuoc']
    stm = f'''
        SELECT A.ID, A.ID_LOAI, A.MA, A.TEN, A.DVT, A.BHYT, A.GIA_TH , A.GIA_BH , A.GIA_DV, A.TRONGOI, A.BENHPHAMRANGBUOC
        FROM V_GIAVP A 
        WHERE A.ID_LOAI = {idloai}
    '''
    giavps = cursor.execute(stm).fetchall()
    for giavp in giavps:
        obj = {}
        for idx, col in  enumerate(col_name):
            obj[col] = giavp[idx]
        result.append(obj)
    return jsonify(result), 200  



# DANH MỤC

# DANH MỤC ICD10
@app.route('/danhmuc/icd10/<site>', methods=['GET'])
def danhmuc_icd10(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = 'SELECT ID_CHAPTER AS ID, CHAPTER AS NAME FROM ICD_CHAPTER ORDER BY ID_CHAPTER ASC'
    chapters = cursor.execute(stm).fetchall()
    
    for chapter in chapters:
        
        icd_ar = []
        
        stm1 = ''
        
        result.append({
            'id': chapter[0],
            'name': chapter[1]
        })
    
    return jsonify(result), 200


@app.route('/danh-muc/coso-kcb-of-tinhthanh/<site>/<matinhthanh>', methods=['GET'])
def danhmuc_coso_kcb_of_tinhthanh(site, matinhthanh):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = f"SELECT MABV, TENBV FROM DMNOICAPBHYT WHERE MATINH = {matinhthanh} ORDER BY MABV ASC"
    cosos = cursor.execute(stm).fetchall()
    for coso in cosos:
        result.append({
            'id': coso[0],
            'name': coso[0] + ' - ' + coso[1]
        })
    
    return jsonify(result), 200
  

# DANH MỤC NHÓM NHÂN VIÊN

# DANH MỤC NHÂN VIÊN
@app.route('/danh-muc/nhom-nhan-vien/<site>', methods=['GET'])
def danhmuc_nhomnhanvien(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = '''
        SELECT ID, TEN
        FROM NHOMNHANVIEN 
        ORDER BY ID ASC
    '''
    
    nhomnvs = cursor.execute(stm).fetchall()
    for nhomnv in nhomnvs:
        result.append({
            'id': nhomnv[0],
            'name': nhomnv[1]
        })
    
    
    return jsonify(result), 200

@app.route('/danhmuc/nhanvien/<site>', methods=['GET'])
def danhmuc_nhanvien(site): 
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = "SELECT A.MA, A.HOTEN, A.NHOM, B.TEN , A.VIETTAT , A.DUYETKHAMBHYT, A.SOCHUNGCHI FROM DMBS A INNER JOIN NHOMNHANVIEN B ON A.NHOM = B.ID"
    
    nhanviens = cursor.execute(stm).fetchall()
    for nhanvien in nhanviens:
        result.append({
            'ma': nhanvien[0],
            'hoten': nhanvien[1],
            'nhom': nhanvien[2],
            'tennhom': nhanvien[3],
            'viettat': nhanvien[4],
            'duyetkhambhyt': nhanvien[5],
            'sochungchi': nhanvien[6]
        })      
    
    return jsonify(result), 200
    
# @app.route('/todieutri/toamau/<site>', methods=['GET'])
# def todieutri_toamau(site):
#     cn = conn_info(site)
#     connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
#     cursor = connection.cursor()
#     result = []
    
#     col_names = ['id', 'ma', 'ten', 'dungchung', 'isactive']
    
#     stm = 'SELECT ID, MA, TEN, DUNGCHUNG, ISACTIVE FROM TA_TOAMAULL ORDER BY ID ASC'
    
#     toamaus = cursor.execute(stm).fetchall()
#     for toamau in toamaus:
#         obj = {}
#         for idx, col in  enumerate(col_names):
#             obj[col] = toamau[idx]
#         result.append(obj)
    
#     return jsonify(result), 200


@app.route('/todieutri/toamau/dsbacsi/<site>', methods=['GET'])
def todieutri_toamau_dsbacsi(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    stm = '''
        SELECT DISTINCT A.MABS, B.HOTEN 
        FROM TA_TOAMAULL A
        INNER JOIN DMBS B ON A.MABS = B.MA
        ORDER BY A.MABS ASC
    '''
    
    dsbs = cursor.execute(stm).fetchall()
    for bs in dsbs:
        result.append(
            {'id': bs[0], 'name': bs[1]}
        )
    
    return jsonify(result), 200


@app.route('/todieutri/toamau/detail/<site>', methods=['GET'])
def toamau(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = '''
        SELECT A.ID, A.MA, A.TEN, A.DUNGCHUNG, A.ISACTIVE, B.HOTEN AS TENBS
        FROM TA_TOAMAULL A
        INNER JOIN DMBS B ON A.MABS = B.MA
        ORDER BY A.ID ASC
    '''
   
    toamaus = cursor.execute(stm).fetchall()
    col_names = ['stt', 'mabd', 'ma', 'ten', 'tenhc', 'ma_mau', 'tenbd_mau', 'tenhc_mau', 'dang', 'donvidung','bhyt', 'solan', 'soluong', 'lan', 'cachnhau', 'cachdung', 'duongdung', 'tocdo', 'lieudung', 'ghichu', 'giobd', 'dalieu', 'nhombo']
    for toamau in toamaus:
        detail_ar = []
        stm2 = f'''
            SELECT A.STT, A.MABD , B.MA, (B.TEN || ' ' || B.HAMLUONG) AS TEN , B.TENHC,  A.MA AS MA_MAU, A.TENBD AS TENBD_MAU , A.TENHC AS TENHC_MAU, A.DANG, B.DONVIDUNG , B.BHYT, A.SOLAN, A.SOLUONG , A.LAN, A.CACHNHAU , A.CACHDUNG , A.DUONGDUNG , A.TOCDO , A.LIEUDUNG , A.GHICHU , A.GIOBD, C.DALIEU, B.NHOMBO 
            FROM TA_TOAMAUCT A
            INNER JOIN D_DMBD B ON A.MABD = B.ID 
            LEFT JOIN D_DMBD_ATC C ON A.MABD = C.ID
            WHERE A.ID = {toamau[0]}
        '''
        details = cursor.execute(stm2).fetchall()
        for detail in details:
            obj = {}
            for idx, col in  enumerate(col_names):
                obj[col] = detail[idx]
            detail_ar.append(obj)
        result.append({
            'id': toamau[0],
            'ma': toamau[1],
            'ten': toamau[2],
            'dungchung': toamau[3],
            'isactive': toamau[4],
            'bs': toamau[5],
            'details': detail_ar
        })
    return jsonify(result), 200

@app.route('/todieutri/toamau/tonkho/<site>/<idkho>', methods=['GET'])
def toamau_tonkho(site, idkho):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = 'SELECT ID, MA, TEN, DUNGCHUNG, ISACTIVE FROM TA_TOAMAULL ORDER BY ID ASC'
    
    toamaus = cursor.execute(stm).fetchall()
    col_names = ['stt', 'mabd', 'ma', 'ten', 'tenhc', 'ma_mau', 'tenbd_mau', 'tenhc_mau', 'dang', 'donvidung','bhyt', 'dalieu', 'nhombo', 'solan', 'soluong', 'lan','tondau','slnhap', 'slxuat', 'slyeucau']
    for toamau in toamaus:
        detail_ar = []
        stm2 = f'''
            WITH tmp AS (
                SELECT MAKHO, MABD, TONDAU, SLNHAP, SLXUAT, SLYEUCAU FROM {schema_now()}.D_TONKHOTH
                WHERE MAKHO = {idkho}
            )
            SELECT A.STT, A.MABD , B.MA, (B.TEN || ' ' || B.HAMLUONG) AS TEN , B.TENHC,  A.MA AS MA_MAU, A.TENBD AS TENBD_MAU , A.TENHC AS TENHC_MAU, A.DANG, B.DONVIDUNG ,B.BHYT, C.DALIEU, B.NHOMBO,A.SOLAN, A.SOLUONG , A.LAN, COALESCE(D.TONDAU, 0) AS TONDAU , COALESCE(D.SLNHAP, 0) AS SLNHAP, COALESCE(D.SLXUAT, 0) AS SLXUAT,  COALESCE(D.SLYEUCAU, 0) AS SLYEUCAU
            FROM TA_TOAMAUCT A
            INNER JOIN D_DMBD B ON A.MABD = B.ID
            INNER JOIN D_DMBD_ATC C ON A.MABD = C.ID
            LEFT JOIN tmp D ON D.MABD = A.MABD 
            WHERE A.ID = {toamau[0]}
            ORDER BY A.STT ASC

        '''
        details = cursor.execute(stm2).fetchall()
        for detail in details:
            obj = {}
            for idx, col in  enumerate(col_names):
                obj[col] = detail[idx]
            detail_ar.append(obj)
        result.append({
            'id': toamau[0],
            'ma': toamau[1],
            'ten': toamau[2],
            'dungchung': toamau[3],
            'isactive': toamau[4],
            'details': detail_ar
        })
    
    return jsonify(result), 200
    
    

    


    
    
if __name__=='__main__':
    app.run(debug=True)
    