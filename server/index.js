require('dotenv').config({ path: '../.env' })

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const limiter = require('./middleware')
app.use(limiter)


const urlRoutes = require('./routes')


const port = process.env.PORT || 3000

app.use(express.json())
app.use('/', urlRoutes)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})