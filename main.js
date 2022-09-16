song = "";
Status = "";
objects = [];


function preload(){
song=loadSound("Alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    
    if(Status != "")
    {
        r= random(255);
        g= random(255);
        b= random(255);

        objectdetector.detect(video, gotResult);
        for(i = 0; i<objects.length; i++)
        {   
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("no_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("no_of_objects").innerHTML = "Baby NOT Found";
                console.log("Play");
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("no_of_objects").innerHTML = "Baby NOT Found";
                console.log("Play");
                song.play();
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    Status = true;
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

