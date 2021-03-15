let video;
let mobileNet;
let classifier;
let happy;
let sad;
let trainButton;
let label='test';

function videoReady()
{
    console.log('Yes video is ready!');
}

function modelLoaded()
{
    console.log('Model loaded!');
}

function whileTraining(loss)
{
    if(loss==null)
    {
        console.log('Training complete!');
        classifier.classify(gotResult);
    }
}

function gotResult(err,res)
{
    if(err)
    {
        console.log(err);
    }
    else{
        label=res[0].label;
        classifier.classify(gotResult);
    }
}

function setup()
{
    createCanvas(420,370);
    video=createCapture(VIDEO);
    video.hide();
    background(0);

    // we extract the feature extracted from pre-trained model mobile Net
    // to use for the custome training or task......

    mobileNet=ml5.featureExtractor('MobileNet', modelLoaded);
    classifier=mobileNet.classification(video,videoReady);

    happy=createButton('happy');
    happy.mousePressed(()=>{
        //we adding a label to the image to train the model!
        classifier.addImage('happy');
    })

    sad=createButton('sad');
    sad.mousePressed(()=>{
        classifier.addImage('sad');
    })

    trainButton=createButton('train');
    trainButton.mousePressed(()=>{
        classifier.train(whileTraining);
    })
}

function draw()
{
    background(0);
    image(video,0,0,width,height);
    fill(255);
    textSize(16);
    text(label,10,height-10);
}