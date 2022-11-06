require("dotenv").config();
const userModel = require("../models/User");
const userHasCursos = require("../models/UserHasCursos")
const session = require('express-session')


const JWT = require("jsonwebtoken");

const signToken = (userID, user, role) => {
    return JWT.sign(
      {
        iss: {
          username:user,
          role:role
        },
        sub: userID,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  };

class Users {
  static async signIn(req, res) {
    const { username, password, role } = req.body;
    userModel.findOne({ username }, (err, user) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "database error", msgError: true } });
      if (user){
        req.flash('error', 'El usuario ya existe')
        res.redirect('/')
      }
      else {

        try {
          const newUser = new userModel({username, password, role})
          newUser.save(function (err) {
            if (err) return handleError(err);
            // saved!
          });
          res.render("index", {
            succes_msg:"Usuario creado con exito!"
          });
          
        } catch (error) {
          res.status(400).json({
            msg:error
          })
        }
        
      }
    });
  }

  static async logIn(req, res) {
    if (!req.isAuthenticated()) {
      

      res.redirect("/")
      
    }else{
      const { _id, username, role } = req.user;
      console.log(_id.toString())
      const token = signToken(_id, username, role);
      
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.cookie("userId", _id.toString(), { httpOnly: true, sameSite: true });
      const sessionId = req.session
      sessionId.globalUserId = req.cookies.userId

      if (role === "admin") {

        res.render('admin');

        res.status({
          status:200,
          msg: token
        })
      } else {
        res.render("profile");
      }
    }
    }
    
    

  
  static async logOut(req, res) {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }

  static async getUsers(req, res) {
    try {
      const user = await user.find().populate('cursos');
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "there are no users ",
        });
      }
      return res.json({
        status: 200,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }


  static async getUserCourses(req, res) {
    try {

      const userId = req.cookies.userId
      
      const user = await userHasCursos.find({userId: userId}).populate('cursoId');
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "there are no users ",
        });
      }
      return res.json({
        status: 200,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

}





  
  


module.exports = Users;
