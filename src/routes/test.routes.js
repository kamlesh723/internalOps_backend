const express = require("express");
const router = express.Router();

const {verifyToken, requireRole} = require("../middlewares/auth.middlesware");


router.get("/protected", verifyToken, (req,res)=>{
    res.json({
        message:"you are unAuthorized",
        user:req.user
    });
});

router.get("/admin",verifyToken, requireRole(["admin"]),
    (req,res)=>{
        res.json({message:"Admin Access Granted"})
    }
);

module.exports = router;