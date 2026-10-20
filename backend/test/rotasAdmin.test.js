const server = require('../index.js');
const request = require('supertest');
const tm = require('../manager/token_manager.js');
const { response } = require('express');

jest.setTimeout(50000)
let timer = setTimeout(()=>{},50000);
timer.unref()


let administradorAdminTokem;
let administradorClienteTokem;
let userClienteTokem;
let preUsuarioId;


beforeAll(async () =>{
        const responseAdmin = await request(server)
            .post(`/api/users`)
            .send({
                name: "Jay", 
                email: "Jay@gmail.com", 
                password: "1sws3rr6yu"
            });

        const responseClient = await request(server)
            .post(`/api/users`)
            .send({
                name: "Joseph", 
                email: "Joseph@gmail.com", 
                password: "1s234f56yu"
            }); 

        preAdminId = responseAdmin.body.user.id  
        preUsuarioId = responseClient.body.user.id       
        administradorAdminTokem = tm.signAdmin(preAdminId)
        administradorClienteTokem = tm.sign(preAdminId)
        userClienteTokem = tm.sign(preUsuarioId)
    }        
)

afterAll(async() =>{
    const responseClient = await request(server)
        .delete(`/api/users`)
        .set("Cookie", `access-token=${userClienteTokem}`) 
    


    const responseAdmin = await request(server)
        .delete(`/api/users`)
        .set("Cookie", `access-token=${administradorClienteTokem}`) 
    
    server.close();
})

describe('teste de rotas de admin', () => {
    it("login de admin", async () =>{
        const response = await request(server)
            .post(`/api/users/signin`)
            .send({
                email: "Jay@gmail.com",
                password: "1sws3rr6yu"
            })            

        expect(response.status).toBe(200)
        expect(response.body.auth).toBe(true)        
        expect(response.body.user.name).toBe("Jay")
        expect(response.body.user.email).toBe("Jay@gmail.com")
    })

    it("login de admin com dados invalidos", async () =>{
        const response = await request(server)
            .post(`/api/users/signin`)
            .send({
                email: null,
                password: null
            })
            

        expect(response.status).toBe(400)        
        expect(response.body.mensagem).toBe("Dados inválidos ou inexistemtes")
        
    })

    it("login de admin com senha invalida", async () =>{
        const response = await request(server)
            .post(`/api/users/signin`)
            .send({
                email: "Jon@gmail.com",
                password: "1s"
            })
            

        expect(response.status).toBe(422)    
        expect(response.body.mensagem).toBe("A senha deve ter no mínimo 8 caracteres contendo números e letras")                
    })
    
    it("listar usuários", async () =>{
        const response = await request(server)
            .get(`/api/users`)
            .set("Cookie", `admin-access-token=${administradorAdminTokem}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    it("listar um usuario especifico", async () =>{        
        const response = await request(server)
            .get(`/api/users/${preUsuarioId}`)
            .set("Cookie", `admin-access-token=${administradorAdminTokem}`)            

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Joseph")
        expect(response.body.email).toBe("Joseph@gmail.com")
    })

    it("listar um usuario especifico com id integer", async () =>{
        const response = await request(server)
            .get(`/api/users/${"a"}`)
            .set("Cookie", `admin-access-token=${administradorAdminTokem}`)

        expect(response.status).toBe(400)
        expect(response.body.mensagem).toBe("Id deve ser um numero")        
    })

    it("listar um usuario inexistente", async () =>{
        const response = await request(server)
            .get(`/api/users/${-1}`)
            .set("Cookie", `admin-access-token=${administradorAdminTokem}`)

        expect(response.status).toBe(404)
        expect(response.body.mensagem).toBe("Usuario não encontrado")        
    })

    it("listar tarefas de um usuario especifico", async () =>{        
        const response = await request(server)
            .get(`/api/users/tasks/user/${preUsuarioId}`)
            .set("Cookie", `admin-access-token=${administradorAdminTokem}`)        

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    it("listar tarefas de um usuario especifico com id integer", async () =>{
        const response = await request(server)
            .get(`/api/users/tasks/user/${"a"}`)
            .set("Cookie", `admin-access-token=${administradorAdminTokem}`)

        expect(response.status).toBe(400)
        expect(response.body.mensagem).toBe("o Id deve ser numérico")
    })

})