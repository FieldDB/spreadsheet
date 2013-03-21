console.log("Loading the LingSyncSpreadsheetDirectives.");

'use strict';
define(
    [ "angular" ],
    function(angular) {
      var LingSyncSpreadsheetDirectives = angular
          .module('LingSyncSpreadsheet.directives', [])
          .directive('moduleVersion', [ 'version', function(version) {
            return function(scope, element, attrs) {
              element.text(version);
            };
          } ])
          .directive(
              'selectDropdown1',
              function() {
                return function(scope, element, attrs) {
                  if (scope.field.label == scope.scopePreferences.template1[attrs.selectDropdown1].label) {
                    element[0].selected = true;
                  }
                };
              })
              .directive(
              'selectDropdown2',
              function() {
                return function(scope, element, attrs) {
                  if (scope.field.label == scope.scopePreferences.template2[attrs.selectDropdown2].label) {
                    element[0].selected = true;
                  }
                };
              });

      return LingSyncSpreadsheetDirectives;
    });