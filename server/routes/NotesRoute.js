const { Router } = require("express");

const { getNotes, saveNotes, deleteNotes, updateNotes } = require("../controllers/NotesController.js");

const router = Router();

router.get("/get-notes", getNotes);

router.get("/get-notes", getNotes);

router.post("/save-notes", saveNotes);

router.post("/delete-notes", deleteNotes);

router.post("/update-notes", updateNotes);

module.exports = router;