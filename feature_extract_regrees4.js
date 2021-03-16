let mobileNet;
let predictor;
let video;
let value=0;
let slider;
let addButton;
let trainButton;
let saveButton;

function modelReady()
{
    console.log('Model is ready!');
    predictor.load('model.json',customModelReady);
}

function customModelReady()
{
    console.log('Yes model is ready!');
    label='model ready';
    predictor.predict(gotResults);
}

function videoReady()
{
    console.log('Video is ready!');
}

function whileTraining(loss)
{
    if(loss==null)
    {
        console.log('Training Complete');
        predictor.predict(gotResults);
    }
    else
    {
        console.log(loss);
    }
}

function gotResults(err,res)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        value=res.value;
        predictor.predict(gotResults);
    }
}

function setup()
{
    createCanvas(320,270);
    video=createCapture(VIDEO);

    video.hide();
    background(0);

    mobileNet=ml5.featureExtractor('MobileNet',modelReady);
    predictor=mobileNet.regression(video,videoReady);

    slider=createSlider(0,1,0.5,0.01);

    addButton=createButton('add example image');
    addButton.mousePressed(()=>{
        predictor.addImage(slider.value());
    })

    trainButton=createButton('train');
    trainButton.mousePressed(()=>{
        predictor.train(whileTraining);
    })


    // to save the model
    saveButton=createButton('save');
    saveButton.mousePressed(()=>{
        predictor.save();
    })
}

function draw()
{
    background(0);
    image(video,0,0,320,240);
    rectMode(CENTER);
    fill(255,0,200);
    rect(value*width,height/2,50,50);

    fill(255);
    textSize(16);
    text(value,10,height-10);
}