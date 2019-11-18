![simplinnovation](https://4.bp.blogspot.com/-f7YxPyqHAzY/WJ6VnkvE0SI/AAAAAAAADTQ/0tDQPTrVrtMAFT-q-1-3ktUQT5Il9FGdQCLcB/s350/simpLINnovation1a.png)

# __Mosca 💛 MQTTjs 💚 MySQL + MongoDB__

## __1. Mosca & MQTT.js__

- Click & watch video tutorial below! 👇

    [![Mosca MQTT.js](https://img.youtube.com/vi/HRrqF8ISQJs/0.jpg)](https://www.youtube.com/watch?v=HRrqF8ISQJs)

- Initiate a Node.js project then install Mosca & MQTT.js:
    
    ```bash
    $ npm init
    $ npm i mosca mqtt
    ```

- Create an __*MQTT broker*__ (_broker.js_):

    ```javascript
    // Mosca MQTT broker
    var mosca = require('mosca')
    var settings = {port: 1234}
    var broker = new mosca.Server(settings)

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })

    broker.on('published', (packet)=>{
        message = packet.payload.toString()
        console.log(message)
    })
    ```

- Create an __*MQTT subscriber*__ (_sub.js_):

    ```javascript
    // MQTT subscriber
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://localhost:1234')
    var topic = 'LINTANGtest123'

    client.on('message', (topic, message)=>{
        message = message.toString()
        console.log(message)
    })

    client.on('connect', ()=>{
        client.subscribe(topic)
    })
    ```

- Create an __*MQTT publisher*__ (_pub.js_):

    ```javascript
    // MQTT publisher
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://localhost:1234')
    var topic = 'LINTANGtest123'
    var message = 'Hello World!'

    client.on('connect', ()=>{
        setInterval(()=>{
            client.publish(topic, message)
            console.log('Message sent!', message)
        }, 5000)
    })
    ```
#

## __2. Mosca, MQTT.js & MySQL__

- Click & watch video tutorial below! 👇

    [![Video](https://img.youtube.com/vi/XhWNMZ7C1ZI/0.jpg)](https://www.youtube.com/watch?v=XhWNMZ7C1ZI)

- Create a database & table on MySQL:
    
    ```bash
    $ create database mqttJS;
    $ use mqttJS
    $ create table(
        id int not null auto_increment,
        message varchar(255),
        time timestamp default current_timestamp,
        primary key (id)
    );
    $ describe mqttJS
    ```

- Install _MySQL.js_:

    ```bash
    $ npm i mysql
    ```

- Create an __*MQTT broker*__ (_brokerMySQL.js_):

    ```javascript
    // MQTT broker
    var mosca = require('mosca')
    var settings = {port: 1234}
    var broker = new mosca.Server(settings)

    // MySQL 
    var mysql = require('mysql')
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'lintang',
        password: '12345',
        database: 'mqttJS'
    })
    db.connect(()=>{
        console.log('Database connected!')
    })

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })

    broker.on('published', (packet)=>{
        message = packet.payload.toString()
        console.log(message)
        if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
            var dbStat = 'insert into mqttJS set ?'
            var data = {
                message: message
            }
            db.query(dbStat, data, (error, output)=>{
                if(error){
                    console.log(error)
                } else {
                    console.log('Data saved to database!')
                }
            })
        }
    })
    ```

#

## __3. Mosca, MQTT.js & MongoDB__

- Click & watch video tutorial below! 👇

    [![Video](https://img.youtube.com/vi/-8NgIdT_OBc/0.jpg)](https://www.youtube.com/watch?v=-8NgIdT_OBc)

- Create a database & collection on MongoDB:
    
    ```bash
    $ use mqttJS
    $ db.createUser({
        'user': 'lintang',
        'pwd': '12345',
        'roles': ['readWrite', 'dbAdmin']
    })
    $ db.createCollection('mqttJS')
    ```

- Install _MongoDB.js_:

    ```bash
    $ npm i mongodb
    ```

- Create an __*MQTT broker*__ (_brokerMongoDB.js_):

    ```javascript
    // MQTT broker
    var mosca = require('mosca')
    var settings = {port: 1234}
    var broker = new mosca.Server(settings)

    // MongoDB
    var mongo = require('mongodb')
    var mongc = mongo.MongoClient
    var url = 'mongodb://lintang:12345@localhost:27017/mqttJS'

    broker.on('ready', ()=>{
        console.log('Broker is ready!')
    })

    broker.on('published', (packet)=>{
        message = packet.payload.toString()
        console.log(message)
        if(message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
            mongc.connect(url, (error, client)=>{
                var myCol = client.db('mqttJS').collection('mqttJS')
                myCol.insertOne({
                    message: message
                }, ()=>{
                    console.log('Data is saved to MongoDB')
                    client.close()
                })
            })
        }
    })
    ```

#

#### Lintang Wisesa :love_letter: _lintangwisesa@ymail.com_

[Facebook](https://www.facebook.com/lintangbagus) | 
[Twitter](https://twitter.com/Lintang_Wisesa) |
[LinkedIn](https://www.linkedin.com/in/lintangwisesa/) |
[Youtube](https://www.youtube.com/user/lintangbagus) | 
:octocat: [GitHub](https://github.com/LintangWisesa) |
[Hackster](https://www.hackster.io/lintangwisesa)