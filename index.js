const connection = require('./utils/connection')
const app = require('./app')

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
