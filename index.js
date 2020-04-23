const express = require('express')
const connection = require('./utils/connection')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.get('/', (req, res, next) => {
    res.status(200).json({
        test: 'OK'
    })
})

async function start() {
    try {
        await connection.sync()
        app.listen(PORT)
    } catch {
        console.log("Got error when was trying to connect to database.")
    }
}
start()