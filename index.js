const express = require('express')
const dbConnection = require('./config/config')
const app = express()
const PORT = 3000
const routes = require('./routes/tasks');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes);

dbConnection()

app,listen(PORT, () => {
    console.log(`Express está escuchando en el puerto http://localhost:${PORT}`)
})