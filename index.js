const express = require('express')
const cors = require('cors')
const passport = require('passport')
const connection = require('./utils/connection')

const authRoutes = require('./routes/auth')
const positionRoutes = require('./routes/position')
const categoryRoutes = require('./routes/category')
const storeRoutes = require('./routes/store')
const professionRoutes = require('./routes/profession')
const ordersRoutes = require('./routes/order')

const store = require('./models/store')
const profession = require('./models/profession')
const order = require('./models/order')
const client = require('./models/client')
const stores_and_positions = require('./models/stores_and_positions')
const orders_and_positions = require('./models/orders_and_positions')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/api/auth', authRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/store', storeRoutes)
app.use('/api/profession', professionRoutes)
app.use('/api/order', ordersRoutes)

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Mus-store API'
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
