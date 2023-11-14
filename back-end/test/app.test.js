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

describe('Games Route', () => {
    it('should return game data for correct route', function(done) {
        chai.request(app)
            .get('/games')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body[0]).to.have.property('id');
                expect(res.body[0]).to.have.property('date');
                expect(res.body[0]).to.have.property('home_team');
                expect(res.body[0]).to.have.property('visitor_team');
                done();
            });
    });
});
