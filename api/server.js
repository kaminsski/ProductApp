const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const database = require('./config/db');
const path = require('path');



dotenv.config()

const app = express()

const PORT = process.env.PORT || 5005

app.use(cors())
app.use('/Images', express.static(path.join(__dirname, 'Images')));

app.use(express.json())

app.use("/cart", require("./routes/cartRoute"))
app.use("/fav", require("./routes/favRoute"))
app.use("/auth", require("./routes/userRoute"))
app.use("/comment", require("./routes/commentRoute"))
app.use("/category", require("./routes/categoryRoute"))
app.use("/product", require("./routes/productRoute"))
app.use("/brand", require("./routes/brandRoute"))
app.use("/color", require("./routes/colorRoute"))

database()
app.listen(PORT, ()=>{
    console.log("Server port:", PORT);
})