let renderer = null
let detector = null

let streaming = false
document.addEventListener("DOMContentLoaded", () => {

    
  let video = document.getElementById("video");
  let faceCanvas = document.getElementById("canvas");

  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
          video.srcObject = stream;
          video.play();
          video.style.display = "none";
      })
      .catch(function(err) {
          console.error("An error occurred! " + err);
      });

      detector = new FaceDetector(video, faceCanvas)
      detector.loadModels().then(function (){
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
                video.style.display = "none";
                detector.initStream()
            })
            .catch(function(err) {
                console.log("An error occurred! " + err);
            });
    })

    
    var observer = new MutationObserver(function(mutationsList, observer) {
        for (var mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Alert added to the DOM, select it and perform actions
            var addedAlert = mutation.addedNodes[0];
            // Do something with the addedAlert element
            console.log('Alert added:', addedAlert);
             let alert_list = document.querySelectorAll('.alert')
                  alert_list.forEach(function(alert) {
                      new bootstrap.Alert(alert);
                      setTimeout(() => {
                          bootstrap.Alert.getInstance(alert).close();
                      }, 5000);
                  });
          }
        }
      });
      
      // Observe changes in the alertContainer
      observer.observe(document.getElementById('liveAlertPlaceholder'), { childList: true });

  })