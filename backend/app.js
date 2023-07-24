// -----------------------------------------------------------Module Importation------------------------------------------------//
const express = require("express");
const bodyParser = require("body-parser");
// ------------import mongoose module-------------//
const mongoose = require("mongoose");
// import ObjectID
const { ObjectId } = require("mongodb");
// ------------import Axios module-------------//
const axios = require("axios");
// ------------import Bcrypt module-------------//

const bcrypt = require("bcrypt");

// ------------import Multer module-------------//
const multer = require("multer");
// ------------import path module-------------//
const path = require("path")
// ------------create application-------------//
const app = express();
// -------- Send Json responses---------//
app.use(bodyParser.json());
// -------- Get object from request------------//
app.use(bodyParser.urlencoded({ extended: true }));
// ------------Connect APP To DB eldcare DB -------------//
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/eldcareDB');
// ------------Models Importation  -------------//
const User = require("./models/user");
const Publication = require("./models/publication");
const Validation = require("./models/validation");
const Reservation = require("./models/reservation");
const reservation = require("./models/reservation");
// const Publication = require("path/to/publicationSchema");
// const User = require("path/to/userSchema");
// ----------Security configuration------------//
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});
// Folder configuration
app.use('/images', express.static(path.join('backend/images')));

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
// --------------------------------------------------Business logic --------------------------------------------------------------------------//
// ------------------------Business logic:Signup -----------------------------------------------------------//
// ---------Business logic:Signup Carer----------//

app.post("/users/signupCarer", multer({ storage: storageConfig }).fields([{ name: 'avatar', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), async (req, res) => {
    try {
      const url = req.protocol + '://' + req.get('host');
      let avatar = "";
      if (req.files.avatar) {
        avatar = url + '/images/' + req.files.avatar[0].filename;
      } else {
        avatar = url + '/images/' + "Anonymous-Avatar.jpg";
      }
  
      const crybtedPwd = await bcrypt.hash(req.body.password, 8);
      console.log("Here crybted PWD", crybtedPwd);
  
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        adress: req.body.adress,
        experience: req.body.experience,
        email: req.body.email,
        password: crybtedPwd,
        role: req.body.role,
        status: req.body.status,
        avatar: avatar,
        cv: url + '/images/' + req.files.cv[0].filename,
      });
  
      const savedUser = await user.save();
      console.log("Here savedUser", savedUser);
  
      res.json({ message: "1" });
    } catch (error) {
      console.error("Here error", error);
  
      if (error.errors.email || error.errors.telephone) {
        res.json({ message: "0" });
      } else {
        res.status(500).json({ message: "An error occurred" });
      }
    }
  });
  
// ---------Business logic:Signup Admin----------//
// app.post("/users/signupAdmin", (req, res) => {
//     console.log("Here into BL: Add User", req.body);
//     bcrypt.hash(req.body.password, 8).then((crybtedPwd) => {
//         console.log("Here crybted PWD", crybtedPwd);
//         let user = new User({
//             firstName: "",
//             lastName: "",
//             telephone: req.body.telephone,
//             adress: "",
//             experience: "",
//             email: req.body.email,
//             password: crybtedPwd,
//             role: req.body.role,
//             status: req.body.status,
//             avatar: "",
//             cv: ""
//         });
//         console.log("Here user to save", user);
//         user.save((error, doc) => {
//             console.log("Here error", error);
//             console.log("Here doc", doc);

//             if (error) {
//                 if (error.errors.email) {
//                     res.json({ message: "Email exist" });
//                 } else if (error.errors.telephone) {
//                     res.json({ message: "telephone exist" });
//                 }

//             } else {
//                 res.json({ message: "Added with success" });
//             }
//         })
//     })
// })
app.post("/users/signupAdmin", async (req, res) => {
    try {
      console.log("Here into BL: Add User", req.body);
      const crybtedPwd = await bcrypt.hash(req.body.password, 8);
      console.log("Here crybted PWD", crybtedPwd);
  
      const user = new User({
        firstName: "",
        lastName: "",
        telephone: req.body.telephone,
        adress: "",
        experience: "",
        email: req.body.email,
        password: crybtedPwd,
        role: req.body.role,
        status: req.body.status,
        avatar: "",
        cv: ""
      });
  
      console.log("Here user to save", user);
      const savedUser = await user.save();
      console.log("Here savedUser", savedUser);
  
      res.json({ message: "Added with success" });
    } catch (error) {
      console.error("Here error", error);
  
      if (error.errors.email) {
        res.json({ message: "Email exists" });
      } else if (error.errors.telephone) {
        res.json({ message: "Telephone exists" });
      } else {
        res.status(500).json({ message: "An error occurred" });
      }
    }
  });
  

