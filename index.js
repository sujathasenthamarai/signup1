
const express = require('express')
const bodyParser = require('body-parser')
const { validationResult } = require('express-validator')
const repo = require('./repository')
const { validateConfirmPassword } = require('./validator')
const signupTemplet = require(('./signup'))
const mongoose=require("mongoose")
const app = express()

const port = process.env.PORT ||4000
const url=`mongodb+srv://sujathasenthamarai:suji$17yazh@cluster0.oquejho.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0`;

// The body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }))



mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{console.log("connected successfully")}).catch((err)=>{
    console.log(err);
  })
  
  // Define a User model
  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', UserSchema);




// Get route to display HTML form to sign in
app.get('/', (req, res) => {
	res.send(signupTemplet({}))
})

// Post route to handle form submission logic and 
app.post(
	'/',
	[validateConfirmPassword],
	async(req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.send(signupTemplet({ errors }))
	}
	// const { email, password } = req.body
	User.collection.insertOne({email:req.body.email,password: req.body.password})
        .then(()=>{console.log('inserted successsfully');})
        .catch((err)=>{console.error(`connection Problem: ${err}`)});
        res.send(`<script>alert('Signup Success');history.go(-2);</script>`)
})

// Server setup
app.listen(port, () => {
	console.log(`Server start on port http:localhost/${port}`)
})
