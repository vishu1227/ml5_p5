let img;
let detector;
let video;
let detection=[];

function modelLoaded()
{
    console.log('Model loaded!');
}

//it loads before the setup function 
function preload()
{
    img = loadImage('img/download.png');
    detector = ml5.objectDetector('cocossd', {}, modelLoaded);
}

function setup()
{
    createCanvas(640,480);
    // image(img,0,0,width,height);
    video=createCapture(VIDEO);
    video.size(640,480);
    video.hide();
    // detector.detect(img,getResult);
    detector.detect(video,getResult);
}

function draw()
{
    image(video,0,0);
    for(let i=0;i<detection.length;i++)
    {
        let obj=detection[i];

        // color of the boundary
        stroke(0,255,0);
        // thickness
        strokeWeight(4);
        noFill();
        rect(obj.x,obj.y,obj.width,obj.height);

        // disable the outline
        noStroke();
        fill(255);
        textSize(24);
        text(obj.label,obj.x+10,obj.y+24)
    }
}

function getResult(err,res)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        detection=res;
        detector.detect(video,getResult);
    }
}