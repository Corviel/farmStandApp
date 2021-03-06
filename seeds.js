import { Product } from "./models/product.js";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/farmStand");

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.00,
    category: 'vegetable'
  },
  {
   name: 'Organic Goddess Melon',
   price: 4.99,
   category: 'fruit'
  },
  {
   name: 'Organic Celery',
   price: 1.50,
   category: 'vegetable'
  },
  {
   name: 'Chocolate Whole Milk',
   price: 2.69,
   category: 'dairy'
  }
];
Product.insertMany(seedProducts)
.then(res => {
   console.log(res);
})
.catch(e => {
   console.log(e);
});
