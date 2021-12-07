import express from 'express';
import cors from 'cors'
import {stripe} from './services/stripe'
import mercadopago from 'mercadopago'

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors())

app.listen(3333, () => 
console.log('server on 3333')
);

interface Item {
    id: String;
    name: String;
    amount: Number;
}

const calculateOrderAmount = (items: Item[]) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };




app.post('/create_payment', async (req, res) => {

    const { items } = req.body;
   
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "brl",
        automatic_payment_methods: {
            enabled: true
        }
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    
});

app.post('/payment_mercadopago', async(req,res) => {

  mercadopago.configure({
    access_token: 'APP_USR-1458045434481821-091716-6a09f76126aef1d7e27def4b04f3a52b-225097055'
  });

  const item = req.body

  let preferences = {
    items: [
      item
    ],
  }

  const response = await mercadopago.preferences.create(preferences)
  res.send(response.body.init_point)
})