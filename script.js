let mobileNet;
let puffin;
let video;
let label="";

// function imageReady()
// {
//     //insert this image into the canvase
//     image(puffin,0,0,width,height);
// }

function setup()
{
    //width and height
    createCanvas(640,480);
    //background color
    background(0);

    video=createCapture(VIDEO);
    video.hide();
    // puffin=createImg('img/puffin.jpg',imageReady);
    // puffin.hide();
    
    mobileNet=ml5.imageClassifier('MobileNet',video,modelLoaded);
}

function draw()
{
    image(video,0,0);
    fill(255);
    textSize(64);
    text(label,10,height-100);
}

function modelLoaded()
{
    console.log(ml5.version);
    // mobileNet.classify(puffin,classify);
    mobileNet.classify(gotResult);
}

function gotResult(err,res)
{
    if(err){
        console.log(err)
    }
    else{
        // console.log(res);    
        
        label=res[0].label;
        // color black
        mobileNet.classify(gotResult);
    }
}
