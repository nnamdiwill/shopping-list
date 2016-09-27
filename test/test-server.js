var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on GET', function(done) {


        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    it('should add an item on PUT', function(done) {
        chai.request(app)
            .put('/items/3')
            .send({
                'id': 3,
                'name': 'Kaleb'
            })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;

                done();
            });
    });

    it('should delete an item on DELETE', function(done) {
        chai.request(app)
            .delete('/items/3')
            .end(function(err, res) {
                //should.equal(err, null);
                res.should.have.status(404);
                res.body.should.have.property('_id');

                done();
            });
    });

    after(function(done) {
        Item.remove(function() {
            done();

        });
    });
});