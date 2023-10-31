"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Pages
router.get("/", (req, res, next) => {
    return res.render("Home");
});
router.get("/register", (req, res, next) => {
    return res.render("Register");
});
//Display Page
// router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
//   try {
//     const verified = req.user;
//     const note = await Note.find({ userId: verified.id });
//     return res.render("Home", { noteList: note });
//   } catch (error: any) {
//     //console.log(error.message);
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/login", (req, res, next) => {
    return res.render("Login");
});
// // // //Create Notes with EJS
// router.post("/dashboard", auth, async (req: Request | any, res: Response) => {
//   try {
//     const verified = req.user;
//     // const id = uuidv4()
//     // const { title, description, image, price } = req.body
//     // const validationResult = addNoteSchema.validate(req.user, options);
//     //   if (validationResult.error) {
//     //     return res.render("Dashboard", {
//     //       error: validationResult.error.details[0].message,
//     //     });
//     //   }
//     const note = new Note({
//       ...req.body,
//       userId: verified.id,
//     });
//     await note.save();
//     return res.redirect("/dashboard");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// });
// //delete note
// router.get("/dashboard/:id", auth, async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const record = await Note.findByIdAndDelete(id);
//     if (!record) {
//       return res.render("Home", { error: "cannot find existing note" });
//     }
//     return res.redirect("/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// });
// //UPDATE NOTE
// router.put("/dashboard/:id", auth, async (req: Request, res: Response) => {
//   try {
//     console.log({ test: req.body });
//     const { id } = req.params;
//     // const { title, description, duedate, status } = req.body;
//     const validationResult = updateNoteSchema.validate(req.body, options);
//     if (validationResult.error) {
//       res.render("Dashboard", {
//         error: validationResult.error.details[0].message,
//       });
//     }
//     const note = await noteModel.findByIdAndUpdate(
//       id,
//       {
//         title: req.body.title,
//         description: req.body.description,
//         image: req.body.duedate,
//         price: req.body.status,
//       },
//       { new: true }
//     );
//     if (!note) {
//       res.render("dashboard", { message: "Note not found" });
//     }
//     await note?.save();
//     return res.redirect("/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// });
exports.default = router;
