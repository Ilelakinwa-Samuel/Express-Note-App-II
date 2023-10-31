import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Note from "../model/notes";
import { options, updateNoteSchema } from "../utils/utils";
import mongoose from "mongoose";

export const AddNote = async (req: Request | any, res: Response) => {
  try {
    console.log("Hello");
    const verified = req.user;

    // const id = uuidv4()
    // const { title, description, image, price } = req.body

    const note = new Note({
      ...req.body,
      userId: verified.id,
    });

    await note.save();

    return res.status(201).json({
      msg: "You have successfully added a note",
      note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

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

export const getNote = async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  return Note.findById(noteId)

    .then((note) =>
      note
        ? res.status(200).json({ note })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const getAllNotes = await Note.find({
      // limit:limit,
      // offset:offset
    });

    // return res.render("layout", {notelist: getAllNotes})
    return res.status(200).json({
      msg: "You have successfully gotten all notes",
      getAllNotes,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  return Note.findById(noteId)
    .then((note) => {
      if (note) {
        note.set(req.body);

        return note
          .save()
          .then((note) => res.status(201).json({ note }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(400).json({ message: "Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

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

export const deleteNote = async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  return Note.findByIdAndDelete(noteId)
    .then((note) =>
      note
        ? res.status(200).json({ message: "Data sucessfully deleted" })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
