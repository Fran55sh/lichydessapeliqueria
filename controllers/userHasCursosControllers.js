require("dotenv").config();
const userHasCursos = require("../models/UserHasCursos");
const cursoModel = require("../models/Cursos");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

class addCursos {
  /**
   * It takes the params from the url, finds the curso in the database, and then creates a new document
   * in the userHasCursos collection with the userId and cursoId.
   * @param req - is the request object
   * @param res - the response object
   * @returns {
   *     "status": 500,
   *     "error": {
   *         "message": "userHasCursos validation failed: userId: Path `userId` is required., cursoId:
   * Path `cursoId` is required.",
   *         "name": "ValidationError",
   *         "errors": {
   *             "userId": {
   */
  static async postCursoToUser(req, res) {
    try {
      
      const cursoId = req.params.curso;
      const userId = req.cookies.userId

      console.log(cursoId)
      console.log(userId)
      if (!cursoId) {
        return res.status(404).json({
          status: 404,
          message: "params missing",
        });
      }

      userHasCursos.create({
        userId,
        cursoId,
      });
      return res.status(201).json({
        status: 201,
        message: `curso agregado`,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error,
      });
    }
  }
}

module.exports = addCursos;
