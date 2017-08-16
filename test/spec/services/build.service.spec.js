
'use strict';
describe('app/scripts/services/build.service.js', function () {

  var httpbackend, service;

  beforeEach(module('crossoverApp'));


  beforeEach(inject(function (buildService, $httpBackend) {
    service = buildService;
    httpbackend = $httpBackend;
  }));

  it('Should return build detail content', function () {

    var response = {
      "buildDetails": [
        {
          "changes": "Tenrox-R1_12345",
          "owner": "",
          "dateStarted": "",
          "timeStarted": "",
          "status": "Pending"
        },
        {
          "changes": "432462",
          "owner": "jtuck",
          "dateStarted": "4/18/2014",
          "timeStarted": "12:12 pm",
          "status": "Running"
        },
        {
          "changes": "432461",
          "owner": "samy",
          "dateStarted": "4/18/2014",
          "timeStarted": "10:53 am",
          "status": "Rejected",
          "metrics": {
            "test": "64",
            "maintainability": "53",
            "security": "64",
            "workmanship": "72"
          },
          "build": {
            "dateStarted": "4/17/2014",
            "timeStarted": "10:46am"
          },
          "unitTest": {
            "testPassedPercen": "73",
            "testPassed": [
              "10",
              "142"
            ],
            "codeCoverage": "76"
          },
          "functionalTest": {
            "testPassedPercen": "68",
            "testPassed": [
              "2145",
              "4321"
            ],
            "codeCoverage": "23"
          }
        },
        {
          "changes": "Tenrox-R1_1234",
          "owner": "",
          "dateStarted": "4/17/2014",
          "timeStarted": "9:42 am",
          "status": "Complete",
          "metrics": {
            "test": "63",
            "maintainability": "53",
            "security": "64",
            "workmanship": "72"
          },
          "build": {
            "dateStarted": "4/17/2014",
            "timeStarted": "10:46am"
          },
          "unitTest": {
            "testPassedPercen": "73",
            "testPassed": [
              "10",
              "142"
            ],
            "codeCoverage": "76"
          },
          "functionalTest": {
            "testPassedPercen": "68",
            "testPassed": [
              "2145",
              "4321"
            ],
            "codeCoverage": "23"
          }
        },
        {
          "changes": "432460",
          "owner": "samy",
          "dateStarted": "4/17/2014",
          "timeStarted": "7:51 am",
          "status": "Rejected",
          "metrics": {
            "test": "63",
            "maintainability": "53",
            "security": "64",
            "workmanship": "72"
          },
          "build": {
            "dateStarted": "4/17/2014",
            "timeStarted": "10:46am"
          },
          "unitTest": {
            "testPassedPercen": "73",
            "testPassed": [
              "10",
              "142"
            ],
            "codeCoverage": "76"
          },
          "functionalTest": {
            "testPassedPercen": "68",
            "testPassed": [
              "2145",
              "4321"
            ],
            "codeCoverage": "23"
          }
        },
        {
          "changes": "432459",
          "owner": "samy",
          "dateStarted": "4/16/2014",
          "timeStarted": "6:43 am",
          "status": "Accepted",
          "metrics": {
            "test": "63",
            "maintainability": "53",
            "security": "64",
            "workmanship": "72"
          },
          "build": {
            "dateStarted": "4/17/2014",
            "timeStarted": "10:46am"
          },
          "unitTest": {
            "testPassedPercen": "73",
            "testPassed": [
              "10",
              "142"
            ],
            "codeCoverage": "76"
          },
          "functionalTest": {
            "testPassedPercen": "68",
            "testPassed": [
              "2145",
              "4321"
            ],
            "codeCoverage": "23"
          }
        }
      ]
    };

    httpbackend.when('GET', '').respond(response);

    var promise = service.getBuildDetails();

    promise.then(function (response) {

      expect(response.data.buildDetails.length).toBe(6);

    });

    httpbackend.flush();

  });


});
