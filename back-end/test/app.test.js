const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Login Route', function() {

    it('should return Welcome message for correct credentials', function(done) {
        chai.request(app)
            .post('/login')
            .send({ username: 'user1', password: '1' })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Welcome');
                done();
            });
    });

    it('should return error for incorrect credentials', function(done) {
        chai.request(app)
            .post('/login')
            .send({ username: 'user1', password: 'HELLO' })
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message', 'Incorrect username or password');
                done();
            });
    });
});
