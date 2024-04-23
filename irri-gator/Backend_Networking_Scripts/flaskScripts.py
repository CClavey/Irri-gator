import json
from flask import Flask, request, redirect
from flask_mysqldb import MySQL
from datetime import time
from flask import jsonify
import time

application = Flask(__name__)

application.config['MYSQL_HOST'] = 'localhost'
application.config['MYSQL_USER'] = 'root'
application.config['MYSQL_PASSWORD'] = '7abXYhrj$g'
application.config['MYSQL_DB'] = 'gator_db'

mysql = MySQL(application)



@application.route("/")
def index():
    return "main page"

@application.route('/users')
def get_user():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM user_tab')
    users = cursor.fetchall()
    rtnstate = 'Users are:\n'
    for i in range(len(users)):
        rtnstate += str(users[i][1]) + '\n'
    cursor.close()
    return str(rtnstate)

@application.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM user_tab WHERE email = %s AND password = %s', (email, password))
        user = cursor.fetchone()
        cursor.close()
        if user:
            return jsonify({'success': True, 'user': user}), 200
        else:
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

  @application.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO user_tab VALUES (NULL, %s, %s, %s)', (username, email, password))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({'success': False, 'error': str(e)})

  @application.route('/hubData', methods=['POST'])
def get_hubs():
    try:
        data = request.json
        email = data.get('email')
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM hub_tab WHERE email = %s', (email,))
        hubs = cursor.fetchall()
        cursor.close()
        return str(hubs)
    except Exception as e:
        return str(e), 500 

@application.route('/plantData', methods=['POST'])
def get_plants():
    try:
        data = request.json
        hubID = data.get('hubID')
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM plant_tab WHERE hubID = %s', (hubID,))
        plants = cursor.fetchall()
        cursor.close()
        return str(plants)
    except Exception as e:
        return str(e), 500 

@application.route('/addHubs', methods=['POST'])
def add_Hubs():
    try:
        data = request.json
        hubID = data.get('hubID')
        hubName = data.get('hubName')
        email = data.get('email')
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO hub_tab (hubID, hubName, email) VALUES (%s, %s, %s)', (hubID, hubName, email))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error during hub  addition: {e}")
        return jsonify({'success': False, 'error': str(e)})

@application.route('/addPlants', methods=['POST'])
def add_Plants():
    try:
        data = request.json
        plantSpecies = data.get('plantSpecies')
        plantDesc = data.get('plantDesc')
        daySchedule = data.get('daySchedule')
        dayTime = data.get('dayTime')
        hubID = data.get('hubID')
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO plant_tab (plantSpecies, plantDesc, daySchedule, dayTime, hubID) VALUES (%s, %s, %s, %s, %s)', (plantSpecies, plantD$
        mysql.connection.commit()
        cursor.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error during plant addition: {e}")
        return jsonify({'success': False, 'error': str(e)})

