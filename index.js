const express = require('express')
const cors = require('cors')
const passport = require('passport')
const connection = require('./utils/connection')
const authRoutes = require('./routes/auth')
const positionRoutes = require('./routes/position')
const categoryRoutes = require('./routes/category')

const app = express()
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/auth', authRoutes)
app.use('/position', positionRoutes)
app.use('/category', categoryRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({
        data: 'tets'
    })
})

async function start() {
    try {
        //await connection.sync({force: true})
        await connection.sync()
        app.listen(PORT)
    } catch {
        console.log('Got error when was trying to connect to database.')
    }
}

const PORT = process.env.PORT || 3000
start()
