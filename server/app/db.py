from flask import  g
import oracledb
from datetime import datetime, timedelta

CONN_INFO = {
    'HCM_DEV': {
         'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"hsoft-dev.vdc.tahcm.vn/dev3"
    },
    'HN_DEV': {
        'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"192.168.8.5/hndev"
    }
}

def conn_info(env):
    env = env.upper()
    
    return CONN_INFO[env]

def get_db_connection(site):
        if 'db' not in g:
            # Only create a new connection if it doesn't exist in 'g'
            cn = conn_info(site)
            g.db = oracledb.connect(user=cn['user'], password=cn['password'], dsn=cn['dsn'])
        return g.db

def get_cursor(site):
    if 'cursor' not in g:
        connection = get_db_connection(site)
        g.cursor = connection.cursor()
    return g.cursor

def schema_now():
    inow = datetime.now()
    format_string = inow.strftime('%m%y')
    return f'HSOFTTAMANH{format_string}'

def schema_mutil(fromDate, toDate):
    def format_date(date):
        formatted_date = date.strftime("%Y%m%d")
        return formatted_date
    
    date_strings = set()
    current_date = fromDate
    while format_date(current_date)  <= format_date(toDate):
        print("current_date", current_date, toDate)
        date_strings.add('HSOFTTAMANH' + current_date.strftime('%m%y'))
        current_date += timedelta(days=1)
        print("current_date", current_date, toDate)
    return date_strings