import sqlite3, os.path, sys, base64
from flask import Flask, jsonify, request, Blueprint

sql = Blueprint('sql', __name__)


#Tạo đường dẫn file
if getattr(sys, 'frozen', False):
    working_dir = os.path.dirname(os.path.abspath(sys.executable))
else:
    working_dir = os.path.dirname(os.path.abspath(__file__))


class dataConn(object):
    def __init__(self):
        print(working_dir + '\hsoftsql.db')
        self.con = sqlite3.connect(working_dir + '\hsoftsql.db')
        self.cur = self.con.cursor()
    
    def get_section(self):
        return [{'id':row[0], 'name':row[1]} for row in self.cur.execute("SELECT id, name FROM section").fetchall()]
    
    def get_query(self, section_id):
        return [
            {
                'id': row[0],
                'name': row[1],
                'des': row[2],
                'query': row[3],
                'section_id': row[4],
                'stt': row[5]
                } for row in self.cur.execute(f"SELECT id, name, des, query, section_id, stt FROM storesql ").fetchall()]       
        

@sql.route('/sql/section', methods=['GET'])
def get_section():
    return jsonify(dataConn().get_section())

@sql.route('/sql/query/<section_id>', methods=['GET'])
def get_queries(section_id):
    return jsonify(dataConn().get_query(section_id))