import express from 'express';
import cors from 'cors'
import Stripe from 'stripe';


const app = express();

app.use(express.json());
app.use(cors())

app.listen(3333, () => 
console.log('server on 3333')
);



  


app.post("/create_payment", async (req, res) => {
    
    res.send("Ok")
});