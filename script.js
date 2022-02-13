
    require([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/Camera",
      "esri/widgets/Home",
      "dojo/domReady!"
    ], function(WebScene, SceneView, Camera, Home) {

    
      //Now we call this web map:
      //https://hub.arcgis.com/items/8046207c1c214b5587230f5e5f8efc77
      var scene = new WebScene({
        portalItem:{
         id:"8046207c1c214b5587230f5e5f8efc77" 
        }
      });
      
      // Where the camera starts out looking
      // Also used by button 1 (Port of Boston)
      var camera = new Camera({
        position: [
          -71.060217, // longitude
          42.382655, // latitude
          2500// elevation in meters
        ],
        tilt: 35,
        heading: 150
      })
      
      // The camera used by button 2 (Charles River)
      var camera2 = new Camera({
        position: {
          x: -71.0706,
          y: 42.365855,
          z: 1500
        },
        tilt: 60,
        heading: 260
      });
      
      // The camera used by button 3 (Downtown)
      var camera3 = new Camera({
        position: {
          x: -70.912960,
          y: 42.362730,
          z: 1500
        },
        tilt: 80,
        heading: 265
      });

      // Create the div. It'll have the Port of Boston camera as default.
      var view = new SceneView({
        container: "bostonDiv",
        map: scene,
        camera: camera,
        environment: {
            lighting: {
              date: new Date(),
              directShadowsEnabled: true,
              // don't update the view time when user pans.
              // The clock widget drives the time
              cameraTrackingEnabled: false
            }
        },
    });
    
      // Create the home button, which returns us to the default camera.
    var homeBtn = new Home({
        view: view
      });

      // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-left");
    
      // Create the buttons
    [port, river, downtown].forEach(function(button) {
      button.style.display = 'flex';
      view.ui.add(button, 'top-right');
    });
      
      port.addEventListener('click', function() {
      // reuse the default camera position already established when we made the div.
      view.goTo({
        target:camera
      });
    });
      
    river.addEventListener('click', function() {
      // go to the river camera
      view.goTo({
        target:camera2
      });
    });
      
      downtown.addEventListener('click', function() {
      // go to the downtown camera
      view.goTo({
        target:camera3
      });
    });


    });
