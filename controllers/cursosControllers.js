require("dotenv").config();
const cursoModel = require("../models/Cursos");
const userModel = require("../models/User");
const { fs, unlink } = require("fs");
const jwt = require('jsonwebtoken');
const { listenerCount } = require("process");


class Cursos {
  /**
   * It gets all the cursos from the database and returns them in a json format.
   * @param req - The request object.
   * @param res - The response object.
   * @returns a JSON object with the status and data.
   */
  static async getAllcursos(req, res) {
    try {
      const curso = await cursoModel.find();
      if (!curso) {
        return res.status(404).json({
          status: 404,
          message: "there are no cursos ",
        });
      }
      return res.json({
        status: 200,
        data: curso,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  static async getCursoById(req, res) {

    console.log(req.params)
    try {
      const curso = await cursoModel.findById(req.params.id);
      if (!curso) {
        return res.status(404).json({
          status: 404,
          message: "there are no cursos ",
        });
      }
      return res.json({
        status: 200,
        data: curso,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  /**
   * It takes the file from the request, saves it in the server, and then saves the file's name,
   * description and path in the database.
   * </code>
   * @param req - the request object
   * @param res - the response object
   */
  static async postCurso(req, res) {
    if (req.files) {
      console.log(req.files);
      let file = req.files.files;
      let filename = file.name;
      console.log(filename);
      // console.log(req.body.fileName);
      console.log(req.body.description);

      file.mv("./views/assets/" + filename, function (err) {
        if (err) {
          res.send(err);
          return;
        } else {
          console.log("file uploaded");
        }
      });
      const filePath = `./assets/${filename}`;

      /* Creating a new curso in the database. */
      const { nombre, description, precio } = req.body;
      try {
        const createCurso = await cursoModel.create({
          nombre,
          descripcion: description,
          filePath,
          precio,
        });
        res.redirect('api/authenticated')
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
    } else {
      console.log("no se selecciono un arhivo");
    }
  }

  //   static async updateProduct(req, res) {

  //   }

  /**
   * It deletes a course from the database and the file system.
   * @param req - the request object
   * @param res - the response object
   */
  static async deleteCurso(req, res) {
    try {
      console.log(req.body.nombre)
      const nombre = req.body.nombre;
      const curso = await cursoModel.findOne({ nombre: nombre });
      if(curso){
        const cursoObj = JSON.parse(JSON.stringify(curso));
        console.log(`./views/${cursoObj.filePath.slice(2)}`)
        unlink(`./views/${cursoObj.filePath.slice(2)}`, (err) => {
          
          if (err) {
            console.log("error");
          } else {
            console.log("file removed");
          }
        });
  
        await curso.remove();
        return res.status(201).json({
          status: 201,
          msg: "curso y archivo eliminado",
        });

      } else{
        return res.status(401).json({
          status: 401,
          msg:"curso no encontrado"
        })
      }
    } catch (err) {
      res.status(404).json({ err });
    }
  }

  static async addCursoToUser(req, res) {
    try {
      let params = req.params.curso
      let userId = req.cookies.userId
      
      const curso = await cursoModel.findOne({nombre : params});
      const cursoId = curso._id
      if (!curso) {
        return res.status(404).json({
          status: 404,
          message: "there are no cursos ",
        });
      }
      let user = await userModel.findOne({userId: userId});
      
      if(user){
        user.cursos.push(cursoId);
        user.save();
        return res.json({
          status: 200,
          data: user,
        });
      }
      return res.json({
        status:400,
        msg:"user not found"
      })
    } catch (error) {
      return res.json({
        status:500,
        error,
      })
    }
  }

  // static async getVideo(req, res) {
  //   try {
  //     const curso = await cursoModel.find();
  //     if (!curso) {
  //       return res.status(404).json({
  //         status: 404,
  //         message: "there are no cursos ",
  //       });
  //     }
  //     return res.json({
  //       status: 200,
  //       data: curso,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       status: 500,
  //       error,
  //     });
  //   }
  // }
}

module.exports = Cursos;
