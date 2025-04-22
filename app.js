// app.js
const express = require('express')
const cors = require('cors')
const api = require('./api')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Products routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Orders routes
app.get('/orders', api.listOrders)
app.get('/orders/:id', api.getOrder)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

app.listen(port, () => {
  console.log('Server listening at http://localhost:${port}')
})