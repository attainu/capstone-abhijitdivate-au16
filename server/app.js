const express  = require("express");
const app = express()
const mongoose = require("mongoose");

const PORT = 5000
const dotenv = require('dotenv');
dotenv.config()


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
console.log(`DB connection error: ${err.message}`);
});

require("./models/user");
require("./models/post"); 
app.use(express.json())
app.use(require('./routes/authen.js'))
app.use(require('./routes/post.js'))

app.listen(PORT,()=>{
    console.log("running at ", PORT)
})