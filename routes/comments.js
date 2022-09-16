import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/comment.js";
import { verify } from "../verifyToken.js";

const router = express.Router();

router.post("/", verify, addComment);
router.delete("/:id", verify, deleteComment);
router.get("/:videoId", verify, getComment);

export default router;
