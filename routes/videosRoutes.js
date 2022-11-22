const express = require("express");
const router = express.Router();
const userHasCursos = require('../models/UserHasCursos')
const cursoModel = require('../models/Cursos')
const fs = require("fs");



router.get("/video/:id", async function  (req, res) {
    
    
    const userId = req.params.userId
    const id = req.params.id
    const curso = await userHasCursos.findById(id).populate('cursoId');
    const filePath = `./views/${curso.cursoId.filePath.slice(2)}`
    
    // try {
        
    //     const range = req.headers.range;
    //     if (!range) {
    //         res.status(400).send("Requires Range header");
    //     }
    //     const videoPath = path;
    //     const videoSize = fs.statSync(path).size;
    //     const CHUNK_SIZE = 100 ** 6;
    //     const start = Number(range.replace(/\D/g, ""));
    //     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    //     const contentLength = end - start + 1;
    //     const headers = {
    //         "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //         "Accept-Ranges": "bytes",
    //         "Content-Length": contentLength,
    //         "Content-Type": "video/mp4",
    //     };
    //     res.writeHead(206, headers);
    //     const videoStream = fs.createReadStream(videoPath, { start, end });
    //     videoStream.pipe(res);

    // } catch (error) {
    //     return res.status(500).json({
    //     status: 500,
    //     error,
    //   });
    // }

    const options = {};

    let start;
    let end;

    const range = req.headers.range;
    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }

    res.setHeader("content-type", "video/mp4");

    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let contentLength = stat.size;

        // Listing 4.
        if (req.method === "HEAD") {
            res.statusCode = 200;
            res.setHeader("accept-ranges", "bytes");
            res.setHeader("content-length", contentLength);
            res.end();
        }
        else {       
            // Listing 5.
            let retrievedLength;
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start;
            }
            else if (start !== undefined) {
                retrievedLength = contentLength - start;
            }
            else if (end !== undefined) {
                retrievedLength = (end+1);
            }
            else {
                retrievedLength = contentLength;
            }

            // Listing 6.
            res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

            res.setHeader("content-length", retrievedLength);
            res.setHeader("Connection", keep-alive)

            if (range !== undefined) {  
                res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                res.setHeader("accept-ranges", "bytes");
            }

            // Listing 7.
            const fileStream = fs.createReadStream(filePath, options);
            fileStream.on("error", error => {
                console.log(`Error reading file ${filePath}.`);
                console.log(error);
                res.sendStatus(500);
            });


            fileStream.pipe(res);
        }
    });



   
});

module.exports = router;