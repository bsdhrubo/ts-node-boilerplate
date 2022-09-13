import bodyParser from 'body-parser';
import express from'express'
import { connectToDatabase } from './config/db'
import router from './module/controller'

const app = express()
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000

app.use(router)
 
const start = async () => {
    try {
      await connectToDatabase()
      app.listen(port, () => console.log(`http://localhost:${port}`));
    } catch (error) {
      console.error(error); 
    }
  };
  start();