import getpass
import oracledb
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from datetime import datetime, timedelta
from .db import get_cursor, schema_now, schema_mutil

tdt = Blueprint('tdt', __name__)

@tdt.route('/tdt/dienbien-benhnhan-by-idkhoa', methods=['GET'])
def get_tdt():
   """
   Diễn biến bệnh
   ---
   tags:
      - Tờ điều trị
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
   
   def get_dienbiencls(schema, idseq):
      query = f'''
            SELECT
               A.IDCHIDINH,
               A.IDSEQ,
               A.TEN,
               B.DOITUONG,
               A.DVT,
               A.SOLUONG,
               A.TENBENHPHAM,
               A.TINHTRANG
            FROM
               {schema}.TA_DIENBIENCLS A
            INNER JOIN DOITUONG B ON
               A.MADOITUONG = B.MADOITUONG
            WHERE
               A.IDSEQ = {idseq}
               AND A.ISACTIVE = 1
            '''
      result = []
      clses = cursor.execute(query).fetchall()
      col_names = ['idchidinh', 'idseq', 'ten', 'doituong', 'dvt', 'soluong', 'tenbenhpham', 'tinhtrang']
      for cls in clses:
         result.append(dict(zip(col_names, cls)))
      return result
   
   def get_hsoftcls(schema, idseq):
      query = f'''
         SELECT A.ID, A.IDCHIDINH, A.MADOITUONG , B.DOITUONG , A.MAVP, C.TEN AS TENVP, A.SOLUONG , A.NGAYUD
         FROM {schema}.V_CHIDINH A
         INNER JOIN DOITUONG B ON A.MADOITUONG = B.MADOITUONG
         INNER JOIN V_GIAVP C ON A.MAVP = C.ID 
         INNER JOIN V_LOAIVP D ON C.ID_LOAI = D.ID 
         WHERE IDDIENBIEN = {idseq} AND D.ID_NHOM <> 7 AND D.ID_NHOM <> 20 
         ORDER BY A.NGAYUD, A.IDCHIDINH, A.MADOITUONG 
      '''
      col_names = ['id', 'idchidinh', 'madoituong', 'doituong', 'mavp', 'tenvp', 'soluong', 'ngayud']
      result = []
      hsoftcls = cursor.execute(query).fetchall()
      for cls in hsoftcls:
         result.append(dict(zip(col_names, cls)))
      return result
   
   def get_dutrumau(schema, idseq):
      query1 = f'''
         SELECT A.ID, SOLANDATRUYEN , TO_CHAR(A.NGAYLINH, 'dd/MM/yyyy') AS NGAYDUKIEN , ABO , RH
         FROM {schema}.TA_DUTRUMAULL A
         WHERE A.IDSEQ = {idseq} AND A.ISACTIVE = 1
      '''
      query2 = f'''
         SELECT B.IDCHIDINH, A.IDSEQ, B.TEN AS TENTUIMAU, B.SLYEUCAU, C.DOITUONG
         FROM {schema}.TA_DUTRUMAULL A 
         INNER JOIN {schema}.TA_DUTRUMAUCT B ON A.ID = B.ID
         INNER JOIN DOITUONG C ON B.MADOITUONG = C.MADOITUONG
         WHERE A.IDSEQ = {idseq} AND A.ISACTIVE = 1
      '''
      result = {}
      maull = cursor.execute(query1).fetchone()
      if maull is  None:
         return None
      result['maull'] = {
         'id': maull[0],
         'solandatruyen': maull[1],
         'ngaydukien': maull[2],
         'abo': maull[3],
         'rh': maull[4]
      }
      mauct = cursor.execute(query2).fetchall()
      col_names = ['idchidinh', 'idseq', 'tentuimau', 'slyeucau', 'doituong']
      mauct_ar = []
      for cls in mauct:
         mauct_ar.append(dict(zip(col_names, cls)))
      result['mauct'] = mauct_ar
      return result
   
   ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]
   schema_ar = list(schema_mutil(ngaynhapkhoa, datetime.now() ))
   col_names = ['idseq', 'ngayylenh', 'cdall', 
                'chieucao', 'cannang', 'bmi', 'mach', 'huyetap', 'nhietdo', 'nhiptho', 'spo2', 'duonghuyet',
                'chamsoc', 'chamsockhac', 'tendinhduong', 'dienbienbenh', 'canhbao', 'ylenhkhac', 'vandechinh', 'xutri',
                'tenbs', 'mabs', 'isactive']
   result= []
   for schema in reversed(schema_ar):
      query = f'''
         SELECT 
            IDSEQ, 
            TO_CHAR(NGAY, 'dd/MM/yyyy HH24:Mi') AS NGAYYLENH,
            CDKHAC AS CDALL,
            CHIEUCAO, CANNANG , BMI , MACH, HUYETAP , NHIETDO , NHIPTHO, SPO2 , DUONGHUYET ,
            TENCHAMSOC, CHAMSOCKHAC, TENDINHDUONG, NOIDUNG AS DIENBIENBENH, GHICHU AS CANHBAO,
            YLENHKHAC, CANHBAO AS VANDECHINH, XUTRI,
            TENBS, MABS,
            ISACTIVE
         FROM {schema}.TA_DIENBIEN td WHERE idkhoa = {idkhoa}
         ORDER BY NGAY DESC
      '''
      dienbiens = cursor.execute(query).fetchall()
      for dienbien in dienbiens:
         obj = dict(zip(col_names, dienbien))
         obj['cls'] = {'tdt': get_dienbiencls(schema, dienbien[0]), 'hsoft': get_hsoftcls(schema, dienbien[0])}
         obj['dutrumau'] = get_dutrumau(schema, dienbien[0])
       
         result.append(obj)
   return jsonify(result), 200