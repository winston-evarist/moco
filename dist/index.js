const hostname = '127.0.0.1'
const uri = `mongodb://${hostname}/27017`
const dataBase = 'moco'
const PORT = process.env.PORT || 4500
const App = require('express')()
const router = require('bapig')
const { createAdmin } = require('./helpers')

App.use(require('express').json())
App.use(require('cors')())
App.use(require('morgan')('dev'))
App.use(require('helmet')())

const server = async function () {
    try {
        const connected = await require('mongoose').connect(`${uri}`)
        if (connected) {
            require('./config/models')
            createAdmin()
            App.listen(PORT, function () {
                console.log(`Database is connected to the ${dataBase} and server is running at http://${hostname}:${PORT}`)
            })
            App.get('', async function (req, res) {
                res.send(`Server is running at http://${hostname}:${PORT}`)
            })
        }
        else console.log(`Failed to either connect to the ${dataBase} and or to start the server `)
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
        else console.log(error)
    }
}
server()

App.use('', require('bapig').router)