const jwt = require("jsonwebtoken");
const secret = "N9$vQ2!mLp7#Xr8@Za5^Tw1&Kc4*Hy0=Fu6!Bd3%Pe9@Js2#Mn8";
const adminSecret = "Gp4$sl5^Jkl4@dQ5^jF4#zX0=lO1!Nje8*klS5$Jkm3&kJ2@";





class TokenManager{
    
    verifyJWTCookie = (req, res, next) =>{        
        const token = req.cookies["access-token"];         
        if(!token) return res.status(401).json({auth: false , mensagem: "Token não foi recebido"});
            jwt.verify(token, secret, (err, decoded) =>{
            if(err) return res.status(500).json({auth: false, mensagem: "tokem expirou"});
            req.userId = decoded.id;                    
            next()
        })
           
    }

    verifyAdminJWTCookie = (req, res, next) =>{        
        const token = req.cookies["admin-access-token"];       
        if(!token) return res.status(401).json(
            {auth: false , mensagem: "admin Token não foi recebido"});
        jwt.verify(token, adminSecret, (err, decoded) =>{
            if(err) return res.status(500).json({auth: false, mensagem: "tokem expirou"});
            req.userId = decoded.id;                    
            next()
        })    
    }

    sign = (id) => {return jwt.sign({id}, secret, {expiresIn: "3h"});};
    signAdmin = (id) => {return jwt.sign({id}, adminSecret, {expiresIn: "3h"})}
}

module.exports = new TokenManager()