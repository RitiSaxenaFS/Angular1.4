/**
 * @author Riti Saxena
 * @ngdoc controller
 * @name crossoverApp.controller:BuildController
 * @description Controller for showing the build details list
 * @requires buildService
 * @requires $mdDialog
 */
(function () {

  'use strict';

    angular.module('crossoverApp').controller('BuildController', buildController);

    buildController.$inject = ['buildService','$mdDialog','$scope']

    function buildController(buildService,$mdDialog,$scope){

        var vmBuild = this;

        //variables initialized for the view on load
        vmBuild.buildDeploy = "Production";
        vmBuild.data = [2145,4321];
        vmBuild.labels=["2145","4321"];
        vmBuild.colors = ['#FFA500','#008000'];


        //controller methods
        vmBuild.isShown = isShown;
        vmBuild.getClass = getClass;
        vmBuild.getTableTextClass = getTableTextClass;
        vmBuild.openBuildDetails = openBuildDetails;
        vmBuild.openPopup = openPopup;

        //init method called on load of controller
        init();

        /**
          * @ngdoc method
          * @name init
          * @methodOf crossoverApp.controller:BuildController
          * @description called on load of controller to get the build details
        */
        function init(){
            //get the build details to display
            var promise = buildService.getBuildDetails();
            promise.then(function(response){
                vmBuild.buildDetails = response.data.buildDetails;
            });
            vmBuild.options = {
              tooltipEvents: [],
              showTooltips: true,
              tooltipCaretSize: 0,
              onAnimationComplete: function () {
                this.showTooltip(this.segments, true);
              }
            };

          $scope.options = {
            chart: {
              type: 'pieChart',
              height: 200,
              x: function(d){return d.key;},
              y: function(d){return d.y;},
              showLabels: true,
              duration: 500,
              labelThreshold: 0.01,
              showLegend: false, // to hide legend
              showControls: false // to hide controls

            }
          };

          $scope.data = [
            {
              key: "One",
              y: 5
            },
            {
              key: "Two",
              y: 2
            }
          ];
        };

        /**
          * @ngdoc method
          * @name openBuildDetails
          * @methodOf crossoverApp.controller:BuildController
          * @param {Number} index index of build details array
          * @description method to expand the build row when clicked
        */
        function openBuildDetails(index){
          //iterates all the build details available and expands only a particular rows while collapsing the others
          angular.forEach(vmBuild.buildDetails,function(build,i){
            if(i == index){
              if(build.expand === true){
                build.expand = false;
              }else{
                build.expand = true;
              }
            }else{
              build.expand = false;
            }
          });
        };

        /**
          * @ngdoc method
          * @name isShown
          * @methodOf crossoverApp.controller:BuildController
          * @param {Object} build particular object from array
          * @description method called to display the expanded row only if status is among Accepted, Complete or Rejected
        */
        function isShown(build){
          return build.expand === true && (build.status === 'Accepted' || build.status === 'Complete' || build.status === 'Rejected');
        };

        /**
          * @ngdoc method
          * @name getClass
          * @methodOf crossoverApp.controller:BuildController
          * @param {Object} build particular object from array
          * @param {String} metrics string value
          * @description method returns a class name used to display metrics
        */
        function getClass(build,metrics){
          switch(build.status){
            case 'Accepted' : return 'build-metrics-green';
            case 'Complete' : return 'build-metrics-green';
            case 'Pending'  : return  'build-metrics-pending';
            case 'Rejected' : if(metrics) {
                                 return 'build-metrics-red';
                              }else{
                                 return 'build-metrics-pending';
                              }
            case 'Running'  : if(metrics) {
                                 return 'build-metrics-blue';
                              }else{
                                 return 'build-metrics-pending';
                              }
          }
        };

        /**
          * @ngdoc method
          * @name getTableTextClass
          * @methodOf crossoverApp.controller:BuildController
          * @param {Object} build particular object from array
          * @description method returns a class name used to change the text colour of the table
         */
        function getTableTextClass(build){
          switch(build.status){
            case 'Accepted' : return 'icon-green';
            case 'Complete' : return 'icon-green';
            case 'Pending' : return  'icon-grey';
            case 'Rejected' : return 'icon-red';
            case 'Running'  :   return 'icon-blue';
          }

        };

        /**
         * @ngdoc method
         * @name openPopup
         * @methodOf crossoverApp.controller:BuildController
         * @param {String} title popup title to be displayed
         * @description method to open up the popup when build metrics or unit test or functional test is clicked
        */
        function openPopup(title){
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title(title)
              .textContent('Not in Scope')
              .ariaLabel('Metrics Details')
              .ok('OK')

          );
        };



    }

})();
