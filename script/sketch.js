let font;
let fSize; // font size
let msg; // text to write
let animate_msg;
let pts = []; // store path data
let path;
let points
let stepSize = 0.5;
let danceFactor = 1;
let value = 0;
let prevMouseX;
let prevMouseY;
let m_x = false;
let m_y = false;
let slider2;


// function preload() {
//     // preload OTF font file
//     font = loadFont('../resource/Elm-Regular.otf');
// }

function setup() {
    createCanvas(1000, 500,WEBGL);
    opentype.load('../resource/Elm-Regular.otf', function (err, f) {
        if (err) {
        alert('Font could not be loaded: ' + err);
        } else {
        font = f
        console.log('font ready')
        fSize = 256
        msg = 'testing'
        let x = 60
        let y = 300
        path = font.getPath(msg, x, y, fSize)
        console.log(path.commands)
        }
    })
    stroke(255);
    strokeWeight(0.5);
    noFill();

    slider = createSlider(0, 100, 3); // Range from 0 to 100, starting value of 50
    slider.position(width/2, 50); // Position the slider on the canvas
    slider.style('width', '200px'); // Set the width of the slider


    slider2 = createSlider(0, 10, 0); // Range from 0 to 10, starting value of 0
    slider2.position(width / 2, 70); // Position the second slider on the canvas
    slider2.style('width', '200px');
    prevMouseX = mouseX;
    prevMouseY = mouseY;
}
    
function draw() {  
    background(190);
    translate(-width/2,-height/2);
    // fill(255);
    fill(0)
    strokeWeight(0)
    glow(color(255, 0, 0), 100); // Set glow effect
    ellipse(mouseX,mouseY,10,10);
    strokeWeight(slider.value());
    stepSize = slider2.value();
    fill(255)

    for (let cmd of path.commands) {
        if (cmd.type === 'M') {
            beginShape()
            cmd.x += random(-stepSize, stepSize) * danceFactor;
            cmd.y += random(-stepSize, stepSize) * danceFactor;
            checkMouse(cmd);
            expand(cmd);
            vertex(cmd.x, cmd.y)
            fill(255);
            ellipse(cmd.x,cmd.y,5,5);
            // noFill()
        } else if (cmd.type === 'L') {
            cmd.x += random(-stepSize, stepSize) * danceFactor;
            cmd.y += random(-stepSize, stepSize) * danceFactor;
            checkMouse(cmd);
            vertex(cmd.x, cmd.y)
            fill(255);
            ellipse(cmd.x,cmd.y,5,5);
            // noFill()
        } else if (cmd.type === 'C') { 
            fill(255);
            cmd.x += random(-stepSize, stepSize) * danceFactor;
            cmd.y += random(-stepSize, stepSize) * danceFactor;
            checkMouse(cmd);
            ellipse(cmd.x,cmd.y,5,5);
            // noFill()
            bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y)
        } else if (cmd.type === 'Q') {
            fill(255);
            cmd.x += random(-stepSize, stepSize) * danceFactor;
            cmd.y += random(-stepSize, stepSize) * danceFactor;
            checkMouse(cmd);
            expand(cmd);
            ellipse(cmd.x,cmd.y,5,5);
            // noFill()
            quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y)
        }else if (cmd.type === 'Z') {
            endShape()
        }
    }

    prevMouseX = mouseX;
    prevMouseY = mouseY;
  
}

function checkMouse(cmd){
    if(cmd.x > mouseX  && cmd.x < mouseX + 20){
        cmd.x += 1;
    }
    else if(cmd.x < mouseX  && cmd.x > mouseX - 20){
        cmd.x -= 1;
    }
    if(cmd.y > mouseY  && cmd.y < mouseY + 20){
        cmd.y -= 1;
    }
    else if(cmd.y < mouseY  && cmd.y > mouseY - 20){
        cmd.y += 1;
    }
}


function regeneratePoints(message) {
    if(msg === ''){
        points = [];
        return;
    }
    fSize = 256
    msg = message
    let x = 60
    let y = 300
    path = font.getPath(msg, x, y, fSize)
    console.log(msg)
}

function keyPressed() {
    if (keyCode === BACKSPACE && msg.length > 0) {
        msg = msg.substring(0, msg.length - 1);
        regeneratePoints(msg);
    } else if (keyCode >= 32) {  
        msg += key; 
        regeneratePoints(msg);
    }
    
}