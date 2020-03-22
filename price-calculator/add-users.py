'''
Python script for adding multiple users using file i/o
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

    print("new user added:", new_id, name, phone, address)


#main method
def main():

    #starting connection
    con = start_conneection('records.db')

    # opening the file to take inputs
    new_users = open('new-users.txt', 'r')

    count = 0

    # adding user
    for new_user in new_users:
        name1, name2, phone, address = new_user.split(' ')
        name = name1 + ' ' + name2
        address = address[:-1]
        addUser(con, name, phone, address)  
        count += 1      

    # commiting changes
    con.commit()

    #closing conection and file
    con.close()
    new_users.close()

    print('Task completed successfuly!')
    print('Total',count,'user(s) added')


if __name__ == '__main__':
    main()