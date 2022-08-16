const NotesModel = require("../models/NotesModel");

module.exports.getNotes = async (req, res) => {
    const Notes = await NotesModel.find();
    res.send(Notes);
}

module.exports.saveNotes = (req, res) => {
    const { title, content } = req.body;

    NotesModel
        .create({ title, content })
        .then(() => res.set(201).send("Added Successfully..."))
        .catch((err) => console.log(err));
}

module.exports.deleteNotes = (req, res) => {
    const { _id } = req.body;

    NotesModel
        .findByIdAndDelete(_id)
        .then(() => res.set(201).send("Deleted Successfully..."))
        .catch((err) => console.log(err));
}

module.exports.updateNotes = (req, res) => {
    const { _id, title, content } = req.body;

    NotesModel
        .findByIdAndUpdate(_id, { title, content })
        .then(() => res.set(201).send("Updated Successfully..."))
        .catch((err) => console.log(err));
}