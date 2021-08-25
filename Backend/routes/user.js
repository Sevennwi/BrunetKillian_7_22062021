const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.put("/:id", auth, multer, userCtrl.modifyUser);

router.delete("/:id", auth, userCtrl.deleteUser);

router.get("/:id", auth, userCtrl.getOneUser);

router.get("/", auth, userCtrl.getAllUsers);

module.exports = router;
