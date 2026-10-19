const server = require('../index.js');
const request = require('supertest');
const tm = require('../manager/token_manager.js');
const { response } = require('express');

jest.setTimeout(50000);
let timer = setTimeout(()=>{},50000);
timer.unref();

let preUsuarioId;
let tokem;
let taskId;

beforeAll(async () => {
        const response = await request(server)
            .post('/api/users')
            .send({
                name: "Test user", 
                email: "Test@gmail.com", 
                password: "dfe34tg6"
            }); 
        
        preUsuarioId = response.body.user.id
        tokem = tm.sign(preUsuarioId)

});


afterAll(async () =>{
    const response = await request(server)
        .delete(`/api/users`)
        .set("Cookie", `access-token=${tokem}`)

    server.close();
});

describe("teste de rotas de tarefas", () => {

    it("criação de tarefas", async() =>{
        const response = await request(server)
            .post("/api/users/tasks")
            .set("Cookie", `access-token=${tokem}`)
            .send({            
                titulo: "tarefa teste",
                status: "pendente",
                createdAt: new Date(),
                updatedAt: new Date()
            })            

            taskId = response.body.id            

            expect(response.status).toBe(201);            
            expect(response.body.userId).toBe(preUsuarioId);
            expect(response.body.titulo).toBe("tarefa teste");
            expect(response.body.status).toBe("pendente");

    })

    it("criação de tarefas com id integer", async() =>{
        const response = await request(server)
            .post("/api/users/tasks")
            .set("Cookie", `access-token=${tm.sign("a")}`)
            .send({            
                titulo: "tarefa teste",
                status: "pendente",
                createdAt: new Date(),
                updatedAt: new Date()
            })                                   

            expect(response.status).toBe(400);            
            expect(response.body.mensagem).toBe("Id deve ser um numero");

    })

    it("criação de tarefas sem titulo", async() =>{
        const response = await request(server)
            .post("/api/users/tasks")
            .set("Cookie", `access-token=${tokem}`)
            .send({            
                titulo: null,
                status: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })                                   

            expect(response.status).toBe(400);            
            expect(response.body.mensagem).toBe("você deve nomear sua tarefa");

    })

    it("criação de tarefas com status inadequado", async() =>{
        const response = await request(server)
            .post("/api/users/tasks")
            .set("Cookie", `access-token=${tokem}`)
            .send({            
                titulo: "tarefa teste",
                status: "indeciso",
                createdAt: new Date(),
                updatedAt: new Date()
            })                                 

            expect(response.status).toBe(400);            
            expect(response.body.mensagem).toBe("A tarefa só pode ser criada com o status pendente");

    })

    it("consulta de tarefas", async()=> {
        const response = await request(server)
            .get("/api/users/tasks")
            .set("Cookie", `access-token=${tokem}`)     
                        

            expect(response.status).toBe(200);            
            expect(response.body[0].userId).toBe(preUsuarioId);
            expect(response.body[0].titulo).toBe("tarefa teste");
            expect(response.body[0].status).toBe("pendente");

    })

    it("consulta de tarefas com id integer", async()=> {
        const response = await request(server)
            .get("/api/users/tasks")
            .set("Cookie", `access-token=${tm.sign("a")}`)     
                        

            expect(response.status).toBe(400);            
            expect(response.body.mensagem).toBe("o Id deve ser numérico");            

    })
            
    it("atualização de tarefas", async()=> {                   
        const response = await request(server)
            .put(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tokem}`)
            .send({            
                titulo: "tarefa atualizada",
                status: "andamento",
                createdAt: new Date(),
                updatedAt: new Date()
            })        
            
        const responseTask = await request(server)
            .get(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tokem}`)
        
        console.log(responseTask.body)

            expect(response.status).toBe(200);
            expect(responseTask.status).toBe(200);                    
            expect(responseTask.body.userId).toBe(preUsuarioId);
            expect(responseTask.body.titulo).toBe("tarefa atualizada");
            expect(responseTask.body.status).toBe("andamento");
    })

    it("atualização de tarefas com id integer", async() =>{
        const response = await request(server)
            .put(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tm.sign("a")}`)
            .send({            
                titulo: "tarefa atualizada",
                status: "andamento",
                createdAt: new Date(),
                updatedAt: new Date()
            })                              

            expect(response.status).toBe(400);            
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");

    })

    it("atualização de tarefas sem titulo", async() =>{
        const response = await request(server)
            .put(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tokem}`)
            .send({            
                titulo: null,
                status: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })                                    

            expect(response.status).toBe(400);            
            expect(response.body.mensagem).toBe("Tarefa deve ter um nome");

    })

    it("atualização de tarefa com status inadequado", async() =>{
        const response = await request(server)
            .put(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tokem}`)
            .send({            
                titulo: "tarefa teste",
                status: "indeciso",
                createdAt: new Date(),
                updatedAt: new Date()
            })            

            expect(response.status).toBe(400);            
            expect(response.body.mensagem).toBe("A tarefa só pode ser atualizada com o status andamento ou concluida");

    })

    it("deleção de tarefas", async()=> {
        const response = await request(server)
            .delete(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tokem}`)            
            
        const responseTask = await request(server)
            .get(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tokem}`)                    

            expect(response.status).toBe(200);                        
            expect(responseTask.status).toBe(404);
            expect(responseTask.body.mensagem).toBe("Tarefa não encontrada");
    })

    it("deleção de tarefas com id integer", async()=> {
        const response = await request(server)
            .delete(`/api/users/tasks/${taskId}`)
            .set("Cookie", `access-token=${tm.sign("a")}`)                                                    

            expect(response.status).toBe(400);                                    
            expect(response.body.mensagem).toBe("os Ids devem ser numéricos");
    })

    it("deleção de tarefa inexistente", async()=> {
        const response = await request(server)
            .delete(`/api/users/tasks/${-1}`)
            .set("Cookie", `access-token=${tokem}`)                                                    

            expect(response.status).toBe(404);                                    
            expect(response.body.mensagem).toBe("Tarefa não encontrada");
    })
})