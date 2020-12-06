const spinnerJS = document.querySelector(".spinnerJS");

const spinKF = {
    transform: "rotate(359deg)",
};

const scaleKF = {
    transform: "scale(.8)",
};

const spinTiming = {
    duration: 1000,
    fill: "forwards",
    iterations: Infinity,
};

const scaleTiming = {
    duration: 1000,
    fill: "forwards",
    iterations: Infinity,
    composite: "add",
    direction: "alternate",
};

const spinMe = spinnerJS.animate(spinKF, spinTiming);
const scaleMe = spinnerJS.animate(scaleKF, scaleTiming);

// scaleMe.pause();
