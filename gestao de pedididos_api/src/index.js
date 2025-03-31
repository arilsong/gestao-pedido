//importacao das dependencia
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const userRoute  = require("./routes/userRoutes");
const orderRoute  = require("./routes/orderRoutes");
const { errorHandler } = require("./middlewares/erroHandler");
const dotenv = require('dotenv').config();



const porta = 3000
const app = express();


const corsOptions = {
    origin: '*',            
};

app.use(cors())

//midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/api/user',userRoute)
app.use('/api/order', orderRoute)


app.use(errorHandler)


//inicia o servidor
app.listen(porta, () =>{
    console.log(`Servidor iniciado na porta ${porta}`)
})
