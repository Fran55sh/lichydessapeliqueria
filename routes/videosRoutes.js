const express = require("express");
const router = express.Router();
const userHasCursos = require('../models/UserHasCursos')
const cursoModel = require('../models/Cursos')
const fs = require("fs");



router.get("/video/:id", async function  (req, res) {
  
    try {
        
        const userId = req.params.userId
        const id = req.params.id
        const curso = await userHasCursos.findById(id).populate('cursoId');
        const path = `./views/${curso.cursoId.filePath.slice(2)}`
        
        
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }
        const videoPath = path;
        const videoSize = fs.statSync(path).size;
        const CHUNK_SIZE = 100 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);

    } catch (error) {
        return res.status(500).json({
        status: 500,
        error,
      });
    }



   
});

module.exports = router;