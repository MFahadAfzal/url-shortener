const pgp = require('pg-promise')(/* options */)
const express = require('express')
require('dotenv').config()
const {toBase62} = require('./utils.js')

const db = pgp(process.env.DATABASE_URL)
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.post('/shorten', (req, res) => {
    //
})


//updating shorturl
app.put('/shorten/:id', async(req, res) => {
//UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
    const id = req.params.id
    const exists = await db.oneOrNone('SELECT * FROM urls WHERE id = $1', id)

    if(!exists) return res.status(404).send()

    const copy = await db.oneOrNone('SELECT * FROM urls WHERE shorturl = $1', req.body.shortUrl)
    if(copy) return res.status(400).send()
    
    const updated = await db.oneOrNone('UPDATE urls SET shorturl = $1 WHERE id = $2 RETURNING *', [req.body.shortUrl, id])
    if(updated) return res.status(200).json(updated)
    
    return res.status(400).send() 

})

//deleting shorturl
app.delete('/shorten/:id', async(req, res) => {
    const id = req.params.id
    const deleted = await db.oneOrNone('DELETE FROM urls WHERE id = $1', id)
    deleted ? res.status(204).send() : res.status(404).send()
})


//getting all the statistics for the shorturl
app.get('/shorten/:id/stats', async(req, res) => {
    const id = req.params.id
    const clicksData = await db.many('SELECT * FROM clicks WHERE urlid = $1', id)
    const urlData = await db.one('SELECT * FROM urls WHERE id = $1', id)
    return res.json({clicksData, urlData})
})


//basic function to redirect user to long url
app.get('/:code', async(req, res) => {
    const shortUrl = req.params.code
    const data = await db.oneOrNone('SELECT id, longurl FROM urls WHERE shorturl = $1', shortUrl)
    if (!data) return res.status(404).json({ error: 'Short URL not found' })
    await db.none('INSERT INTO clicks (urlid) VALUES ($1)', data.id )
    res.redirect(data.longurl)
})


//To catch unexpected errors
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Server error' })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})