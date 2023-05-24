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


  })