import express from "express";
import dotenv from "dotenv";
import userRoute from '../routes/user.js'; // Adjust the import path as necessary
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/new", (req, res) => res.send("Data coming"));
app.use('/user', userRoute);

const PORT =  3000;
app.listen(PORT, () => console.log(`Listening to backend port  ${PORT}`));
