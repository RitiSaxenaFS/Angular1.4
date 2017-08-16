/**
 * @ngdoc service
 * @name crossoverApp.buildService
 * @description Service which handles get build details response
 * @requires $http
 */
(function () {
    'use strict';

    angular.module('crossoverApp').service('buildService', buildService);

    buildService.$inject = ['$http']

    function buildService($http){

        return  {
            getBuildDetails : getBuildDetails
        }


      /**
       * @ngdoc method
       * @name getBuildDetails
       * @methodOf crossoverApp.buildService
       * @description Get the build details from dummy json
       */
        function getBuildDetails(){
          var promise =  $http.get('json/buildDetails.response.json');
          return promise;
        }

    }


})();
