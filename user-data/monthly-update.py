'''
Python script to add electricity usage in database
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


# method for updating previous readings
def updatePrev(con):

    # creatig cursor
    cursorObj = con.cursor()

    # setting previous month's reading in prev col
    sql = f'UPDATE monthly_usage SET prev = cur'
    cursorObj.execute(sql)
    cursorObj.close()


# method to add usage to database
def addUsage(cursorObj, user_id, usage):

    # setting previous month's reading in prev col
    sql = f'UPDATE monthly_usage SET cur = {usage} WHERE user_id = {user_id}'
    cursorObj.execute(sql)
    cursorObj.close()


# method to calculate bill accorinding to slab rates
# as per https://cspdcl.co.in/cseb/(S(5nxew3vfma2prb13acqf2xg0))/Files/Tariff_Order_FY_2019_20_09052019.pdf , pg 236
def calculateBill(power_used):

    bill = 0
    if power_used <= 40:
        return power_used * 3.7
    else:
        power_used -= 40
        bill += 40 * 3.7
    if power_used <= 160:
        return bill + power_used * 3.8
    else:
        power_used -= 160
        bill += 160 * 3.8
    if power_used <= 400:
        return bill + power_used * 5.8
    else:
        return bill + 400 * 5.3 + (power_used - 400) * 7.35
    

# method to update monthly_bill table as per monthly_usage
def updateBills(con):

    # ccursor to execute queries
    cursorObj = con.cursorObj()

    # getting the usage readings from the database
    sql = 'SELECT prev,cur FROM monthly_usage'
    cursorObj.execute(sql)
    usage = cursorObj.fetchall()

    # updating the monthly_usage
    for row in usage:
        bill = calculateBill(float(row[2] - row[1]))
        sql = f'UPDATE monthly_bill SET bill = {bill} WHERE user_id = {row[0]}'
        cursorObj.execute(sql)

    cursorObj.close()


# main method
def main():

    con = start_connection('records.db')
    cursorObj = con.cursor()
    readings = open('readings.txt','r')
    updatePrev(con)

    for row in readings:
        user_id = int(row[0][0])
        usage = float(row[0][1])
        addUsage(cursorObj, user_id, usage)

    updateBills()

    cursorObj.close()
    con.commit()
    con.close()
    readings.close()

    