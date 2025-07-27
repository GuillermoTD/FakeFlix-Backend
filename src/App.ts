import express from "express";
import morgan from "morgan";
import AuthRoutes from "./routes/auth";
import dotenv from "dotenv"
dotenv.config()

const App = express();

// app.get('/', (req:Request,res:Response):void=>{
//     res.send("hola mundo express")
// })

/*Middlewares/*/
App.use(morgan("dev")); // This middleware show in the console details about request that the server receive
// this middleware return only the request that is based in json request
App.use(express.json());

/*Routes*/
App.use("/auth", AuthRoutes);

export default App;