@application.route('/updatePlants', methods=['POST'])
def update_Plants():
    try:
        data = request.json
        plantSpecies = data.get('plantSpecies')
        plantDesc = data.get('plantDesc')
        daySchedule = data.get('daySchedule')
        dayTime = data.get('dayTime')
        hubID = data.get('hubID')
        plantID = data.get('plantID')
        cursor = mysql.connection.cursor()
        cursor.execute('UPDATE plant_tab SET plantSpecies=%s, plantDesc=%s, daySchedule=%s, dayTime=%s WHERE hubID=%s AND plantID=%s', (plantSpecies, pl$
        mysql.connection.commit()
        cursor.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error during plant update: {e}")
        return jsonify({'success': False, 'error': str(e)})

@application.route('/deletePlant', methods=['POST'])
def delete_plant():
    try:
        data = request.json
        plant_id = data.get('plantID')
        hub_id = data.get('hubID')
        cursor = mysql.connection.cursor()
        cursor.execute('DELETE FROM plant_tab WHERE hubID=%s AND plantID=%s', (hub_id, plant_id))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error during plant deletion: {e}")
        return jsonify({'success': False, 'error': str(e)})

@application.route('/deleteHub', methods=['POST'])
def delete_hub():
    try:
        data = request.json
        hubID = data.get('hubID')
        cursor = mysql.connection.cursor()
        cursor.execute('DELETE FROM hub_tab WHERE hubID=%s', (hubID,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error during hub deletion: {e}")
        return jsonify({'success': False, 'error': str(e)})

@application.route('/update_sched/<hub_id>/<pot_id>', methods=['POST'])
def update_sched(hub_id, pot_id):
    schedules_f = open('schedules.txt', 'r')
    schedules = json.loads(schedules_f.read())
    day_interval = int(request.json.get('day_interval'))
    watering_time = request.json.get('watering_time')
    watering_time = (watering_time[1:-1]).split(':')
    new_water_time = (int(watering_time[0]), int(watering_time[1]), int(watering_time[2]))
    schedules[hub_id] = [day_interval, new_water_time, pot_id]
    schedules_f = open('schedules.txt', 'w')
    schedules_f.write(json.dumps(schedules))
    schedules_f.close()
    return "success"

@application.route('/hub_poll/<hub_id>', methods=['GET', 'POST'])
def hub_sched(hub_id):
    data_req_f = open('data_req.txt', 'r')
    data_req = json.loads(data_req_f.read())
    schedules_f = open('schedules.txt', 'r')
    schedules = json.loads(schedules_f.read())
    pot_data_f = open('pot_data.txt', 'r')
    pot_data = json.loads(pot_data_f.read())
    water_f = open('water.txt', 'r')
    hub_on_f = open('hub_on.txt', 'r')
    if request.method == 'GET':
        if hub_id in data_req:
            data_req_f.close()
            schedules_f.close()
            pot_data_f.close()
            return data_req[hub_id]
        elif hub_id in schedules:
            result = schedules[hub_id]
            del schedules[hub_id]
            schedules_f.close()
      schedules_f = open('schedules.txt', 'w')
            schedules_f.write(json.dumps(schedules))
            data_req_f.close()
            schedules_f.close()
            pot_data_f.close()
            return json.dumps(result)
        elif water_f.read() == 'yes':
            water_f.close()
            water_f = open('water.txt', 'w')
            water_f.write('no')
            water_f.close()
            data_req_f.close()
            schedules_f.close()
            pot_data_f.close()
      return 'water'
        elif hub_on_f.read() == 'is hub on':
            data_req_f.close()
            schedules_f.close()
            pot_data_f.close()
            return 'is hub on'
        else:
            data_req_f.close()
            schedules_f.close()
            pot_data_f.close()
            return 'no updates'
    else:
        response_json = request.json
        pot_data[str(hub_id) + str(response_json.get('pot_id'))] =  {'pot_data': response_json.get('pot_data')}
        pot_data_f.close()
        pot_data_f = open('pot_data.txt', 'w')
        pot_data_f.write(json.dumps(pot_data))
        del data_req[hub_id]
        data_req_f.close()
        data_req_f = open('data_req.txt', 'w')
        data_req_f.write(json.dumps(data_req))
        data_req_f.close()
        schedules_f.close()
        pot_data_f.close()
        return 'no updates'

@application.route('/get_pot_data/<hub_id>/<pot_id>')
def pot_data(hub_id, pot_id):
    data_req_f = open('data_req.txt', 'r')
    data_req = json.loads(data_req_f.read())
    pot_data_f = open('pot_data.txt', 'r')
    pot_data = json.loads(pot_data_f.read())
    if (str(hub_id) + str(pot_id)) in pot_data:
        result = pot_data[str(hub_id) + str(pot_id)]
        del pot_data[str(hub_id) + str(pot_id)]
        pot_data_f.close()
        pot_data_f = open('pot_data.txt', 'w')
        pot_data_f.write(json.dumps(pot_data))
        data_req_f.close()
        pot_data_f.close()
        return json.dumps(result)
    else:
        data_req[hub_id] = pot_id
        data_req_f.close()
        data_req_f = open('data_req.txt', 'w')
        data_req_f.write(json.dumps(data_req))
        data_req_f.close()
        return redirect('/wait_for_hub/' + str(hub_id) + '/' + str(pot_id) + '?wait_num=0', code=302)

@application.route('/wait_for_hub/<hub_id>/<pot_id>')
def wait_for_hub(hub_id, pot_id):
    pot_data_f = open('pot_data.txt', 'r')
    pot_data = json.loads(pot_data_f.read())
    pot_data_f.close()
    wait_num = int(request.args.get('wait_num')) + 1
    if wait_num > 12:
        data_req_f = open('data_req.txt', 'r')
        data_req = json.loads(data_req_f.read())
        del data_req[hub_id]
        data_req_f.close()
        data_req_f = open('data_req.txt', 'w')
        data_req_f.write(json.dumps(data_req))
        data_req_f.close()
        return 'Invalid hub ID or pot ID'
    elif (str(hub_id) + str(pot_id)) in pot_data:
        return redirect('/get_pot_data/' + str(hub_id) + '/' + str(pot_id), code=302)
    else:
        time.sleep(1)
        return redirect('/wait_for_hub/' + str(hub_id) + '/' + str(pot_id) + '?wait_num=' + str(wait_num), code=302)

@application.route('/is_hub_on/<hub_id>', methods=['GET', 'POST'])
def is_hub_on(hub_id):
    if request.method == 'POST':
        hub_on_f = open('hub_on.txt', 'w')
        hub_on_f.write('on')
        hub_on_f.close()
        return 'hub is now on'
    hub_on_f = open('hub_on.txt', 'r')
    if hub_on_f.read() == 'on':
        hub_on_f.close()
        hub_on_f = open('hub_on.txt', 'w')
        hub_on_f.write('off')
        hub_on_f.close()
        return 'hub is now on'
    hub_on_f.close()
    hub_on_f = open('hub_on.txt', 'w')
    hub_on_f.write('is hub on')
    hub_on_f.close()
    return 'hub is off'

@application.route('/test_water', methods=['GET', 'POST'])
def test_water():
    if request.method == 'POST':
        water_f = open('water.txt', 'w')
        water_f.write('yes')
        water_f.close()
        return redirect('/test_water')
    return jsonify({'success': True})

@application.errorhandler(Exception)
def exception_handler(error):
    return repr(error)

if __name__ == "__main__":
    application.run(host='0.0.0.0', port='8080')
