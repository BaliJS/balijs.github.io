function paintCanvas() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, W, H)
}

function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = -1 + Math.random() * 2;
    this.vy = -1 + Math.random() * 2;
    this.radius = 2;
    this.draw = function() {
        ctx.fillStyle = "#FBB303";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill()
    }
}

function draw() {
    paintCanvas();
    for (var e = 0; e < particles.length; e++) {
        p = particles[e];
        p.draw()
    }
    update()
}

function update() {
    for (var e = 0; e < particles.length; e++) {
        p = particles[e];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x + p.radius > W) p.x = p.radius;
        else if (p.x - p.radius < 0) {
            p.x = W - p.radius
        }
        if (p.y + p.radius > H) p.y = p.radius;
        else if (p.y - p.radius < 0) {
            p.y = H - p.radius
        }
        for (var t = e + 1; t < particles.length; t++) {
            p2 = particles[t];
            distance(p, p2)
        }
    }
}

function distance(e, t) {
    var n, r = e.x - t.x,
        i = e.y - t.y;
    n = Math.sqrt(r * r + i * i);
    if (n <= minDist) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(251,179,3," + (1.2 - n / minDist) + ")";
        ctx.moveTo(e.x, e.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
        ctx.closePath();
        var s = r / 332e3,
            o = i / 332e3;
        e.vx -= s;
        e.vy -= o;
        t.vx += s;
        t.vy += o
    }
}

function animloop() {
    draw();
    requestAnimFrame(animloop)
}
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }
}();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = window.innerWidth,
    H = window.innerHeight;
canvas.width = W;
canvas.height = H;
var particleCount = 150,
    particles = [],
    minDist = 70,
    dist;
for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle)
}
animloop()