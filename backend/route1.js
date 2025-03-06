import express from 'express'
import pool from './db.js';

const app = express.Router();
// app.use(express.json());


// fetch from the database
app.get("/notes", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes')
        res.json(result.rows)
    } catch (error) {
        res.status(404).json({ message: "Notes not found" })
    }
})


app.post("/notes", async (req, res) => {
    try {
        const id = parseInt(req.body.id)
        const notes = req.body.notes

        const result = await pool.query(`INSERT INTO notes (id, notes) VALUES ($1, $2) RETURNING *`, [id, notes])
        // res.json(result.rows[0])
        res.json(result.rows)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})


// Update an entire note (PUT)
app.put("/notes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        // res.json(req.body)
        const updateNote = req.body.notes
        

        const result = await pool.query(`UPDATE notes SET id = $1, notes = $2 WHERE id = $1 RETURNING *`,[id, updateNote])
        // res.json(result.rows);


        // const id = parseInt(req.params.id);
        // const { notes } = req.body; // destructure the request body
        
        // Update note query
        // const result = await pool.query(
        //     `UPDATE notes SET notes = $1 WHERE id = $2 RETURNING *`,
        //     [notes, id]
        // );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(result.rows[0]); // return the updated note


    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

// Update only the notes field (PATCH)
app.patch("/notes/:id", async(req, res)=>{
    try {
        const id = parseInt(req.params.id)
        const updateNote = req.body

        // const note = 
        // const result = await pool.query('SELECT * FROM notes')

        // const notes = result.rows

        // const note = notes.find((note)=>note.id=== id)
        // if(!note) return res.status(404).json({message: "Note not Found"})        
        
        // // if (req.body.id) note.id = req.body.id
        // // if (req.body.notes) note.notes = req.body.notes


        // if (req.body.id) await pool.query(`UPDATE notes SET id = $2 WHERE id = $1 RETURNING *`,[req.body.id, note.id])

        // if (req.body.notes) await pool.query(`UPDATE notes SET notes = $2 WHERE id = $1 RETURNING *`,[req.body.notes, note.id])

        // // const updateResult = 
        // res.json(result.rows)


        const { notes } = req.body;

        // Fetch the existing note to see if it exists
        const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
        const note = result.rows[0];

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // If notes is provided, update the notes field
        if (notes) {
            const updateResult = await pool.query(
                `UPDATE notes SET notes = $1 WHERE id = $2 RETURNING *`,
                [notes, id]
            );
            // return res.json(updateResult.rows[0]); // return the updated note
            note.notes = updateResult.rows[0].notes; // Update the note object with the new notes field

       

        }
        res.json(note);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})



// delete the note 
app.delete("/notes/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id)

        const result = await pool.query(`SELECT * FROM notes WHERE id = $1`, [id])
        // const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);

        if (result.rows.length === 0) return res.status(404).json({ message: "Note not found" });

        const deleteNotes = await pool.query(`DELETE FROM notes WHERE id=$1`,[id])

        // res.json(result)
        // res.json(result.rows[0])
        res.status(200).json({message: "Note deleted successfully "})        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
        
    }
})

export default app;