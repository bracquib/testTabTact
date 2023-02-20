
const track = document.getElementById('projects-wrapper');

window.onmousedown = e => {track.dataset.mouseDownAt = e.clientX;}
window.onmousemove = e => {

if (track.dataset.mouseDownAt === "0") return;
const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
maxDelta = window.innerWidth / 2;
const percentage = (mouseDelta / maxDelta) * -100;
let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);
track.dataset.percentage = nextPercentage;

track.animate({
    transform: `translate(${nextPercentage}%, -55%)`
}, { duration: 1200, fill: "forwards" });

for(const im of document.getElementsByClassName('proj-img')){
    im.animate({
        objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
}
}
window.onwheel = e => {
let nextPercentage = parseFloat(track.dataset.prevPercentage) + e.deltaY/20;
nextPercentage = Math.max(Math.min(nextPercentage, 0), -70);
track.dataset.percentage = nextPercentage;
track.dataset.prevPercentage = track.dataset.percentage;

track.animate({
    transform: `translate(${nextPercentage}%, -55%)`
}, { duration: 1200, fill: "forwards" });

for(const im of document.getElementsByClassName('proj-img')){
    im.animate({
        objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
}
}

window.onmouseup = e => {
track.dataset.mouseDownAt = "0";
track.dataset.prevPercentage = track.dataset.percentage;
}


