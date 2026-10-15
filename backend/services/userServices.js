const userDao = require("../dao/userDao.js");
const validator = require("validator");
const errors = require("../errors/errors.js");
const tm = require("../manager/token_manager.js");


listarUsuarios = async() =>{
    return await userDao.findAll();
}

constarUsuarios = async() =>{
    return await userDao.count();
}

// TESTADO V
validarEmail = async(methodo, email, id_usuario) => {
    let emailJaExistente;
    if(methodo == "criar"){
        if((!email) || (Number.isInteger(email)) || (!validator.isEmail(email))){
            throw new errors.BadRequest("Dados inválidos ou inexistemtes") //V
        }
        emailJaExistente = await userDao.findByEmail(email)
        if(emailJaExistente){
            return true;
        } else{
            return false;
        }
    } else if(methodo == "alterar"){
        if((!email) || (Number.isInteger(email)) || (!validator.isEmail(email)) || (!id_usuario) || (!Number.isInteger(id_usuario))){
            throw new errors.BadRequest("Dados inválidos ou inexistemtes") //v
        }
        emailJaExistente = await userDao.findByEmail(email)
        if((emailJaExistente) && (emailJaExistente.id != id_usuario)){
            return true;
        } else {
            return false;
        }
    }
}

// TESTADO V//
adicionarUsuario = async(dados) =>{  
    emailPreExistente = await validarEmail("criar", dados.email);    
    if(emailPreExistente){
        throw new errors.ConflictError(`O Email informado ja esta sendo utilizado`); //V
    } else{
        if((!dados.name)  || (Number.isInteger(Number(dados.name))) || (!dados.email) || (Number.isInteger(Number(dados.email)))){            
            throw new errors.BadRequest("Dados inválidos ou inexistemtes") //V
        } else if ((!dados.password) || (Number.isInteger(Number(dados.password))) ||(dados.password.length < 8)){
            throw new errors.ValidationError("A senha deve ter no mínimo 8 caracteres contendo números e letras") //V
        } else{               
            let usuario = await userDao.create({"name": dados.name, "password": dados.password, "email": dados.email, tipo: "Cliente" ,"createdAt": new Date(), "updatedAt": new Date()});            
            return {"id": usuario.id, "name": usuario.name, "email": usuario.email}    
        }       
    }
}

adicionarUsuarioGit = async(dados) =>{    
    let user = await userDao.findByEmail(dados.email)    
    if(user){
        let accountPreExistente = await userDao.findAccountByUserId(user.id);
        if(accountPreExistente){
            const tokem = tm.sign(accountPreExistente.userId);
            return {"tokem": tokem};
        }else{
            let novoAccount = await userDao.createAccount({"userId": user.id, "provider": dados.provider, "providerAccountId": dados.providerAccountId});            
            const tokem = tm.sign(novoAccount.userId);
            return {"tokem": tokem};
        }
    }else{
        let usuario = await userDao.create({"name": dados.name, "email": dados.email, "tipo": "Cliente"});
        let NovoAccount = await userDao.createAccount({"userId": usuario.id, "provider": dados.provider, "providerAccountId": dados.providerAccountId});
        const tokem = tm.sign(NovoAccount.userId);
        return {"tokem": tokem};
    }
}

obterUsuarioGit = async(accessToken) =>{
    const responseUser = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2026-03-10"
            }
        });

    const responseUserEmail = await fetch("https://api.github.com/user/emails", {
            method: "GET",
            headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2026-03-10"
            }
        });

        const githubUser = await responseUser.json();
        const githubUserEmail = await responseUserEmail.json();        
             

        return {"name": githubUser.login, "email": githubUserEmail[0].email, "provider": "GitHub", "providerAccountId": githubUser.id};
}


// TESTADO v 
atualizarUsuario = async(dados, id_usuario) => {
    await retornarUsuario(id_usuario);
    let emailPreExistente = await validarEmail("alterar", dados.email, id_usuario);
    if(emailPreExistente){
        throw new errors.ConflictError(`o Email informados ja esta sendo utilizado`)} //V
    if((!dados.name)  || (Number.isInteger(Number(dados.name))) || (!dados.email) || (Number.isInteger(Number(dados.email)))){
        throw new errors.BadRequest("Dados inválidos ou inexistemtes") //V
    } else if ((!dados.password) || (Number.isInteger(Number(dados.password))) ||(dados.password.length < 8)){
        throw new errors.ValidationError("As passwords devem ter no mínimo 8 caracteres.")
    } else{ 
        id_usuario = Number.parseInt(id_usuario);
        let usuario = {"name": dados.name, "email": dados.email, "password": dados.password, "updatedAt": new Date()}
        return await userDao.update(usuario, id_usuario);
    }
}


retornarUsuario = async(id) =>{
    id = Number.parseInt(id);    
    let usuario;
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("Id deve ser um numero");
    }else{
        usuario = await userDao.find(id);
    }
    if((!usuario) || (usuario == null) || (usuario == undefined)){
        throw new errors.NotFoundError("Usuario não encontrado");
    } else {
        return {"name": usuario.name,"email": usuario.email};
    }
}

retornarUsuarioCompleto = async(id) =>{
    id = Number(id);       
    let usuario;
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("Id deve ser um numero");
    }else{
        usuario = await userDao.find(id);
    }
    if(!usuario){
        throw new errors.NotFoundError("Usuario não encontrado");
    } else {
        return usuario;
    }
}

deletarUsuario = async(id) => {
    await retornarUsuario(id);        
    return await userDao.delete(id);
}

// TESTADO V
login = async(data) => {
    
    if((!data.email) || (Number.isInteger(Number(data.email)))){
        throw new errors.BadRequest("Dados inválidos ou inexistemtes"); //V
    } else if((!data.password) || (Number.isInteger(Number(data.password))) || data.password.length < 8) {
        throw new errors.ValidationError("A senha deve ter no mínimo 8 caracteres contendo números e letras"); //V
    }
    const user = await userDao.findByEmailSenha(data);       
    if(!user){
        throw new errors.NotFoundError("usuário não encontrado"); //V
    }else if(user.tipo == "Cliente"){
        const tokem = tm.sign(user.id);
        return {"user":{"email": user.email, "name": user.name}, "tokem": tokem};
    }else if(user.tipo == "administrador"){
        const adminTokem = tm.signAdmin(user.id);        
        const tokem = tm.sign(user.id);
        return {"user":{"email": user.email, "name": user.name}, "tokem": tokem, "adminTokem": adminTokem};         
    }
    
}


module.exports ={
    login,    
    listarUsuarios,
    adicionarUsuario,
    atualizarUsuario,
    retornarUsuario,
    retornarUsuarioCompleto,
    deletarUsuario,
    constarUsuarios,
    adicionarUsuarioGit,
    obterUsuarioGit
}
