const express = require("express");
const router = express.Router();
const tm = require("../manager/token_manager.js");
const userServices = require("../services/userServices.js");


//Rotas de Usuário

router.post('/signin', async(req, res)=>{    
    try {        
        let {user, tokem, adminTokem} = await userServices.login(req.body);          
        res.cookie("access-token", tokem, {httpOnly: true, secure: false, sameSite: "lax"});     
        res.cookie("admin-access-token", adminTokem, {httpOnly: true, secure: false, sameSite: "lax"});        
        return res.status(200).json({auth: true, user});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
})

router.post('/git/user', async(req,res)=>{
    try {
        const {githubAccessToken} = req.body;                    
        
        let account = await userServices.obterUsuarioGit(githubAccessToken);

        let {tokem} = await userServices.adicionarUsuarioGit(account);        
        res.cookie("access-token", tokem, {httpOnly: true, secure: false, sameSite: "lax"}); 
        return res.status(200).json({auth: true});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }    
})

router.get('/logout', tm.verifyJWTCookie, tm.verifyAdminJWTCookie, async (req, res) => {
  try {    
    res.clearCookie("access-token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
     
    res.clearCookie("admin-access-token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({ auth: false, message: "Logout realizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.get("/session", tm.verifyJWTCookie, async (req, res) => {
  try {    
    const user = await userServices.retornarUsuario(req.userId);    
    return res.status(200).json({auth: true, user});
  } catch (error) {
     if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
    console.error(error);
    res.status(500).json({ auth: false, mensagem: "Erro interno no servidor" });
  }
});

router.post('/', async(req,res) =>{    
    try {        
        let user = await userServices.adicionarUsuario(req.body);        
        res.status(201).json({mensagem: "Usuario criado com sucesso"});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
})

router.put('/', tm.verifyJWTCookie ,async(req,res) =>{
    try {        
        let dados = await userServices.atualizarUsuario(req.body, req.userId);
        res.status(200).json({mensagem: "Usuario atualizado com sucesso"});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
})

router.delete("/", tm.verifyJWTCookie ,async(req, res) =>{
    try {        
        let dados = await userServices.deletarUsuario(req.userId);
        res.status(200).json({mensagem: "usuario deletado com sucesso"});
    } catch (error) {
        if(error.statusCode){return res.status(error.statusCode).json({mensagem: error.message});}
        console.error(error);
        res.status(500).json({mensagem: "erro interno no servidor"});
    }
})




module.exports = router;