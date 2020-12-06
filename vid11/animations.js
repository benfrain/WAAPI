const spinnerJS = document.querySelector(".spinnerJS");

spinnerJS.animate(
    {
        transform: "rotate(359deg)",
    },
    {
        duration: 1000,
        fill: "forwards",
        iterations: Infinity,
    }
);
