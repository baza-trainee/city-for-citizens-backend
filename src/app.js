const express = require('express')


const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.listen(3000, () => console.log('Hello world'))