import { addSong, listSong, removeSong } from "../controllers/songController.js";
import express from 'express'
import upload from "../midddleware/multer.js";

const songRouter = express.Router();

// Use multer.fields() only for the add route that handles file uploads
songRouter.post('/add', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
]), addSong);

// No multer needed for these routes (they don't handle files)
songRouter.get('/list', listSong);
songRouter.post('/remove', removeSong);

export default songRouter;