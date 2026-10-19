const { where } = require("sequelize");
const db = require("../models/index.js");

class TaskDao{
    create = async(objJSOM) =>{
        const t = await db.sequelize.transaction();
        try {
            let task = await db.Tasks.create(objJSOM, {transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("tarefa criada");
                console.log();
            })
            await t.commit();
            return task;
        } catch (error) {
            await t.rollback();            
        }
    }

    update = async(objJSOM, _id, _userId) => {
        const t = await db.sequelize.transaction();
        try {
            let task = await db.Tasks.update(objJSOM, {where:{id: _id, userId: _userId}, individualHooks: true ,transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("tarefa atualizada");
                console.log();
            })
            await t.commit();
            return task;
        } catch (error) {
            await t.rollback();            
        }
    }

    delete = async(_id, _userId) =>{
        const t = await db.sequelize.transaction();
        try {
            let task = await db.Tasks.destroy({where:{id: _id, userId: _userId}, individualHooks: true, transaction: t});
            t.afterCommit(() =>{
                console.log();
                console.log("tarefa deletada");
                console.log();
            })
            await t.commit()
            return task;
        } catch (error) {
            await t.rollback();
            throw error;
        }    
    }

    find = async(_id, idtask) =>{
        return await db.Tasks.findOne({where: {userId: _id, id: idtask}});
    }

    findOne = async (_id) => {
        return await db.Tasks.findOne({where: {userId: _id}})
    }

    deleteAll = async(_id) =>{
        return await db.Tasks.destroy({where: {userId: _id}})
    }

    findAll = async(id) => {
        return await db.Tasks.findAll({where:{userId: id}});
    }

    findAllTasks = async() => {
        return await db.Tasks.findAll();
    }
}

module.exports = new TaskDao();