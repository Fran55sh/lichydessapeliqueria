const express = require("express");
const router = express.Router();
const cursosController = require("../controllers/cursosControllers")
const addCursosController = require("../controllers/userHasCursosControllers")
const passport = require("passport");


router.get('/cursos', cursosController.getAllcursos)
router.get('/cursos/:id', cursosController.getCursoById)
router.delete('/cursos/delete/:id', cursosController.deleteCurso)
router.post('/authenticated', passport.authenticate("jwt", { session: false }), cursosController.postCurso)
router.get('/cursos/add/:curso', addCursosController.postCursoToUser)
// router.get(apiPath + '/videos/:videoId',cursosController.getVideo )

router.use('/api', router)

module.exports = router;