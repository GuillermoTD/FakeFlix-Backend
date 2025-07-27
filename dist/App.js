"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const App = (0, express_1.default)();
// app.get('/', (req:Request,res:Response):void=>{
//     res.send("hola mundo express")
// })
/*Middlewares/*/
App.use((0, morgan_1.default)("dev")); // This middleware show in the console details about request that the server receive
// this middleware return only the request that is based in json request
App.use(express_1.default.json());
/*Routes*/
App.use("/auth", auth_1.default);
exports.default = App;
