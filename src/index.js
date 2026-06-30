import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


//Middlewares
app.use(express.json());
app.use(cors());


//Routes
app.use("/api", userRoutes);

//Error handling middleware
app.use(errorHandling);

//testing db connection
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT current_database()");
        res.send(`current db name is : ${result.rows[0].current_database}`);
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ message: "Failed to connect to database" });
    }
});


//Server

app.listen(port , () => {
    console.log(`server is running http://localhost:${port}`);
});