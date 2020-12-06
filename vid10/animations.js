const box = document.querySelector(".box");

box.animate([{ transform: "translate(500px, 200px)" }, { transform: "scale(3)" }], {
    duration: 2000,
    delay: 50,
    iterations: Infinity,
    easing: "cubic-bezier(0.85, 0, 0.15, 1)",
    fill: "both",
    direction: "alternate",
});
