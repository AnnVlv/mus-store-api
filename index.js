const express = require('express')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.get('/', (req, res, next) => {
    res.status(200).json({
        test: 'OK'
    })
})

app.listen(PORT)