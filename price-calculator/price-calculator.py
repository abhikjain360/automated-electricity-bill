'''
Python script to 
'''
import sqlite3

# establishing conenction to Database
def start_conneection(db_name):

    # exception handling
    try:
        con = sqlite3.connect(db_name)
        print('Connection Established')
        return con
    except sqlite3.Error:
        print(sqlite3.Error)