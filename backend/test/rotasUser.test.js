const server = require('../index.js');
const request = require('supertest');
const tm = require('../manager/token_manager.js');
const { response } = require('express');

jest.setTimeout(50000)
let timer = setTimeout(()=>{},50000);
timer.unref()

let usuarioId;
let token;
let preUsuarioId;


beforeAll(
    async () =>{        

        const response = await request(server)
            .post(`/api/users`)
            .send({
                name: "Jon Doe", 
                email: "Jon@gmail.com", 
                password: "1s234f56yu"
            }); 
                
        preUsuarioId = response.body.user.id

    console.log(response.body)

})

afterAll(async() =>{
    const response = await request(server)
        .delete(`/api/users`)
        .set("Cookie", `access-token=${tm.sign(preUsuarioId)}`) 
    
    
    server.close();
})

describe('teste de rotas de usuário', () => {

    it("cadastro de user", async() =>{
        const response = await request(server)
            .post(`/api/users`)
            .send({
                name: "eric",
                email: "eric@gmail.com",
                password: "1234567a89101112"
            })  
            
            usuarioId = response.body.user.id
            token = tm.sign(usuarioId)        

            expect(response.status).toBe(201);            
            expect(response.body.mensagem).toBe("Usuario criado com sucesso");
    });

    it("cadastro de email duplicado", async() =>{
        const response = await request(server)
            .post(`/api/users`)
            .send({
                name: "rose",
                email: "eric@gmail.com",
                password: "1234567891sdf"
            })            

            expect(response.status).toBe(409);
            expect(response.body.mensagem).toBe("O Email informado ja esta sendo utilizado");            
    });

    it("cadastro de dados invalidos", async() =>{
        const response = await request(server)
            .post(`/api/users`)
            .send({
                name: null,
                email: null,
                password: null
            })

            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("Dados inválidos ou inexistemtes");            
    });

    it("cadastro de senha invalida", async() =>{
        const response = await request(server)
            .post(`/api/users`)
            .send({
                name: "Robson",
                email: "Robson@gmail.com",
                password: "092536842"
            })            
            

            expect(response.status).toBe(422);
            expect(response.body.mensagem).toBe("A senha deve ter no mínimo 8 caracteres contendo números e letras");            
    });
    
    it("busca de usuário", async() =>{        
        const response = await request(server)
            .get(`/api/users/session`)
            .set("Cookie", `access-token=${token}`);       
            
            

            expect(response.status).toBe(200);
            expect(response.body.auth).toBe(true);
            expect(response.body.user.name).toBe("eric");
    });

    it("busca de usuário inexistente", async() =>{
        const response = await request(server)
            .get(`/api/users/session`)
            .set("Cookie", `access-token=${tm.sign(-1)}`);       
            
            

            expect(response.status).toBe(404);
            expect(response.body.mensagem).toBe("Usuario não encontrado");            
    });

    it("busca de usuário com id inválido", async() =>{
        const response = await request(server)
            .get(`/api/users/session`)
            .set("Cookie", `access-token=${tm.sign('a')}`);  
            
            
            

            expect(response.status).toBe(400);
            expect(response.body.mensagem).toBe("Id deve ser um numero");            
    });

    it("login de user", async() =>{
        const response = await request(server)
            .post(`/api/users/signin`)
            .send({
                email: "eric@gmail.com",
                password: "1234567a89101112"
            })

        expect(response.body.user.name).toBe("eric");
        expect(response.body.user.email).toBe("eric@gmail.com");
        expect(response.body.auth).toBe(true);
    });

    it("login com senha inválida", async() =>{
        const response = await request(server)
            .post(`/api/users/signin`)
            .send({
                email: "eric@gmail.com",
                password: "123456789101112"
            })

        expect(response.status).toBe(422)        
        expect(response.body.mensagem).toBe('A senha deve ter no mínimo 8 caracteres contendo números e letras');        
    });

    it("login de user sem informações", async() =>{
        const response = await request(server)
            .post(`/api/users/signin`)
            .send({
                email: null,
                password: null
            })

        expect(response.status).toBe(400)        
        expect(response.body.mensagem).toBe('Dados inválidos ou inexistemtes');        
    });

    it("login de user inexistente", async() =>{
        const response = await request(server)
            .post(`/api/users/signin`)
            .send({
                email: "naoexiste@gmail.com",
                password: "1234567a89101112"
            })

        expect(response.status).toBe(404)        
        expect(response.body.mensagem).toBe('usuário não encontrado');        
    });

    it("atualizar user", async() =>{
        const responseUpdate = await request(server)
            .put(`/api/users/`)
            .set("Cookie", `access-token=${token}`)       
            .send({
                name: "jone",
                email: "naoexiste@gmail.com",
                password: "1wf43wd5"          
            })
        
        const responseUser = await request(server)
            .get(`/api/users/session`)
            .set("Cookie", `access-token=${token}`);

        expect(responseUpdate.status).toBe(200);       
        expect(responseUpdate.body.mensagem).toBe('Usuario atualizado com sucesso');
        expect(responseUser.body.user.name).toBe('jone')

    });

    it("atualizar user com email pré-existente", async() =>{
        const responseUpdate = await request(server)
            .put(`/api/users/`)
            .set("Cookie", `access-token=${token}`)       
            .send({
                name: "jone",
                email: "Jon@gmail.com",
                password: "1wf43wd5"                   
            })

            
            
        expect(responseUpdate.status).toBe(409);       
        expect(responseUpdate.body.mensagem).toBe(`o Email informados ja esta sendo utilizado`);        

    });

    it("atualizar user com dados inválidos", async() =>{
        const responseUpdate = await request(server)
            .put(`/api/users/`)
            .set("Cookie", `access-token=${token}`)       
            .send({
                name: null,
                email: null    
            })
            
        expect(responseUpdate.status).toBe(400);       
        expect(responseUpdate.body.mensagem).toBe("Dados inválidos ou inexistemtes");        

    });

    it("deletar usuário", async() =>{
        const responseUpdate = await request(server)
            .delete(`/api/users/`)
            .set("Cookie", `access-token=${token}`)                   
            
        expect(responseUpdate.status).toBe(200);       
        expect(responseUpdate.body.mensagem).toBe("usuario deletado com sucesso");        

    });

    it("deletar usuário inexistente", async() =>{
        const responseUpdate = await request(server)
            .delete(`/api/users/`)
            .set("Cookie", `access-token=${tm.sign(-1)}`)                   
            
        expect(responseUpdate.status).toBe(404);       
        expect(responseUpdate.body.mensagem).toBe("Usuario não encontrado");        

    });

    it("deletar usuário com id inválido", async() =>{
        const responseUpdate = await request(server)
            .delete(`/api/users/`)
            .set("Cookie", `access-token=${tm.sign('a')}`)                   
            
        expect(responseUpdate.status).toBe(400);       
        expect(responseUpdate.body.mensagem).toBe("Id deve ser um numero");        

    });  
})