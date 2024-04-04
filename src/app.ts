import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
import cryptRoutes from './routes/cryptRoutes'
import dotenv from 'dotenv'

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//EJS VIEW ENGINE setup

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use('/', cryptRoutes);

app.get('/', (req, res) => {
    const result = 'Hello, world!'; // Example value
  // Render the index.ejs file with the result variable
  res.render('index', { result });
  });

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})