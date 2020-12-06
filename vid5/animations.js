const thing = document.querySelector(".thing");

thing
    .animate(
        [
            {
                borderRadius: "0px",
                transform: "none",
            },
            {
                transform: "translate(300px, 0)",
                borderRadius: "50%",
                backgroundColor: "#333",
            },
        ],
        {
            duration: 1000,
            fill: "both",
            easing: "ease-in-out",
        }
    )
    .finished.then(() => {
        thing.animate(
            [
                {
                    transform: "translate(300px, 200px)",
                    backgroundColor: "#f90",
                    borderRadius: "0px",
                },
            ],
            {
                delay: 500,
                fill: "both",
                easing: "ease-in-out",
                duration: 1000,
            }
        );
    });
