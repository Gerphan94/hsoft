from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now, schema_mutil
import pandas as pd
vienphi = Blueprint('vienphi', __name__)

@vienphi.route('/vienphi/get-v_chidinh-by-idkhoa', methods=['GET'])
def get_v_chidinh_by_idkhoa():
   """
   get Cận Lâm sàng by IDSEQ
   ---
   tags:
      - Viện phí
   parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: idkhoa
        in: query
        type: string
        required: true
        description: id nhập khoa
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
   idkhoa = request.args.get('idkhoa')
   cursor = get_cursor(site)
   result = []
    
   ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]
   iNow = datetime.now()  
   schema_ar = list(schema_mutil(ngaynhapkhoa, iNow))
    
   col_names = ['id','ngay', 'madoituong', 'doituong', 'tendichvu', 'soluong', 'dongia', 'idchidinh', 'ghichu', 'thuchien', 'done',
                'ngayylenh', 'ngaythuchien', 'maphieu', 'benhpham', 'idloai', 'idnhom', 'loaiba', 'iddienbien']
   for schema in reversed(schema_ar):
      stm = f'''
         SELECT
               A.ID,
               TO_CHAR(A.NGAY, 'dd/MM/yyyy') AS NGAY,
               A.MADOITUONG,
               C.DOITUONG,
               B.TEN,
               A.SOLUONG,
               A.DONGIA,
               TO_CHAR(A.IDCHIDINH) AS IDCHIDINH,
               A.GHICHU,
               A.THUCHIEN,
               A.DONE,
               TO_CHAR(A.NGAY, 'dd/MM/yyyy HH24:MI') AS NGAYYLENH,
               TO_CHAR(A.NGAYTHUCHIEN, 'dd/MM/yyyy HH24:MI') AS NGAYTHUCHIEN,
               A.MAPHIEU,
               D.TEN AS BENHPHAM,
               E.ID AS IDLOAI,
               E.ID_NHOM AS IDNHOM,
               A.LOAIBA,
               A.IDDIENBIEN
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
         WHERE A.IDKHOA = {idkhoa}
         ORDER BY
               A.NGAY ,
               A.NGAYUD , A.IDCHIDINH, A.MADOITUONG
      '''
      chidinh = cursor.execute(stm).fetchall()
      for chidinh in chidinh:
         result.append(dict(zip(col_names, chidinh)))
   return jsonify(result), 200
   
@vienphi.route('/vienphi/get-chiphi-dichvu', methods=['GET'])
def get_chiphi_dichvu():
   """
   Chí phí dịch vụ
   ---
   tags:
      - Viện phí
   parameters:
      - name: site
        in: query
        type: string
        required: true
        description: The site identifier
        default: HCM_DEV
      - name: idkhoa
        in: query
        type: string
        required: true
        description: id nhập khoa
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
   idkhoa = request.args.get('idkhoa')
   cursor = get_cursor(site)
   result = []
   
   stm = f'''
      SELECT 
	VCD.ID, VCD.IDCHIDINH, VP.TEN AS TENGIAVP, VP.DVT, VCD.DONGIA, VCD.SOLUONG, VCD.MADOITUONG, VP.BHYT, VCD.TLCHITRA ,
	LVP.TEN AS TENLOAI, NVP.TEN AS TENNHOM, NVP.IDNHOMBHYT AS IDNHOMBH, NBH.TEN AS TENNHOMBH
	FROM HSOFTTAMANH1124.V_CHIDINH VCD
	INNER JOIN V_GIAVP VP ON VCD.MAVP = VP.ID 
	INNER JOIN V_LOAIVP LVP ON VP.ID_LOAI = LVP.ID
	INNER JOIN V_NHOMVP NVP ON LVP.ID_NHOM = NVP.MA
	INNER JOIN V_NHOMBHYT NBH ON NVP.IDNHOMBHYT = NBH.ID 
	WHERE VCD.IDKHOA = 241125091539788092
   '''
   result = []
   dichvus = cursor.execute(stm).fetchall()
   df = pd.DataFrame(dichvus, columns=['id', 'idchidinh', 'tengiavp', 'dvt', 'dongia', 'soluong', 'madoituong', 'bhyt', 'tlchitra', 'tenloai', 'tennhom', 'idnhombh', 'tennhombh'])
   for index, row in df.iterrows():
      if (row['madoituong'] == 3):
            continue
      result.append(dict(zip(['id', 'idchidinh', 'tengiavp', 'dvt', 'dongia', 'soluong', 'madoituong', 'bhyt', 'tlchitra', 'tenloai', 'tennhom', 'idnhombh', 'tennhombh'], row)))

   return jsonify(result), 200
   
      
   