const adminModel = require("../model/adminModel");
const blogModel = require("../model/blogModel");
const moment = require("moment");
const { all } = require("../routes/adminRoutes");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

module.exports.admin = async (req, res) => {
  try {
    const admin = req.cookies.admin;
    if (req.cookies.admin && req.cookies.admin._id) {
      return res.render("dashboard", { admin });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.view = async (req, res) => {
  try {
    const admin = req.cookies.admin;
    if (req.cookies.admin && req.cookies.admin._id) {
      var search = "";
      var filter = "";
      if (req.query.search) {
        search = req.query.search;
      }
      if (req.query.filter) {
        filter = req.query.filter;
      }
      let data = await adminModel.find({
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
          {
            email: { $regex: search, $options: "i" },
          },
          {
            city: { $regex: search, $options: "i" },
          },
        ],
      });
      if (filter) {
        allBlog = await blogModel.find({
          $or: [
            {
              category: { $regex: filter, $options: "i" },
            },
          ],
        });
      }
      if (req.query.reset) {
        allBlog = await blogModel.find();
      }
      return res.render("view", {
        data,
        admin,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.viewSingle = async (req, res) => {
  try {
    const single = await adminModel.findById(req.params.id);
    console.log(single.name);

    return res.status(200).json({
      status: "success",
      data: single,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addAdmin = async (req, res) => {
  try {
    const admin = req.cookies.admin;
    if (req.cookies.admin && req.cookies.admin._id) {
      return res.render("addAdmin", {
        admin,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addForm = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      req.body.name = req.body.fname + " " + req.body.lname;
      req.body.profile = req.file.filename;
      req.body.status = true;
      req.body.start_date = moment().format("MM Do YYYY, h:mm:ss a");
      req.body.update_date = moment().format("MM Do YYYY, h:mm:ss a");
      req.body.password = bcrypt.hashSync(req.body.password, 10);

      // console.log(req.body);

      await adminModel.create(req.body);
      return res.redirect("/admin/view");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.delete = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
    }
    // find the record which want to delete
    const single = await adminModel.findById(req.params.id);

    if (single) {
      // if single record has profile then delete first profile from it's folder first
      if (single.profile) {
        fs.unlinkSync(path.join(__dirname, "../uploads/", single.profile));
      }
      // then delete whole single data from database
      await adminModel.findByIdAndDelete(req.params.id);
      return res.redirect("/admin/view");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin/view");
  }
};

module.exports.editAdmin = async (req, res) => {
  try {
    const admin = req.cookies.admin;
    if (req.cookies.admin && req.cookies.admin._id) {
      const single = await adminModel.findById(req.params.id);
      if (single) {
        return res.render("editAdmin", {
          single,
          admin,
        });
      } else {
        console.log("No Record Found !!");
        return res.redirect("/view");
      }
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.edit = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      const admin = req.cookies.admin;
      const single = await adminModel.findById(req.params.id);
      console.log(single.profile);
      if (req.body) {
        if (req.file) {
          if (single.profile) {
            let oldpath = path.join(__dirname, "../uploads/", single.profile);
            fs.unlinkSync(oldpath);
          }
          req.body.profile = req.file.filename;
          req.body.name = req.body.fname + " " + req.body.lname;
          req.body.update_date = moment().format("MM Do YYYY, h:mm:ss a");
        }
        await adminModel.findByIdAndUpdate(req.params.id, req.body);
      } else {
        console.log("No Data Found !!");
      }
      return res.redirect("/admin/view");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.changePasswordPage = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      const admin = req.cookies.admin;
      console.log(admin);

      return res.render("changePasswordPage", { admin });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      console.log(req.body.oldPassword);
      const admin = req.cookies.admin;
      console.log(admin);

      let matchPassword = await bcrypt.compare(
        req.body.oldPassword,
        admin.password
      );
      // console.log(matchPassword);

      if (matchPassword) {
        if (req.body.newPassword == req.body.confirmPassword) {
          console.log("New Match !");

          let hashPassword = await bcrypt.hashSync(req.body.newPassword, 10);

          await adminModel.findByIdAndUpdate(admin._id, {
            password: hashPassword,
          });
          console.log("Password Update Successfully...");

          return res.redirect("/admin");
        } else {
          return res.redirect("/");
        }
      } else {
        console.log("Not Match New Password To Confirm Password");
        return res.redirect("/changePasswordPage");
      }
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.viewProfile = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      let admin = req.cookies.admin;
      return res.render("viewProfile", {
        admin,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addBlogPage = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      let admin = req.cookies.admin;
      return res.render("addBlog", {
        admin,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.addBlog = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      let date = new Date();
      console.log(date);

      if (req.file) {
        req.body.image = req.file.filename;
      }

      req.body.date = date;
      req.body.editDate = date;

      await blogModel.create(req.body);

      return res.redirect("/admin/viewBlogPage");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.viewBlogPage = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      let admin = req.cookies.admin;
      var search = "";
      var filter = "";
      if (req.query.search) {
        search = req.query.search;
      }
      if (req.query.filter) {
        filter = req.query.filter;
      }
      let allBlog = await blogModel.find({
        $or: [
          {
            title: { $regex: search, $options: "i" },
          },
          {
            description: { $regex: search, $options: "i" },
          },
        ],
      });
      if (filter) {
        allBlog = await blogModel.find({
          $or: [
            {
              category: { $regex: filter, $options: "i" },
            },
          ],
        });
      }
      if (req.query.reset) {
        allBlog = await blogModel.find();
      }
      return res.render("viewBlog", {
        allBlog,
        admin,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.viewSingleBlog = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      let admin = req.cookies.admin;
      let single = await blogModel.findById(req.params.id);
      return res.render("viewSingleBlog", {
        single,
        admin,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.editBlogPage = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      let admin = req.cookies.admin;
      let single = await blogModel.findById(req.params.id);

      return res.render("editBlogPage", {
        admin,
        single,
      });
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.editBlog = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      let admin = req.cookies.admin;
      let date = new Date();
      let single = await blogModel.findById(req.params.id);
      if (req.file) {
        if (single.image) {
          console.log("image Update");
          console.log(req.file.filename);

          let oldpath = path.join(__dirname, "../uploads/", single.image);
          fs.unlinkSync(oldpath);
          req.body.image = req.file.filename;
        } else {
          req.body.image = req.file.filename;
        }
      }
      req.body.editDate = date;
      console.log(req.body);

      await blogModel.findByIdAndUpdate(req.params.id, req.body);

      return res.redirect("/admin/viewBlogPage");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    if (req.cookies.admin && req.cookies.admin._id) {
      console.log(req.params.id);
      let single = await blogModel.findById(req.params.id);
      console.log(single);

      if (single.image) {
        console.log("image");

        let oldpath = path.join(__dirname, "../uploads/", single.image);
        fs.unlinkSync(oldpath);
      }
      await blogModel.findByIdAndDelete(req.params.id);

      return res.redirect("/admin/viewBlogPage");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};
