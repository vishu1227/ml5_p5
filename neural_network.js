let NNmodel;
let targetlabel;

function setup()
{
    createCanvas(400,400);

    const options={
        inputs: ['x','y'],
        outputs: ['label'],
        task:'classification'   
    }

    NNmodel=ml5.neuralNetwork(options);
    background(200);
}

function keyPressed()
{
    targetlabel=key.toUpperCase();
}

function mousePressed()
{
    let input={
        x:mouseX,
        y:mouseY
    }

    let target={
        label:targetlabel
    }

    NNmodel.addData(input,target);
    
    // thickness of boundary
    stroke(0);
    // Disables filling geometry
    noFill();
    ellipse(mouseX,mouseY,24);
    // ellipse(100, 100, 5, 5);

    // background color
    fill(0);
    // boldeness
    noStroke();
    textAlign(CENTER,CENTER);
    text(targetlabel,mouseX,mouseY);
}

// function draw()
// {
//     background(200);
// }