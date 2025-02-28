import express from 'express'
import pool from './db.js';

const app = express.Router();
// app.use(express.json());


// fetch from the database
app.get("/notes", async (req, res)=>{
    try {
        const result = await pool.query('SELECT * FROM notes')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({message: "Notes not found"})
    }
})


app.post("/notes", async (req,res)=>{
    try {
        const id = parseInt(req.body.id)
        const notes = req.body.notes

        const result = await pool.query(`INSERT INTO notes (id, notes) VALUES ($1, $2) RETURNING *`,[id, notes])
        // res.json(result.rows[0])
        res.json(result.rows)

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

export default app;