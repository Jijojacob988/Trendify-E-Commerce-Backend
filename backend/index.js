const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { type } = require("os");
const { error } = require("console");
require('dotenv').config();  // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Schema and Model Definition
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const Product = mongoose.model("Product", productSchema);

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the "upload/images" directory
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Creating Upload Endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    console.log('Image uploaded:', req.file);
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Creating Add Product Endpoint
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    try {
        const product = new Product({
            id:id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            // Date and available fields will be automatically set
        });

        // Log product details before saving
        console.log('Product details to be saved:', {
            id: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            new_price: product.new_price,
            old_price: product.old_price,
            date: product.date, // This will log the default date (current date and time)
            available: product.available // This will log the default value (true)
        });

        const savedProduct = await product.save();

        // Log success message and saved product details
        console.log('Product saved successfully with details:', {
            id: savedProduct.id,
            name: savedProduct.name,
            image: savedProduct.image,
            category: savedProduct.category,
            new_price: savedProduct.new_price,
            old_price: savedProduct.old_price,
            date: savedProduct.date, // This will log the actual date after saving
            available: savedProduct.available, // This will log the actual value of available
            _id: savedProduct._id // MongoDB generated ObjectId
        });

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving product'
        });
    }
});

// Creating API For deleting products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })

})

// Creating API For getting all products

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema Creating For User model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating Endpoint for registering the user

app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
        
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
        
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// creating endpoint for user login

app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
            
        }
        else {
            res.json({success:false,errors:"Wrong Password"});
        }
        
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }

})

// creating endpoint for newcollection data

app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New collection fetched");
    res.send(newcollection);

})

//creating end point for popular in women

app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})

// creating middleware to fetch user

const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({errors:"Please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token,'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({errors:"please authenticate using a valid token"});
    }
}

// creating end point for adding products in cart data

app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    
    
    res.send("Added")
});

// creating endpoint to remove product from cartdata

app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);

    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    
    
    res.send("Removed")


})

app.listen(port, () => {
    console.log("Server Running on Port " + port);
});