// ---------Business logic:Login---------//
app.post("/users/login", (req, res) => {
    let user;
    console.log("Here into login", req.body);
    User.findOne({ $or: [{ email: req.body.email }, { telephone: req.body.telephone }], status: "confirmed" }).then((doc) => {
        console.log("Here response", doc);
        if (!doc) {
            res.json({ message: "0" });
        }
        user = doc;
        return bcrypt.compare(req.body.password, doc.password);
    }).then((pwdResponse) => {
        if (!pwdResponse) {
            res.json({ message: "1" })
        } else {
            let userToSend = {
                id: user._id,
                role: user.role, 
               
            }
            res.json({ user: userToSend, message: "2" })
        }
    });
});
// ---------Business logic:Signup Client----------//


app.post("/users/signupClient", multer({ storage: storageConfig }).single('avatar'), async (req, res) => {
    try {
      console.log("Here into BL: Add User", req.body);
      const url = req.protocol + '://' + req.get('host');
      const crybtedPwd = await bcrypt.hash(req.body.password, 8);
      console.log("Here crybted PWD", crybtedPwd);
  
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        adress: req.body.adress,
        email: req.body.email,
        password: crybtedPwd,
        role: req.body.role,
        status: req.body.status,
        avatar: url + '/images/' + req.file.filename
      });
  
      const savedUser = await user.save();
      console.log("Here savedUser", savedUser);
  
      res.json({ message: "Added with success" });
    } catch (error) {
      console.error("Here error", error);
  
      if (error.errors.email) {
        res.json({ message: "Email exists" });
      } else {
        res.status(500).json({ message: "An error occurred" });
      }
    }
  });
  
// ---------Business logic:Get All users ---------//
app.get("/users/getAll", (req, res) => {
    User.find({ status: "confirmed" }).then((docs) => {
        console.log("Here data after search users", docs);
        // replace result array by users nbr, admin nbr , accoma nbr
        let result = [5, 6, 9]
        res.json({ users: result });
    })
})
// ---------Business logic:Get user By Id---------//
app.get("/users/get/:id", (req, res) => {
    let id = req.params.id;
    User.findOne({ _id: id, status: "confirmed" }).then((doc) => {
        console.log("Here data after search user by Id", doc);
        res.json({ user: doc });
    })
})
// ---------Business logic:Get All Carers---------//
app.get("/users/accompagnants", (req, res) => {
    User.find({ "role": { $in: ["Carer"] } }).then((docs) => {
        console.log("Here data after search all accompagnants", docs);
        res.json({ accomapagnants: docs });
    })
})
// ---------Business logic:Get Carer By Id---------//
app.get("/users/carer/:id", (req, res) => {
    let id = req.params.id
    User.findOne({ _id: id }).then((doc) => {
        console.log("Here carer ", doc);
        doc
            ? res.json({ carer: doc })
            : res.json({ message: "Carer does not exist" });
    })
})
// ---------Business logic:Delete Carer---------//
app.delete("/users/accompagnant/:id", (req, res) => {
    let id = req.params.id;
    User.deleteOne({ _id: id }).then((response) => {
        console.log("Here response after delete", response);
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    })
})
// ---------Business logic:Confirm Status Carer By Id---------//
app.get("/users/confirmeStatusAccompagnant/:id", (req, res) => {
    let id = req.params.id;
    let filter = { _id: id };
    let update = { status: "confirmed" };
    console.log("Here into Bl : Confirm status client", id);
    User.findOneAndUpdate(filter, update, {
      
        rawResult: true
    }).then((response) => {
        console.log("Here response after confirmed", response);
        if (response.updatedExisting == true) {
            res.json({ isModified: true });
        } else {
            res.json({ isModified: false });
        }
    })
})
// ---------Business logic:Get All Confirmed Carers---------//
app.get("/users/confirmedCarers", (req, res) => {
    User.find({ role: "Carer", status: "confirmed" }).then((docs) => {
        console.log("Here data after search all carers", docs);
        res.json({ carers: docs });
    })
})
// ---------Business logic:Get All admins---------//
app.get("/users/admins/get", (req, res) => {
    User.find({ role: { $in: ["admin"] } }).then((docs) => {
        console.log("Here data after search all admins", docs);
        res.json({ admins: docs });
    })
})
// ---------Business logic:Get All Clients---------//
app.get("/users/clients", (req, res) => {
    User.find({ "role": { $in: ["client"] } }).then((docs) => {
        console.log("Here data after search all clients", docs);
        res.json({ clients: docs });
    })
})
//-------------- get Client ById-------------------//
app.get("/users/client/:id", (req, res) => {
    let id = req.params.id
    User.findOne({ _id: id }).then((doc) => {
        console.log("Here client ", doc);
        doc
            ? res.json({ client: doc })
            : res.json({ message: "Carer does not exist" });
    })
})
// ---------Business logic:Delete Client By Id---------//
app.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    console.log(("Here into BL : Delete client", id));
    User.deleteOne({ _id: id }).then((response) => {
        console.log("Here response after delete", response);
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    })
})

