'''
Python script for adding multiple users using file i/o
'''
import sqlite3

# establishing conenction to Database
def start_connection(db_name):

    # exception handling
    try:
        con = sqlite3.connect(db_name)
        print('Connection Established')
        return con
    except sqlite3.Error:
        print(sqlite3.Error)
        exit(0)


# method to add user using given details
def addUser(cursorObj, name, phone, address):

    # getting the last users ID, and settinf next one's ID
    cursorObj.execute("SELECT MAX(user_id) FROM user")
    row = cursorObj.fetchall()
    new_id = 1001
    if len(row) != 0:
        prev_id = int(row[0][0])
        new_id = prev_id + 1

    # Inserting row in user table
    sql = f"INSERT INTO user VALUES ({new_id},'{name}','{phone}','{address}')"
    cursorObj.execute(sql)

    # Inserting row in monthly_usage table
    sql = f"INSERT INTO monthly_usage VALUES ({new_id}, 0, 0)"
    cursorObj.execute(sql)

    # Inserting row in monthly_bill table
    sql = f"INSERT INTO monthly_bill VALUES ({new_id}, 0)"
    cursorObj.execute(sql)
    cursorObj

    print("new user added:", new_id, name, phone, address)


#main method
def main():
    con = start_connection('records.db')
    cursorObj = con.cursor()
    new_users = open('new-users.txt', 'r')

    count = 0

    for new_user in new_users:
        name1, name2, phone, address = new_user.split(' ')
        name = name1 + ' ' + name2
        address = address[:-1]
        addUser(cursorObj, name, phone, address)  
        count += 1      

    con.commit()
    con.close()
    new_users.close()

    print('Task completed successfuly!')
    print('Total',count,'user(s) added')


if __name__ == '__main__':
    main()