// declaring the varibales 
const App = require('express')()
const Port = process.env.Port || 4500 
const dB = 'mocoservices'
const hostname = '127.0.0.1'
const uri = `mongodb://${hostname}/27017`

// allow the form data 
App.use(require('express')())

// allow the cross routing sharing 
App.use(require('cors')())

// allow the logs requests 
App.use(require('morgan')('dev'))

// application sec
App.use(require('helmet')())

// starting the development server and connecting to the database 
const server = async function () {
    try {
        const connected = await require('mongoose').connect(`${uri}`)
        if (connected) {
            App.listen(Port, function () {
                console.log(`Server is running at http://${hostname}:${Port} and database is connected to the ${dB}`)
            })
            App.get('/', async function (req, res) {
                res.send(`Server is running at http://${hostname}:${Port}`)
            })
        }
        else console.log(`Failed to connect to the ${dB}`)
    }
    catch (error) { console.log(error.message) }
}
server()

// allowing the application programming interface
// App.use('', require('./routes/index'))