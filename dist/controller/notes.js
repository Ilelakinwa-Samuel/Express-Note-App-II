"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNotes = exports.getNote = exports.AddNote = void 0;
const notes_1 = __importDefault(require("../model/notes"));
const AddNote = async (req, res) => {
    try {
        console.log("Hello");
        const verified = req.user;
        // const id = uuidv4()
        // const { title, description, image, price } = req.body
        const note = new notes_1.default({
            ...req.body,
            userId: verified.id,
        });
        await note.save();
        return res.status(201).json({
            msg: "You have successfully added a note",
            note,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.AddNote = AddNote;
// export const AddNote = async (req: Request | any, res:Response) => {
//     try {
//         const verified = req.user;
//         // Generate a new ObjectId
//         const noteId = new mongoose.Types.ObjectId();
//         const note = new Note({
//             ...req.body,
//             _id: noteId, // Use a different field name for the _id field
//             userId: verified.id // Store the user ID in a different field
//         })
//         await note.save()
//         return res.status(201).json({
//             msg: "You have successfully added a note",
//             movie
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: "Internal server error" });
//     }
// }
const getNote = async (req, res) => {
    const noteId = req.params.noteId;
    return notes_1.default.findById(noteId)
        .then((note) => note
        ? res.status(200).json({ note })
        : res.status(404).json({ message: "Not Found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.getNote = getNote;
const getNotes = async (req, res) => {
    try {
        const getAllNotes = await notes_1.default.find({
        // limit:limit,
        // offset:offset
        });
        // return res.render("layout", {notelist: getAllNotes})
        return res.status(200).json({
            msg: "You have successfully gotten all notes",
            getAllNotes,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getNotes = getNotes;
const updateNote = async (req, res) => {
    const noteId = req.params.noteId;
    return notes_1.default.findById(noteId)
        .then((note) => {
        if (note) {
            note.set(req.body);
            return note
                .save()
                .then((note) => res.status(201).json({ note }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(400).json({ message: "Not Found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
exports.updateNote = updateNote;
// export const updateNote = async (req:Request, res:Response) => {
//   try {
//     const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!note) {
//       return res.status(404).json({ message: 'Note not found' });
//     }
//     res.json(note);
//   } catch (error) {
//     res.status(400).json({ message:error});
//   }
// };
const deleteNote = async (req, res) => {
    const noteId = req.params.noteId;
    return notes_1.default.findByIdAndDelete(noteId)
        .then((note) => note
        ? res.status(200).json({ message: "Data sucessfully deleted" })
        : res.status(404).json({ message: "Not Found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.deleteNote = deleteNote;
