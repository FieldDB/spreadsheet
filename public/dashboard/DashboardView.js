define([
    "use!backbone",
    "datum/Datum",
    "datum/DatumView"
], function(Backbone, Datum, DatumView) {
    var DashboardView = Backbone.View.extend(
    /** @lends DashboardView.prototype */
    {
       /**
        * @class The main layout of the program.
        *
        * @extends Backbone.View
        * @constructs
        */
       initialize: function() {
       },
       
       el: $('#app'),
       
       events: {
       	"click #dashboard-view": "addOneDatum"
       },
       
       /**
        * Add a datum to the screen.
        */
       addOneDatum: function() {
          debug("Clicked addOneDatum");
       	  
       	  // Create the new Datum to be added
          var datum = new Datum({attestation: "Hello World!"});
          
          // Add it to the global list of Datum
          datumList.add(datum);
          
          // Render it as a DatumView
          var view = new DatumView({model: datum});
          this.$("#content").append(view.render().el);
       }
    });

    return DashboardView;
});