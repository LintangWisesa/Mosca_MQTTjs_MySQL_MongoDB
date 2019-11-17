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