const express = require('express')
const passport = require('passport')
const connection = require('./utils/connection')
const authRoutes = require('./routes/auth')

const app = express()
app.use(express.json())
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/auth', authRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({
        data: 'tets'
    })
})

async function start() {
    try {
        // await connection.sync({force: true})
        await connection.sync()
        app.listen(PORT)
    } catch {
        console.log('Got error when was trying to connect to database.')
    }
}

const PORT = process.env.PORT || 3000
start()