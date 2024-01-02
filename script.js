let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

let movemouse =
{
    x: undefined,
    y: undefined
}

let bigMass = Number.parseInt(prompt("Enter the mass of big box in kg:(preferred:100/1000/10000)"));
if (isNaN(bigMass)) {
    alert("Big Mass is 1000kg");
    bigMass = 1000;
}

let initial_velocity = -1;
const axisY = canvas.height - 100;
const smallBoxX = 200;
const bigBoxX = 400;
const smallBoxLength = 80;
const bigBoxLength = 150;
const axisX = 100;
let COLLISION = document.getElementById('collision');



function line_draw() {
    c.beginPath();
    c.moveTo(axisX, 0);
    c.lineTo(axisX, axisY);
    c.lineTo(canvas.width, axisY);
    c.strokeStyle = 'white';
    c.lineWidth = 4;
    c.stroke();
}



class Box {
    constructor(mass, x, y, length, velocity, color) {
        this.mass = mass;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
        this.length = length;
        this.color = color;
    }
    draw(condition) {
        c.fillStyle = this.color;

        if (condition == 'smallToOrigin') {
            c.fillRect(axisX, axisY - this.length, this.length, this.length);
            return;
        }
        if (condition == 'bigToOrigin') {
            c.fillRect(axisX + smallBoxLength, axisY - this.length, this.length, this.length)
            return;
        }
        c.fillRect(this.x, this.y - this.length, this.length, this.length);
    }
    update() {
        this.x += this.velocity;
    }
}

let smallbox = new Box(1, smallBoxX, axisY, smallBoxLength, 0, '#F1E4C3');
let bigbox = new Box(bigMass, bigBoxX, axisY, bigBoxLength, initial_velocity, '#C6A969');

function momentum_change() {
    let u1 = smallbox.velocity;
    let u2 = bigbox.velocity;
    let m1 = smallbox.mass;
    let m2 = bigbox.mass;
    let Mass_factor_1 = ((m1 - m2) / (m1 + m2))
    let Mass_factor_2 = 2 / (m1 + m2);

    if (smallBoxLength >= bigbox.x - smallbox.x) {
        smallbox.velocity = ((Mass_factor_1 * u1 + Mass_factor_2 * u2 * m2));
        bigbox.velocity = ((Mass_factor_2 * u1 * m1 - Mass_factor_1 * u2));


        console.log(smallbox.velocity);
        console.log(bigbox.velocity);
        COLLISION.innerText++;
        soundOfCollision();
    }
    if (smallbox.x <= axisX) {
        smallbox.velocity = - u1;
        COLLISION.innerText++;
        soundOfCollision();
    }

}

function soundOfCollision() {
    let tick_audio = new Audio('tick.mp3');
    tick_audio.play();
}

function updatefunction() {
    line_draw();

    momentum_change();
    if (smallbox.x <= axisX) {
        smallbox.draw('smallToOrigin');
    }
    else if (bigbox.x - smallBoxLength <= axisX) {
        bigbox.draw('bigToOrigin')
    }
    else {
        drawfunction();
    }
    bigbox.update();
    smallbox.update()
    c.clearRect(0, 0, axisX, canvas.height);

}
function drawfunction() {
    line_draw();
    bigbox.draw();
    smallbox.draw();
}
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.clearRect(0, 0, axisX, canvas.height);
    requestAnimationFrame(animate);
    updatefunction();
}
window.addEventListener('click', () => {
    initial_velocity = -1;
    document.getElementById('clicktostart').innerText = `Small box:1 kg ||| Big box : ${bigMass} kg`;
    smallbox = new Box(1, smallBoxX, axisY, smallBoxLength, 0, '#F1E4C3');
    bigbox = new Box(bigMass, bigBoxX, axisY, bigBoxLength, initial_velocity, '#C6A969');
    animate();
})

drawfunction();