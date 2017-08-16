
'user strict';
describe('app/scripts/controllers/build.controller.js', function(){

  var $controller,$rootScope, $scope;
  var vmBuild;



  beforeEach(function () {
    module('crossoverApp');
    module(function ($provide) {
      //Fake build service implementation
      $provide.value('buildService', {
        getBuildDetails: function () {
          return {
            then: function(callback){return callback(
              {
                data: {
                  "buildDetails": [
                    {
                      "changes": "Tenrox-R1_12345",
                      "owner": "",
                      "dateStarted": "",
                      "timeStarted": "",
                      "status": "Pending"
                    },
                    {
                      "changes": "46341",
                      "owner": "",
                      "dateStarted": "",
                      "timeStarted": "",
                      "status": "Running"
                    }
                  ]
                }
              }
            );}
          };
        }
      });
      return null;
    });

  });

  beforeEach(inject(function ( _$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    var controller = $controller('BuildController', { $scope:$scope});
    vmBuild = controller;
  }));

  describe('test cases for build controller', function(){
    it('controller to be defined', function(){
      expect(vmBuild).toBeDefined();
    });


    it('build details to be defined', function(){
      expect(vmBuild.buildDetails).toBeDefined();
    });

    it('should have build details length equal to 2', function(){
      expect(vmBuild.buildDetails.length).toBe(2);
    });

    it('should have expanded details for second element in array', function(){
      vmBuild.openBuildDetails(1);
      expect(vmBuild.buildDetails[0].expand).toBe(false);
      expect(vmBuild.buildDetails[1].expand).toBe(true);
    });

    it('should have expanded details as false for second element in array', function(){
      vmBuild.buildDetails = [
        {
          "changes": "Tenrox-R1_12345",
          "owner": "",
          "dateStarted": "",
          "timeStarted": "",
          "status": "Pending"
        },
        {
          "changes": "46341",
          "owner": "",
          "dateStarted": "",
          "timeStarted": "",
          "status": "Running",
          "expand": true
        }
      ];
      vmBuild.openBuildDetails(1);
      expect(vmBuild.buildDetails[0].expand).toBe(false);
      expect(vmBuild.buildDetails[1].expand).toBe(false);
    });

    it('should test is Shown Method for build status Pending', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Pending",
        "expand" : true
      };

      var shown = vmBuild.isShown(build);
      expect(shown).toBe(false);
    });

    it('should test is Shown Method for build status Rejected', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Rejected",
        "expand" : true
      };

      var shown = vmBuild.isShown(build);
      expect(shown).toBe(true);
    });

    it('should test is Shown Method for build status Running', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Running",
         "expand" : true
      };

      var shown = vmBuild.isShown(build);
      expect(shown).toBe(false);
    });

    it('should test is Shown Method for build status Accepted', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Accepted",
        "expand" : true
      };

      var shown = vmBuild.isShown(build);
      expect(shown).toBe(true);
    });

    it('should test is Shown Method for build status Complete', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Complete",
        "expand" : true
      };

      var shown = vmBuild.isShown(build);
      expect(shown).toBe(true);
    });


    it('should test getClass Method for build status Pending', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Pending",
        "expand" : true
      };

      var cssClass = vmBuild.getClass(build);
      expect(cssClass).toBe('build-metrics-pending');
    });
    it('should test getClass Method for build status Accepted', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Accepted",
        "expand" : true
      };

      var cssClass = vmBuild.getClass(build);
      expect(cssClass).toBe('build-metrics-green');
    });
    it('should test getClass Method for build status Complete', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Complete",
        "expand" : true
      };

      var cssClass = vmBuild.getClass(build);
      expect(cssClass).toBe('build-metrics-green');
    });
    it('should test getClass Method for build status Rejected for metrics block', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Rejected",
        "expand" : true
      };

      var cssClass = vmBuild.getClass(build,'Metrics');
      expect(cssClass).toBe('build-metrics-red');
    });
    it('should test getClass Method for build status Rejected without metrics block', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Rejected",
        "expand" : true
      };

      var cssClass = vmBuild.getClass(build);
      expect(cssClass).toBe('build-metrics-pending');
    });
    it('should test getClass Method for build status Running for metrics block', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Running",
        "expand" : true
      };

      var cssClass = vmBuild.getClass(build,'Metrics');
      expect(cssClass).toBe('build-metrics-blue');
    });
    it('should test getClass Method for build status Running without metrics block', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Running",
        "expand" : true
      };

      var cssClass = vmBuild.getClass(build);
      expect(cssClass).toBe('build-metrics-pending');
    });

    it('should test getTableTextClass Method for build status Pending', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Pending",
        "expand" : true
      };

      var tableText = vmBuild.getTableTextClass(build);
      expect(tableText).toBe('icon-grey');
    });

    it('should test getTableTextClass Method for build status Rejected', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Rejected",
        "expand" : true
      };

      var tableText = vmBuild.getTableTextClass(build);
      expect(tableText).toBe('icon-red');
    });

    it('should test getTableTextClass Method for build status Running', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Running",
        "expand" : true
      };

      var tableText = vmBuild.getTableTextClass(build);
      expect(tableText).toBe('icon-blue');
    });

    it('should test getTableTextClass Method for build status Accepted', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Accepted",
        "expand" : true
      };

      var tableText = vmBuild.getTableTextClass(build);
      expect(tableText).toBe('icon-green');
    });

    it('should test getTableTextClass Method for build status Complete', function(){
      var build =
      {
        "changes": "Tenrox-R1_12345",
        "owner": "",
        "dateStarted": "",
        "timeStarted": "",
        "status": "Complete",
        "expand" : true
      };

      var tableText = vmBuild.getTableTextClass(build);
      expect(tableText).toBe('icon-green');
    });

  });


});

