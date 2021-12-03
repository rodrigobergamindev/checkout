import express from 'express';
import mercadopago from 'mercadopago'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.listen(3333, () => 
console.log('server on 3333')
);


mercadopago.configure({
    access_token: 'APP_USR-1458045434481821-091716-6a09f76126aef1d7e27def4b04f3a52b-225097055'
  });




  


app.post("/create_preference", async (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.data.title,
				unit_price: Number(req.body.data.unit_price),
				quantity: Number(req.body.data.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:3000/feedback",
			"failure": "http://localhost:3000/feedback",
			"pending": "http://localhost:3000/feedback"
		},
	};

   
    
    
       
        const response = await mercadopago.preferences.create(preference)
        const id = await response.body.id
        console.log(response)


        if(id){
            res.json({
                id
            }).send()
        }

    
    
});