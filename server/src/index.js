import dotenv from 'dotenv';
dotenv.config();
import { app } from './app.js';
import { connectToDB } from './config/database.js';

connectToDB()
.then(()=>{
  app.listen(PORT,()=>console.log(`server started successfully at ${PORT}`))
})
const PORT = process.env.PORT || 4040;