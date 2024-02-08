Webcam.set({
    width:350, 
    height:300, 
    imageFormat : 'png', 
    pngQuality:90 
   }); 
   
camera = document.getElementById("camera"); 

Webcam.attach('#camera');


function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
       }); 
   } 
   
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZF22Ge9Pf/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + predicion1;
    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if(results[0].label == "Com mascara")
        {
            document.getElementById("updateEmoji").innerHTML = "&#129305;";
        }
        if(results[0].label == "Sem mascara")
        {
            document.getElementById("updateEmoji").innerHTML = "&#128077;";
        }
    }
}