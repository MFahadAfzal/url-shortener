const pgp = require('pg-promise')(/* options */)
const express = require('express')
require('dotenv').config()
const db = pgp(process.env.DATABASE_URL)
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.post('/shorten', (req, res) => {
    //
})

app.put('/shorten/:id', (req, res) => {

})

app.delete('/shorten/:id', (req, res) => {

})

app.get('/shorten/:id/stats', async(req, res) => {
    const id = req.params.id
    const clicksData = await db.many('SELECT * FROM clicks WHERE urlid = $1', id)
    const urlData = await db.one('SELECT * FROM urls WHERE id = $1', id)
    return res.json({clicksData, urlData})
})

app.get('/:code', async(req, res) => {
    const shortUrl = req.params.code
    const data = await db.one('SELECT longurl FROM urls WHERE shorturl = $1', shortUrl)
    await db.none('INSERT INTO clicks (urlid) VALUES ($1)', data.id )
    res.redirect(data.longurl)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})