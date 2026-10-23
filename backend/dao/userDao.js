

const { where } = require("sequelize");
const db = require("../models/index.js");
const bcrypt = require("bcrypt");

class UserDao {
    createAccount = async(dados) =>{
        const t = await db.sequelize.transaction();
         try {
            let account = await db.Accounts.create(dados, {transaction: t});        
            t.afterCommit(() =>{
                console.log("usuario criado");
            })
            await t.commit();
            return account;
        } catch (error) {
            await t.rollback();            
        }
       
    }

    findAccountByUserId = async(id) =>{
        return await db.Accounts.findOne({where:{userId: id}})
    }

    findAccountById = async(id) =>{
        return await db.Accounts.findByPk(id)
    }

    deleteAccount = async(id) =>{
        return await db.Accounts.destroy({where:{userId: id}})
    }

    create = async(objJSOM) => {
        const t = await db.sequelize.transaction();
        try {
            let user = await db.Users.create(objJSOM, {transaction: t});        
            t.afterCommit(() =>{
                console.log("usuario criado");
            })
            await t.commit();
            return user;
        } catch (error) {
            console.error(error)
            await t.rollback();           
        }
    }

    update = async(objJSOM, _id) => {
        const t = await db.sequelize.transaction();
        try {
            let user = await db.Users.update(objJSOM, {where:{id: _id}, individualHooks: true, transaction: t});        
            t.afterCommit(() =>{
                console.log("usuario atualizado");
            })
            await t.commit();
            return user;
        } catch (error) {
            await t.rollback();           
        }
    }

    delete = async(_id) => {
        const t = await db.sequelize.transaction();
        try {
            let user = await db.Users.destroy({where:{id: _id}, individualHooks: true, transaction: t});    
            t.afterCommit(() =>{            
                console.log("usuario deletado");
            })
            await t.commit();
            return user;
        } catch (error) {
            await t.rollback();           
        }
    }

    findByEmailSenha = async(data) =>{
        const t = await db.sequelize.transaction();
        try {        
            let user = await db.Users.findOne({where:{email: data.email}, individualHooks: true, attributes: ["id", "email", "name", "password", "tipo"], transaction: t});                                        
            if(user){
                const valido = await bcrypt.compare(data.password, user.password)                
                if(valido){
                    await t.commit();
                    return {"id": user.id,"name": user.name, "email": user.email, "tipo": user.tipo};
                } else{            
                    await t.rollback();
                    return null;
                }
            }else{
                await t.rollback();
                return null;
            }            
        } catch (error) {
            await t.rollback();            
        }
    } 

    findByEmail = async(email) =>{
        return await db.Users.findOne({where:{email: email}, attributes: ["id", "email", "name"]});
    }

    count = async() => {
        return await db.Users.count();
    }

    findAll = async(page, quantidadeUsuarios) => {
        const limit = 10;
        const quantidadePaginas = Math.ceil(quantidadeUsuarios / limit);
        const offset = (page - 1) * limit;
        const usuarios = await db.Users.findAll({
            limit: limit,
            offset: offset,
            attributes: ["id", "name", "email", "createdAt", "updatedAt"]});
        
        return {usuarios, quantidadePaginas};
    }

    find = async(id) => {
        return await db.Users.findByPk(id,{attributes: ["id", "name", "email", "createdAt", "updatedAt"]})
    }
}

module.exports = new UserDao();