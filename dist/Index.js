"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
require("./dbconfig");
App_1.default.listen("3000", () => {
    console.log(`this server is running in 3000 port`);
});