// ---------Business logic:Confirm Status Client By Id---------//
app.get("/users/confirmeStatus/:id", (req, res) => {
    let id = req.params.id;
    let filter = { _id: id };
    let update = { status: "confirmed" };
    console.log("Here into Bl : Confirm status client", id);
    User.findOneAndUpdate(filter, update, {
        // new: true,
        rawResult: true
    }).then((response) => {
        console.log("Here response after confirmed", response);
        if (response.updatedExisting == true) {
            res.json({ isModified: true });
        } else {
            res.json({ isModified: false });
        }
    })
})
// ---------Business logic:Edit Client Profil---------//
app.put("/users/modifier/client", (req, res) => {
    let newUser = req.body;
    console.log("User", newUser);
    User.updateOne({ _id: newUser._id }, newUser).then((response) => {
        console.log("Here response after update", response);
        if (response.modifiedCount == 1) {
            res.json({ message: `User edited with success` })

        } else {
            res.json({ message: "Error" })
        }
    })
})
//-------------Search carer-------------------//
app.post("/users/search", (req, res) => {
    let search = req.body
    console.log("Here carer to search", search);
    User.find({ $or: [{ experience: { $gte: req.body.intervaleOne, $lte: req.body.intervaleTwo } }, { adress: req.body.adress }], role: "Carer" }).then((docs) => {
        console.log("Here searched carers ", docs);
        res.json({ searchCarers: docs });
    })
})
// ---------Business logic:Add Publication---------//
app.post("/publications/addPublication", (req, res) => {
    console.log("Here publication", req.body);
    let publication = new Publication({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        case: req.body.case,
        userId: ObjectId(req.body.userId),
    })
    publication.save((err, doc) => {
        if (!err) {
            console.log("here publication after added", doc);
            res.json({ message: "Publication added with success" });
        }
    });

});
// ---------Business logic:Get All Publications---------//
app.get("/publications/getAllPublications", (req, res) => {
    Publication.find().then((docs) => {
        console.log("Here all Publications", docs);
        res.json({ publications: docs });
    })
})
// ---------Business logic:Confirm Publication Status---------//
app.get("/publications/confirmePublicationStatus/:id", (req, res) => {
    let id = req.params.id;
    let filter = { _id: id };
    let update = { status: "confirmed" };
    console.log("Here into Bl : Confirm status publication", id);
    Publication.findOneAndUpdate(filter, update, {
        // new: true,
        rawResult: true
    }).then((response) => {
        console.log("Here response after confirmed", response);
        if (response.updatedExisting == true) {
            res.json({ isModified: true });
        } else {
            res.json({ isModified: false });
        }
    })
})
// ---------Business logic:Delete Publication ---------//
app.delete("/publications/delete/:id", (req, res) => {
    let id = req.params.id;
    Publication.deleteOne({ _id: id }).then((response) => {
        console.log("Here response after delete", response);
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    })
})
//-------------- get confirmed Publications-------------------//
app.get("/publications/getConfirmedPublications", (req, res) => {
    Publication.find({ "status": { $in: ["confirmed"] } }).populate('userId').then((docs) => {
        console.log("Here data confirmedPublications", docs);
        res.json({ publication: docs });
    })
})
//-------------- get clients Notifications-------------------//
app.get("/publications/getClientPublications/:id", (req, res) => {
    let id = req.params.id;
    console.log("here id", id);
    Publication.find({ "status": { $in: ["confirmed"] }, userId: id }).populate('carerId').then((docs) => {
        res.json({ clientPublications: docs });
        console.log("here pub", docs);
    });
}
)

