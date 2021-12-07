import express from 'express';
import cors from 'cors'
import {stripe} from './services/stripe'


const app = express();

app.use(express.json());
app.use(cors())

app.listen(3333, () => 
console.log('server on 3333')
);




app.post('/create_payment', async (req, res) => {

    const product = await stripe.products.create({
        name: 'Berloque Sakura',
      });
    
    const price = await stripe.prices.create({
        unit_amount: 900,
        currency: 'brl',
        product: product.id,
    })

    const session = await stripe.checkout.sessions.create({
        success_url: 'https://localhost:3000/success',
        cancel_url: 'https://localhost:3000/cancel',
        line_items: [
          {price: price.id, quantity: 2},
        ],
        mode: 'payment',
        payment_method_types: ['card','boleto']
      });
    
    res.send(session.url as string)
    return
});