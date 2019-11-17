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