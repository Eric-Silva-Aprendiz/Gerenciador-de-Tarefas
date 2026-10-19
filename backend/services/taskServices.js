const taskDao = require("../dao/tasksDao.js");
const errors = require("../errors/errors.js");
const validator = require("validator");


adicionarTarefa = async(id, objJSOM) =>{
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("Id deve ser um numero");
    } else if(!objJSOM.titulo){
        throw new errors.BadRequest("você deve nomear sua tarefa")
    } else if((!objJSOM.status) || (objJSOM.status != "pendente")){
        throw new errors.BadRequest("A tarefa só pode ser criada com o status pendente")
    }else{
        objJSOM.userId = id;
        return await taskDao.create(objJSOM);
    } 
};

atualizarTarefa = async(objJSOM, id, userId) =>{    
    if((!id) || (!userId) || (!Number.isInteger(id)) || (!Number.isInteger(userId))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } else if(!objJSOM.titulo){
        throw new errors.BadRequest("Tarefa deve ter um nome");
    } else if((!objJSOM.status) || ((objJSOM.status != "andamento") && (objJSOM.status != "concluida"))){
        throw new errors.BadRequest("A tarefa só pode ser atualizada com o status andamento ou concluida");
    }
    await retornarTarefa(userId, id)
    return await taskDao.update(objJSOM, id, userId)
};

deletarTarefa = async(id, userId) =>{
    if((!id) || (!userId) || (!Number.isInteger(id)) || (!Number.isInteger(userId))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 

    let task = await retornarTarefa(userId, id);
    return await taskDao.delete(id, userId);        
}

retornarTarefa = async(id, idtask) =>{
    if((!id) || (!idtask) || (!Number.isInteger(id)) || (!Number.isInteger(idtask))){
        throw new errors.BadRequest("os Ids devem ser numéricos");
    } 
    let task = await taskDao.find(id, idtask);
    if(!task){
        throw new errors.NotFoundError("Tarefa não encontrada");
    }else{
        return task;
    }
}
listarTarefasDeUsuario = async(id) => {    
    if((!id) || (!Number.isInteger(id))){
        throw new errors.BadRequest("o Id deve ser numérico");
    } else{
        return await taskDao.findAll(id);
    }
}

listarTarefas = async() => {
    return await taskDao.findAllTasks();    
}


module.exports = {
    adicionarTarefa,
    atualizarTarefa,
    retornarTarefa,
    listarTarefas,
    listarTarefasDeUsuario,
    deletarTarefa
}