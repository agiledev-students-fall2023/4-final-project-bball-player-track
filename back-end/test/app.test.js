const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Make sure this path points to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe('API Routes', function() {
    // Tests for the Login Route
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

    // Tests for the Games Route
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

    // Tests for the Teams Stats Route
    describe('Teams Stats Route', () => {
        it('should return all teams stats', function(done) {
            chai.request(app)
                .get('/api/teams/stats')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should return teams stats with correct structure', function(done) {
            chai.request(app)
                .get('/api/teams/stats')
                .end(function(err, res) {
                    expect(res.body).to.be.an('array');
                    if (res.body.length) {
                        expect(res.body[0]).to.have.all.keys('id', 'full_name', 'wins', 'losses');

                    }
                    done();
                });
        });

        it('should return 404 for non-existent routes', function(done) {
            chai.request(app)
                .get('/api/non-existent-route')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe('Player Stats Route', () => {
        it('should return player stats successfully', function() {
            this.timeout(5000); // Adjust the timeout as needed
        
            return chai.request(app)
                .get('/api/players/stats')
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    if (res.body.length) {
                        expect(res.body[0]).to.have.all.keys('fullName', 'ppg', 'apg', 'rpg', 'spg');
                    }
                });
        });
        

    });
});
