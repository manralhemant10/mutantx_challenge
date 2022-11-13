let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

let email="newemail@gmail.com",password="newemail",wrongPass="qwe",
token="",
invalidEmail="random";

describe('game API', () => {

    describe("GET /game/score", () => {
        it("It should GET all the scores", (done) => {
            chai.request(server)
                .get("/game/score")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data').a('array');
                done();
                });
        });
    });


   
    describe("GET /game/score/:userid", () => {
        it("It should GET a score by ID", (done) => {
            const userid = "hemant@gmail.com";
            chai.request(server)                
                .get("/game/score/" + userid)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data').property('score_id');
                    response.body.should.have.property('data').property('email');
                    response.body.should.have.property('data').property('score');
                done();
                });
        });

        it("It should NOT GET a score by ID", (done) => {
            const userid = "hemantnot@gmail.com";
            chai.request(server)                
                .get("/game/score/" + userid)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg').eq("No such user exists");
                done();
                });
        });

    });
    
   
    describe("GET /game/hist", () => {
        it("It should GET all the scores history", (done) => {
            chai.request(server)
                .get("/game/hist")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data').a('array');
                done();
                });
        });
    });


    describe("GET /game/hist/:userid", () => {
        it("It should GET all score hist by ID", (done) => {
            const userid = "hemant@gmail.com";
            chai.request(server)                
                .get("/game/hist/" + userid)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data').a('array');
                done();
                });
        });

        it("It should NOT GET a score hist by ID", (done) => {
            const userid = "hemantnot@gmail.com";
            chai.request(server)                
                .get("/game/hist/" + userid)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg').eq("No such user exists");
                done();
                });
        });

    });

     describe("POST /auth/signup", () => {
        it("It should POST a new user", (done) => {
            const userobj = {
               email,
               password
            };
            chai.request(server)                
                .post("/auth/signup")
                .send(userobj)
                .end((err, response) => {
                    response.should.have.status(201);           

                done();
                });
        });

        it("It should not POST a new user", (done) => {
            const userobj = {
               email,
               password
            };
            chai.request(server)                
                .post("/auth/signup")
                .send(userobj)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('err').property('msg').eq("User already Exist");

                done();
                });
        });

         it("It should not POST a new user", (done) => {
            const userobj = {
               email:invalidEmail,
               password:password
            };
            chai.request(server)                
                .post("/auth/signup")
                .send(userobj)
                .end((err, response) => {
                    response.should.have.status(400);           
                    response.body.should.have.property('err').property('msg').eq("Invalid Email");
                done();
                });
        });
    });

    describe("POST /auth/login", () => {

        it("It should Log in ", (done) => {
            const userobj = {
               email,
               password
            };
            chai.request(server)                
                .post("/auth/login")
                .send(userobj)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('data').property('token');
                    token = response.body.data.token
                done();
                });
        });

        it("It should not log in", (done) => {
            const userobj = {
               email,
               password:wrongPass
            };
            chai.request(server)                
                .post("/auth/login")
                .send(userobj)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('err').property('msg').eq("User and password does not match");

                done();
                });
        });

    });

    describe("POST /game/score", () => {
       
        it("It should POST a new score", (done) => {
            const task = {
               score:20
            };
            chai.request(server)                
                .post("/game/score")
                .set('Authorization',"Bearer "  + token)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data').property('score_id');
                    response.body.should.have.property('data').property('email');
                    response.body.should.have.property('data').property('score');
                    response.body.should.have.property('data').property('_rank');

                done();
                });
        });

        it("It should NOT POST a new score", (done) => {
            const task = {
               score:20
            };
             chai.request(server)                
                .post("/game/score")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(403);
                done();
                });
        });

        it("It should NOT POST a new score", (done) => {
          const task = {
               score:20
            };
            chai.request(server)                
                .post("/game/score")
                .set('Authorization','Bearer '+"some random string or wrong signed jwt")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                });
        });
    });

    
});


