var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
// Used to make a http client request to our server
var request = require('request');
var config = require('config');

// Use config module to create a local domain (http://;localhost:3000)
global.domain = 'http://' + config.host + ':' + config.port;

// Contains the modules to be tested; Separates the modules
describe('---Testing the task list api---', ()=>{
  // Contains the actual test scenarios (callback); done parameter controls the end of the test scenario
  it('GET: Task list', (done)=>{

    // Set the request parameters we're going to use to make the post request
    var options = {
      url: domain + '/task',
      headers: {
        "Content-Type": "application/json"
      },
      json : {
        task: "up"
      }
    };

    // Make the post request using the options object
    request.post(options, function(error, response, body){
      // Assertion test cases
      // 'Should' be conditions
      response.statusCode.should.equal(200);
      // 'Expected' conditions
      expect(body).to.be.a('array');
      expect(body).to.include(options.json.task);
      done();
    });

  });
})


/*
describe('---Testing the task list api---', () => {
  it('POST: Task in list', (done) =>{
    done();
  });
})
*/
