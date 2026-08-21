const express = require("express");
const cors = require("cors");
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());

const poolConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
};

let pool;
async function initPool(){
    pool = mysql.createPool(poolConfig);
}

initPool();

app.get("/", async (req, res) => {
    try{
        const conn = await pool.getConnection();
        await conn.ping();
        conn.release();
        return res.send('Conexión exitosa a la base de datos');
    } catch(err){
        return res.status(500).json({ mensaje: "Error de conexión a la base de datos", error: err.message });
    }
});

app.get("/db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT NOW() AS now");
        res.json(rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get('/health', async (req,res)=>{
    try{
        const conn = await pool.getConnection();
        await conn.ping();
        conn.release();
        res.status(200).send('OK');
    } catch(err){
        res.status(500).send('ERROR');
    }
});

app.listen(8000, () => {
    console.log("Servidor iniciado en puerto 8000");
});	
