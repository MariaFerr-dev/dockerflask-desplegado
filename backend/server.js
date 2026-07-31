const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER,
    host: "db",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
});

app.get("/", (req, res) => {
    res.json({
        mensaje: "API ADSO funcionando correctamente"
    });
});

app.get("/db", async (req, res) => {
    try {
        const datos = await pool.query("SELECT NOW()");
        res.json(datos.rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.listen(8000, () => {
    console.log("Servidor iniciado en puerto 8000");
});	
