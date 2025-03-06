import express from 'express';
import pool from './db.js';

const app = express.Router();

// Fetch all notes
app.get("/notes", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add a new note
app.post("/notes", async (req, res) => {
    try {
        const { notes } = req.body; // Extract notes from the request body

        if (!notes) {
            return res.status(400).json({ message: "Note content is required" });
        }

        // Insert the new note into the database (let the database auto-generate the ID)
        const result = await pool.query(
            'INSERT INTO notes (notes) VALUES ($1) RETURNING *',
            [notes]
        );
        res.status(201).json(result.rows[0]); // Return the newly created note
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Update a note (PUT)
app.put("/notes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { notes } = req.body;

        if (!notes) {
            return res.status(400).json({ message: "Note content is required" });
        }

        // Update the note in the database
        const result = await pool.query(
            'UPDATE notes SET notes = $1 WHERE id = $2 RETURNING *',
            [notes, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(result.rows[0]); // Return the updated note
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a note
app.delete("/notes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Check if the note exists
        const checkResult = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Delete the note
        await pool.query('DELETE FROM notes WHERE id = $1', [id]);

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default app;