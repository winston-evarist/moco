// importing the modules 
const hostname = `127.0.0.1`
const username = `winston-evarist`
const password = `Uncoshon0652164556`
// const uri = `mongodb+srv://${username}:${password}@winston-evarist.t3fkcgr.mongodb.net/?retryWrites=true&w=majority`
const uri = `mongodb://localhost:27017`
const DatabaseName = 'mocos'
const PORT = process.env.PORT || 9000
const app = require(`express`)()
const { createAdmin } = require('./helpers/index')

// allow the cross origin route sharing 
app.use(require('cors')({origin:"*"}))

// allow form data 
app.use(require('express').json())

// environment variables configuration
require('dotenv').config()

// allow the log requests 
app.use(require('morgan')('dev'))

// increase the api security 
app.use(require('helmet')({crossOriginResourcePolicy:false}))

// static files 
// app.use(require('express').static(require('path').join(__dirname, '../public')))
app.use(require('express').static(require('bapig').helpers.staticFilesDirectory))

//Allow express-fileupload
app.use(require('express-fileupload')())

// starting the server an connect to the database 
const server = async function () {
    try {
        const connected = await require('mongoose').connect(`${uri}`)
        if (connected) {
            require('./config/models')
            createAdmin()
            app.listen(PORT, function () {
                console.log(`Server is running on http://${hostname}:${PORT} and Database is connected sucessfully to the ${DatabaseName}`)
            })
            app.get('/test', async function (req, res) {
                res.send(`Server is running on https://${DatabaseName}`)
            })
        }
        else console.log(`Failed to either start the server or to connect to the database`)
    }
    catch (error) {
        if (error) console.log(`${error.message}`)
        else console.log(error)
    }
}
server()

// allow the application programming interface 
app.use('/api', require('bapig').router)