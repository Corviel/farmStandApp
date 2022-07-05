import express from 'express'
import path from 'path'
import mongoose from 'mongoose';
import methodOverride from 'method-override'
import { Product } from './models/product.js'

const app = express()
mongoose.connect('mongodb://localhost:27017/farmStand');
app.set('views', path.join(path.resolve(), 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.resolve() + '/public'))


app.get('/', (req, res) => {
   res.render('home')
})

app.get('/products', async (req, res) => { // Main page with all products listed
   const products = await Product.find({})
   res.render('products/index', { products })
})

app.get('/products/new', (req, res) => { // Page for creating a product
   const categories = Product.schema.path('category').enumValues;
   res.render('products/new', { categories })
})

app.post('/products', async (req, res) => { // Get back to main page after creating a product
   const newProduct = new Product(req.body)
   await newProduct.save()
   console.log(newProduct);
   res.redirect(`products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => { // Detail page of a specific product
   const { id } = req.params
   const product = await Product.findById(id)
   res.render('products/details', { product })
})

app.get('/products/:id/edit', async (req, res) => { // Edit page of specific product
   const { id } = req.params
   const categories = Product.schema.path('category').enumValues;
   const product = await Product.findById(id)
   res.render('products/edit', { product, categories})
})

app.put('/products/:id', async (req, res) => { // Get back to product specific page after editing the product
   const { id } = req.params
   const editedProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
   res.redirect(`/products/${editedProduct._id}`)
})

app.delete('/products/:id', async (req, res) => {
   const { id } = req.params
   const deletedProduct = await Product.findByIdAndDelete(id)
   res.redirect('/products')
})

app.listen(3000, () => {
   console.log('Listening...');
})