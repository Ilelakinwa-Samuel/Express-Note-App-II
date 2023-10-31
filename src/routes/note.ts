import express from "express";
import {
  AddNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controller/notes";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/create", auth, AddNote);
router.get("/", auth, getNotes);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);
router.get("/notes/id", getNote);

export default router;
