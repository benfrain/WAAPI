const spinnerJS = document.querySelector(".spinnerJS");

const spinMe = spinnerJS.animate(
    {
        transform: "rotate(359deg)",
    },
    {
        duration: 1000,
        fill: "forwards",
        iterations: Infinity,
    }
);
spinMe.pause();

const scaleMe = spinnerJS.animate(
    {
        transform: "scale(.8)",
    },
    {
        duration: 1000,
        fill: "forwards",
        iterations: Infinity,
        composite: "add",
        direction: "alternate",
    }
);

scaleMe.pause();
