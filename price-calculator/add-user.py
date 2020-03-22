'''
Python script for adding single user using command line
'''
import sqlite3
import argparse

# establishing conenction to Database
def start_conneection(db_name):

    # exception handling
    try:
        con = sqlite3.connect(db_name)
        print('Connection Established')
        return con
    except sqlite3.Error:
        print(sqlite3.Error)
        

#parsing the arguments passed along with file execution
def parseArguments():
    parser = argparse.ArgumentParser(description='Add a user for billing.')
    parser.add_argument('name', metavar='-n', type=str, help='name of the user')
    parser.add_argument('phone',metavar='-p',type=str,help='phone number of the user')
    parser.add_argument('address',metavar='-a',type=str,help='home address of the user')
    args = parser.parse_args()

    return args.name, args.phone, args.address


# method to add user using given details
def addUser(con, name, phone, address):

    # creating cursor
    cursorObj = con.cursor()

    # getting the last users ID, and settinf next one's ID
    cursorObj.execute("SELECT MAX(user_id) FROM user")
    row = cursorObj.fetchall()
    prev_id = int(row[0][0])
    new_id = prev_id + 1

    # Inserting row and commiting
    sql = f"INSERT INTO user VALUES ({new_id},'{name}','{phone}','{address}')"
    cursorObj.execute(sql)
    con.commit()

    print("new user added:", new_id, name, phone, address)
    print('total 1 new user added')


#main method
def main():

    #starting connection
    con = start_conneection('records.db')

    # getting CLI arguments
    name, phone, address = parseArguments()

    # adding user
    addUser(con, name, phone ,address)

    #closing conection
    con.close()


if __name__ == '__main__':
    main()