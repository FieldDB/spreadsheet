/* globals  window, FieldDB */
'use strict';
console.log("Declaring the SpreadsheetPrivateServices.");

FieldDB.Database.prototype.BASE_DB_URL = "https://corpus.lingsync.org";
FieldDB.Database.prototype.BASE_AUTH_URL = "https://auth.lingsync.org";
FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = "https://speech.lingsync.org";

angular.module('spreadsheetApp')
  .factory('Servers', function() {


    var localhost = false;
    if (window.location.host.indexOf("localhost") > -1) {
      localhost = true;
    }
    var servers = {};

    if (localhost) {
      servers.localhost = {
        auth: "https://localhost:3183",
        corpus: "https://localhost:6984",
        serverCode: "localhost",
        userFriendlyServerName: "Localhost"
      };
    }

    servers.production = {
      auth: "https://auth.lingsync.org",
      corpus: "https://corpus.lingsync.org",
      serverCode: "production",
      userFriendlyServerName: "LingSync"
    };
    // servers.testing = {
    //   auth: "https://authdev.lingsync.org",
    //   corpus: "https://corpusdev.lingsync.org",
    //   serverCode: "testing",
    //   userFriendlyServerName: "LingSync Beta"
    // };

    return {
      'getServiceUrl': function(label, serviceType) {
        var serverInfo = {};

        serverInfo = servers[label];
        if (!serverInfo) {
          throw "Request for an invalid server: " + label;
        }

        if (FieldDB && FieldDB.Database) {
          if ("localhost" === label) {
            FieldDB.Database.prototype.BASE_DB_URL = "https://localhost:6984";
            FieldDB.Database.prototype.BASE_AUTH_URL = "https://localhost:3181";
            FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = "https://localhost:3184";
          } else {
            FieldDB.Database.prototype.BASE_DB_URL = "https://corpus.lingsync.org";
            FieldDB.Database.prototype.BASE_AUTH_URL = "https://auth.lingsync.org";
            FieldDB.AudioVideo.prototype.BASE_SPEECH_URL = "https://speech.lingsync.org";
          }
        }

        if (serviceType === "auth" || "corpus") {
          return serverInfo[serviceType];
        } else {
          return serverInfo;
        }

      },

      'getAvailable': function() {
        var serverCodeMappings = [];
        for (var server in servers) {
          serverCodeMappings.push({
            serverCode: servers[server].serverCode,
            userFriendlyServerName: servers[server].userFriendlyServerName
          });
        }
        return serverCodeMappings;
      },

      'getHumanFriendlyLabels': function() {
        var serverCodeMappings = {};
        for (var server in servers) {
          console.log("Looking at ", server);
          serverCodeMappings[servers[server].serverCode] = servers[server].userFriendlyServerName;
        }
        return serverCodeMappings;
      }

    };
  });
