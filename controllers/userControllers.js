require("dotenv").config();
const userModel = require("../models/User");
const userHasCursos = require("../models/UserHasCursos")


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
    console.log(username, password, role);
    userModel.findOne({ username }, (err, user) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "database error", msgError: true } });
      if (user)
        res
          .status(400)
          .json({
            message: { msgBody: "Username is already taken", msgError: true },
          });
      else {

        try {
          const newUser = new userModel({username, password, role})
          newUser.save(function (err) {
            if (err) return handleError(err);
            // saved!
          });
          res.redirect("/");
          
        } catch (error) {
          res.status(400).json({
            msg:"aca"
          })
        }
        
      }
    });
  }

  static async logIn(req, res) {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      console.log(_id.toString())
      const token = signToken(_id, username, role);
      
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.cookie("userId", _id.toString(), { httpOnly: true, sameSite: true });
      //    res.status(200).json({isAuthenticated : true,user : {username,role}});

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
    
    
  // static async authenticate(req, res){
  //   const user = req.user;

  //   if (user.role === "admin") {
  //     res.render("admin");
  //   } else {
  //     res.render("profile");
  //   }
  // }
  
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

      let access_token = req.cookies.access_token
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
