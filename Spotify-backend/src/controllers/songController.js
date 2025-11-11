import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js';

const addSong = async (req,res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
    // upload audio and image. Use resource_type: 'auto' for audio to let Cloudinary detect the type
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "auto" });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    // Cloudinary may not always return duration for every upload type; guard against undefined
    const durationSec = audioUpload.duration || 0;
    const duration = `${Math.floor(durationSec / 60)}:${String(Math.floor(durationSec % 60)).padStart(2, '0')}`;

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({success: true, message: "Song added successfully"});
        
    } catch (error) {
        // return error message for easier debugging on the client
        console.error('Error in addSong:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

const listSong = async (req,res) => {
    try {
        
        const allSongs = await songModel.find({});
        res.json({success: true, songs: allSongs});

    } catch (error) {

        res.json({success: false});
        
    }
}

const removeSong = async (req,res) => {
    try {

        await songModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Song removed successfully"});
        
    } catch (error) {
        
        console.error(error);
    res.json({ success: false, error: error.message });

    }
};

export { addSong,listSong,removeSong};