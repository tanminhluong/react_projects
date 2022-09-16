import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verify } from "../verifyToken.js";

const router = express.Router();

// Create a video
router.post("/", verify, addVideo);

// Update a video
router.put("/:id", verify, updateVideo);

// Get a video
router.get("/find/:id", getVideo);

// Delete a video
router.delete("/", verify, deleteVideo);

router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verify, sub);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;