//-------------- Edit  Publication-------------------//
app.put("/publications", (req, res) => {
    let newPub = req.body;
    console.log("here pub", newPub);
    Publication.updateOne({ _id: newPub._id }, newPub).then((response) => {
        if (response.modifiedCount == 1) {
            res.json({ message: "1" })

        } else {
            res.json({ message: "2" })
        }
    })
})
//-------------- Add  reservation-------------------//
app.post("/reservation/carer", (req, res) => {
    let reservation = new Reservation({
        idClient: ObjectId(req.body.idClient),
        idCarer: ObjectId(req.body.idCarer),
        status: req.body.status
    });
    reservation.save((err, doc) => {
        if (err) {
            res.json({ message: "Error" });
        }
        else {
            res.json({ message: " Reservation added with success " })
        }
    });

})
//-------------- get client reservation-------------------//
app.get("/reservation/client/:id", (req, res) => {
    let id = req.params.id;
    console.log("here id ", id);
    Reservation.find({ idClient: id }).populate('idCarer').then((docs) => {
        console.log("here reservation", docs);
        res.json({ reservation: docs })
    })
})
//-------------- get carer reservation-------------------//
app.get("/reservation/carer/:id", (req, res) => {
    let id = req.params.id;
    console.log("here id ", id);
    Reservation.find({ idCarer: id }).populate('idClient').then((docs) => {
        console.log("here reservation", docs);
        res.json({ reservation: docs })
    })
})
//-------------- accept reservation-------------------//
app.put("/reservation/accept", (req, res) => {
    let newReservation = req.body;
    console.log("here reservation", newReservation);
    Reservation.updateOne({ _id: newReservation._id }, newReservation).then((response) => {
        console.log('here response after modified', response);
        if (response.modifiedCount == 1) {
            res.json({ isAccept: true })

        } else {
            res.json({ isAccept: false })
        }
    })
})
//-------------- Refuse reservation-------------------//
app.put("/reservation/carer/refuse", (req, res) => {
    let reservation = req.body;
    console.log("reservation", reservation);
    Reservation.updateOne({ _id: reservation._id }, reservation).then((response) => {
        console.log("here refuse", response);
        if (response.modifiedCount == 1) {
            res.json({ isRefuse: true });
        } else {
            res.json({ isRefuse: false });
        }
    })
})

//-------------- Inscrit Validation-------------------//
app.post("/validation/users/inscrit", (req, res) => {
    console.log("Here into BL: Add User", req.body);
    bcrypt.hash(req.body.password, 8).then((crybtedPwd) => {
        console.log("Here crybted PWD", crybtedPwd);
        let validation = new Validation({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            telephone: req.body.telephone,
            password: crybtedPwd,
        });
        console.log("Here user to save", validation);
        validation.save((error, doc) => {
            console.log("Here error", error);
            console.log("Here doc", doc);

            if (error) {
                if (error.errors.email) {
                    res.json({ message: "Telephone exist" });
                }
            } else {
                res.json({ message: "Added with success" });
            }
        })
    })
})

//-------------- Login Validation-------------------//
app.post("/validation/users/login", (req, res) => {
    let user;
    console.log("Here object", req.body);
    Validation.findOne({ telephone: req.body.telephone }).then((doc) => {
        console.log("Here searched user by telephone", doc);
        if (!doc) {
            res.json({ message: "0" });
        }
        user = doc;
        return bcrypt.compare(req.body.password, doc.password);
    }).then(
        (pwdResponse) => {
            console.log("Here pwdResponse", pwdResponse);
            if (!pwdResponse) {
                res.json({ message: "1" });
                console.log("msg 1");
            } else {
                res.json({ message: "2" })
                console.log('msg2');
            }
        });

})
app.get("/validation/users/get", (req, res) => {
    Validation.find().then((docs) => {
        console.log("Here all users", docs);
        res.json({ users: docs });
    })
})
app.get("/validation/users/getById/:id", (req, res) => {
    let id = req.params.id
    Validation.findOne({ _id: id }).then((doc) => {
        console.log("Here user", doc);
        doc
            ? res.json({ user: doc })
            : res.json({ message: "user does not exist" });
    })
})
app.put("/validation/users/modifier", (req, res) => {
    let newUser = req.body;
    console.log("Here new user", req.body);
    Validation.updateOne({ _id: newUser._id }, newUser).then((response) => {
        console.log("Here response after update", response);
        if (response.modifiedCount == 1) {
            res.json({ message: `User edited with success` })

        } else {
            res.json({ message: "Error" })
        }
    })
})
//** BS Logic  Chart  *//
app.get("/users/chart", (req, res) => {
    User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ])
      .then((result) => {
        const roleCounts = {};
  
        result.forEach((group) => {
          const role = group._id;
          const count = group.count;
          roleCounts[role] = count;
        });
  
        res.json({ roleCounts });
      })
      .catch((error) => {
        console.error("ERRPOR:", error);
        res.status(500).json({ error: "ERROR" });
      });
  });
  

module.exports = app;
