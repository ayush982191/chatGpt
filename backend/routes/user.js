import express from "express";
import sendMessage from "../controllers/user.js"

const app = express.Router();

app.post("/getMessage",sendMessage)


export default app;