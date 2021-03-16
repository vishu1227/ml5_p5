let featuresExtractor;
let knn;
let labelP;
let ready=false;
let x;
let y;
let label;

function modelReady()
{
    console.log('Model is ready!');

    // knn.load('knn_model.json',function(){
    //     console.log('Knn model is loaded!');
    // })
}

function setup()
{
    createCanvas(420,370);
    video =createCapture(VIDEO);
    video.size(420,370);
    video.style("transform","scale(-1,1)");
    // video.hide();
    
    knn=ml5.KNNClassifier();
    featuresExtractor=ml5.featureExtractor('MobileNet',modelReady);
    labelP=createP("need training data");
    labelP.style('font-size','12px');
    x=width/2;
    y=height/2;
}

function goClassify()
{
    const features=featuresExtractor.infer(video);
    knn.classify(features,(err,res)=>{
        if(err)
        {
            console.error(err);
        }
        else{
            label=res.label;
            labelP.html(label);
            goClassify();
        }
    })
}

// function mousePressed()
// {
//     const features=featuresExtractor.infer(video);
//     console.log(features);  

//     // this the digital fingerprint of the image!
//     console.log(features.dataSync());
//     features.print();   
// }

function gotResults(err,res)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log(res);
    }
}

// function mousePressed()
// {
//     if(knn.getNumLabels()>1)
//     {
//         const features=featuresExtractor.infer(video);
//         knn.classify(features,gotResults);
//     }
// }

function keyPressed()
{
    const features=featuresExtractor.infer(video);
    
    if(key=='l')
    {
        knn.addExample(features,'left');
        console.log('left!');
    }
    else if(key=='r')
    {
        knn.addExample(features,'right');
        console.log('right!');
    }
    else if(key=='u')
    {
        knn.addExample(features,'Up');
        console.log('Up!');
    }
    else if(key=='d')
    {
        knn.addExample(features,'Down');
        console.log('Down!');
    }
    else if(key=='s')
    {
        save(knn,'knn_model.json');
    }
}

function draw()
{
    // image(video,0,0,width,height);

    background(0);
    fill(255); 
    ellipse(x,y,24);

    if(label=='left')
    {
        x--;
        if(x<0)
        {
            x*=+1;
        }
    }
    else if(label=='right')
    {
        x++;

        if(x>width)
        {
            x*=-1;
        }
    }
    else if(label=='Up')
    {
        y--;

        if(y<0)
        {
            y*=-1;
        }
    }
    else if(label=='Down')
    {
        y++;

        if(y>height)
        {
            y*=-1;
        }
    }

    if(!ready && knn.getNumLabels()>1)
    {
        goClassify();
        ready=true;
    }
}
