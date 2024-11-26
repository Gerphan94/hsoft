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
   ngaynhapkhoa = cursor.execute(f'SELECT NGAY FROM NHAPKHOA WHERE ID = {idkhoa}').fetchone()[0]

   schema_ar = list(schema_mutil(ngaynhapkhoa, datetime.now() ))
   col_names = ['idseq', 'ngayylenh', 'cdall', 
                'chieucao', 'cannang', 'bmi', 'mach', 'huyetap', 'nhietdo', 'nhiptho', 'spo2', 'duonghuyet',
                'tenbs', 'mabs', 'isactive']
   result= []
   for schema in reversed(schema_ar):
      query = f'''
         SELECT 
            IDSEQ, 
            TO_CHAR(NGAY, 'dd/MM/yyyy HH24:Mi') AS NGAYYLENH,
            CDKHAC AS CDALL,
            CHIEUCAO, CANNANG , BMI , MACH, HUYETAP , NHIETDO , NHIPTHO, SPO2 , DUONGHUYET ,
            TENBS, MABS,
            ISACTIVE
         FROM {schema}.TA_DIENBIEN td WHERE idkhoa = {idkhoa}
         ORDER BY NGAY DESC
      '''
      dienbiens = cursor.execute(query).fetchall()
      for dienbien in dienbiens:
         result.append(dict(zip(col_names, dienbien)))
   return jsonify(result), 200
      
      

      
   
   
    
   
   return jsonify({"message": "ok"}), 200