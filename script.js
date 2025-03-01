let width = 200;
let damage = 30;
let heal = 20;
const green_bar = document.getElementById("green-bar");
const purple_bar = document.getElementById("purple-bar");
const white_bar = document.getElementById("white-bar");

function updateBarColor() {
    let percentage = (width / 200) * 100;
    if (percentage <= 25) {
        green_bar.style.backgroundColor = "red";
    } else if (percentage <= 50) {
        green_bar.style.backgroundColor = "yellow";
    } else {
        green_bar.style.backgroundColor = "green";
    }
}

function animateNumber(target, start, end, duration) {
    let current = start;
    let draw_span = 50;
    const step = (end - start) / (duration / draw_span); // draw_spanごとに1ずつ変わる
    const interval = setInterval(() => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            current = end; // 数値が目標値を超えないように
            clearInterval(interval);
        }
        target.innerText = Math.round(current); // 数値を更新
    }, draw_span); // draw_spanごとに更新
}

document.getElementById("increaseButton").addEventListener("click", function() {
    animateNumber(document.getElementById("hpText"), width, width + heal, 1000);
    width = Math.min(200, width + heal);

    green_bar.classList.add("animate");
    purple_bar.classList.add("animate");
    white_bar.classList.remove("animate");

    green_bar.style.width = width + "px";
    purple_bar.style.width = width + "px";
    white_bar.style.width = width + "px";

    updateBarColor();
    green_bar.classList.add("heal-blink");
    setTimeout(() => {
        green_bar.classList.remove("heal-blink"); // 1秒後に点滅を止める
    }, 1000);
});

document.getElementById("decreaseButton").addEventListener("click", function() {
    animateNumber(document.getElementById("hpText"), width, width - damage, 1000);
    width = Math.max(0, width - damage);

    green_bar.classList.remove("animate");
    purple_bar.classList.add("animate");
    white_bar.classList.remove("animate");

    green_bar.style.width = width + "px";
    purple_bar.style.width = width + "px";
    white_bar.style.width = width + "px";

    updateBarColor();
    green_bar.classList.add("damage-blink");
    setTimeout(() => {
        green_bar.classList.remove("damage-blink"); // 1秒後に点滅を止める
    }, 300);
});
