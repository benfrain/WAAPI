const ctlPrev = document.getElementById("ctlPrev");
const ctlNext = document.getElementById("ctlNext");
const ctlPause = document.getElementById("ctlPause");
const ctlBlackHole = document.getElementById("ctlBlackHole");
const ctlReadOut = document.getElementById("ctlReadOut");

ctlNext.addEventListener("click", processDirectionClick);
ctlPrev.addEventListener("click", processDirectionClick);
ctlPause.addEventListener("click", togglePlayback);
ctlBlackHole.addEventListener("click", createBlackHole);

// Animation elements
const canvasArea = document.querySelector(".can-Canvas");
const earth = canvasArea.querySelector(".can-Earth");
const rocket = canvasArea.querySelector(".can-Rocket");
const rocketBody = document.getElementById("rocketBody");
const rocketFlame = document.getElementById("flame");
const saturn = canvasArea.querySelector(".can-Saturn");
const moon = canvasArea.querySelector(".can-Moon");
const mars = canvasArea.querySelector(".can-Mars");
const stripePlanet = canvasArea.querySelector(".can-StripePlanet");
const wiper = canvasArea.querySelector(".can-Wiper");
const panelIntro = canvasArea.querySelector(".can-PanelIntro");
const eddie = canvasArea.querySelector(".can-Eddie");
const crawlText = canvasArea.querySelector("h1");

// we could set this dynamically based on data/DOM
const maxIdx = 3;

// lets for current/previous
let previousIdx = null;
let currentIdx = 0;

// Do we have a Black hole active?
let blackHoleActive = false;

// Keyframes
const crawlTextOff = [
    { transform: "rotateX(70deg) translateZ(-400px) translateY(-700px)" },
    { transform: "rotateX(70deg) translateZ(-400px) translateY(-2500px)", opacity: "0" },
];

const rocketEarthToSpace = [{ transform: "translate(-20px, 20px) rotate(59deg)" }, { transform: "translate(720px, -270px) rotate(59deg)" }];

const moonSlowlyLeft = [
    { opacity: "1", transform: "translate(0,0)" },
    { opacity: "1", transform: "translate(-30px, -5px)" },
];

const earthSmaller = [{ opacity: "1", transform: "scale(.9) translate(-22px, 20px)" }];

const fade = [{ opacity: "1" }, { opacity: "0" }];

const panelReveal = [
    { transform: "translateX(-110%)", opacity: "0" },
    { transform: "translateX(0)", opacity: "1" },
];

const wipeLeftToRight = [
    { transform: "translateX(-110%)", opacity: "1" },
    { transform: "translateX(0)", opacity: "1" },
];

const wipeRightToLeft = [
    { transform: "translateX(110%)", opacity: "1" },
    { transform: "translateX(0)", opacity: "1" },
];

const wipeShrink = [
    { transform: "scale(1) translateX(0)", opacity: "1" },
    { transform: "scale(0) translateX(0)", opacity: "1" },
];

const moveAndZoom = [
    { transform: "translate(-100px, 60px) scale(1) rotate(90deg)" },
    { transform: "translate(-100px, 0px) scale(4.5) rotate(90deg)", offset: 0.2 },
    { transform: "translate(900px, -150px) scale(5) rotate(90deg)" },
];

const starShift = [{ backgroundPosition: "0px" }, { backgroundPosition: "-60px" }];

const smallSaturnShiftLeft = [{ transform: "translate(67px, 120px)" }, { transform: "translate(47px, 120px)" }];

const smallStripyShiftLeft = [{ transform: "translate(300px, 0px)" }, { transform: "translate(200px, 0px)" }];

const marsIn = [{ transform: "translateX(0)" }, { transform: "translateX(-200px)" }];

const marsUp = [{ transform: "translate(-400px, 1350px) scale(3)" }, { transform: "translate(-400px, 1050px) scale(3)" }];

const stripyUp = [{ transform: "translate(300px, 0)" }, { transform: "translate(300px, -78px)" }];

const rocketLand = [{ transform: "translate(500px, -10px) rotate(0deg) scale(3.5)" }, { transform: "translate(500px, 150px) rotate(0deg) scale(3.5)" }];

const flameOut = [{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }];

const eddieIn = [{ transform: "translate(0, 0)" }, { transform: "translate(0, -150px) rotate(4deg)" }];

// Scene timings
const sceneOneDuration = 5000;
const sceneTwoDuration = 5000;
const sceneThreeDuration = 5000;

const anim = () => {
    if (currentIdx === 0) {
        crawlText.animate(crawlTextOff, {
            duration: 0,
            fill: "forwards",
            direction: "reverse",
        });
    }
    if (currentIdx === 1) {
        panelIntro.textContent = `Scene ${currentIdx}: Solar Recon 9 Leaves Orbit!`;
        // Reset anything from future scenes
        crawlText.animate(crawlTextOff, {
            duration: 0,
            fill: "forwards",
            direction: "reverse",
        });
        stripePlanet.animate(fade, {
            fill: "both",
            duration: 0,
        });
        earth.animate(fade, {
            fill: "both",
            direction: "reverse",
            duration: 0,
        });
        mars.animate(fade, {
            fill: "both",
            duration: 0,
        });
        eddie.animate(fade, {
            fill: "both",
            duration: 0,
        });
        panelIntro.animate(panelReveal, {
            duration: 0,
            fill: "both",
            direction: "reverse",
        });
        // Start what we want to see
        crawlText
            .animate(crawlTextOff, {
                duration: 3000,
                fill: "forwards",
            })
            .finished.then(() => {
                ctlBlackHole.removeAttribute("disabled");
                wiper
                    .animate(fade, {
                        duration: sceneOneDuration / 10,
                        fill: "both",
                    })
                    .finished.then(() => {
                        panelIntro.animate(panelReveal, {
                            duration: sceneOneDuration / 7,
                            fill: "both",
                            easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
                        });
                        wiper.animate(wipeLeftToRight, {
                            duration: sceneOneDuration / 14,
                            delay: sceneOneDuration - sceneOneDuration / 7,
                            fill: "both",
                        });
                    });
                rocket.animate(rocketEarthToSpace, {
                    duration: sceneOneDuration,
                    fill: "both",
                });
                moon.animate(moonSlowlyLeft, {
                    duration: sceneOneDuration,
                    easing: "linear",
                });
                earth.animate(earthSmaller, {
                    duration: sceneOneDuration,
                    easing: "linear",
                });
                saturn
                    .animate([{ transform: "translate(400px, 50px)" }, { transform: "translate(380px, 48px)" }], {
                        duration: sceneOneDuration,
                        easing: "linear",
                    })
                    .finished.then(() => {
                        ctlBlackHole.setAttribute("disabled", "");
                    });
            });
    } else if (currentIdx === 2) {
        panelIntro.textContent = `Scene ${currentIdx}: Modern Warp-drive means Mars is just a 3-hour journey!`;

        // Reset anything from future scenes
        panelIntro.animate(panelReveal, {
            duration: 0,
            fill: "both",
            direction: "reverse",
        });
        stripePlanet.animate(fade, {
            fill: "both",
            direction: "reverse",
            duration: 0,
        });
        rocketFlame.animate(flameOut, {
            duration: 0,
            direction: "reverse",
            fill: "both",
        });
        eddie.animate(eddieIn, {
            duration: 0,
            fill: "both",
            direction: "reverse",
        });
        earth.animate(fade, {
            fill: "both",
            duration: 0,
        });
        moon.animate(fade, {
            fill: "both",
            duration: 0,
        });

        wiper
            .animate(wipeShrink, {
                duration: sceneTwoDuration / 7,
                fill: "both",
            })
            .finished.then(() => {
                wiper.animate(wipeRightToLeft, {
                    duration: sceneTwoDuration / 7,
                    delay: sceneTwoDuration - sceneTwoDuration / 7,
                    fill: "both",
                });
                panelIntro.animate(panelReveal, {
                    duration: sceneTwoDuration / 7,
                    fill: "both",
                    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
                });
            });
        saturn
            .animate(fade, {
                duration: 0,
                direction: "reverse",
                fill: "both",
            })
            .finished.then(() => {
                saturn.animate(smallSaturnShiftLeft, {
                    duration: sceneTwoDuration * 2,
                });
            });
        stripePlanet.animate(smallStripyShiftLeft, {
            duration: sceneTwoDuration * 2,
        });
        mars.animate(fade, {
            fill: "both",
            duration: 0,
            direction: "reverse",
        }).finished.then(() => {
            mars.animate(marsIn, {
                duration: sceneTwoDuration,
                fill: "both",
            });
        });
        rocket.animate(moveAndZoom, {
            fill: "both",
            duration: sceneTwoDuration,
            easing: "ease-in-out",
        });

        canvasArea.animate(starShift, {
            duration: sceneTwoDuration,
            fill: "both",
        });
    } else if (currentIdx === 3) {
        panelIntro.textContent = `Scene ${currentIdx}: On Mars. What new adventures await‽`;
        panelIntro.animate(panelReveal, {
            duration: 0,
            fill: "both",
            direction: "reverse",
        });
        saturn.animate(fade, {
            duration: 0,
            fill: "both",
        });
        wiper
            .animate(wipeLeftToRight, {
                duration: sceneThreeDuration / 14,
                fill: "both",
                direction: "reverse",
            })
            .finished.then(() => {
                panelIntro.animate(panelReveal, {
                    duration: sceneThreeDuration / 7,
                    fill: "both",
                    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
                });
            });
        stripePlanet.animate(stripyUp, {
            duration: sceneThreeDuration,
            fill: "both",
        });
        mars.animate(marsUp, {
            duration: sceneThreeDuration,
            fill: "both",
        });
        rocket
            .animate(rocketLand, {
                duration: sceneThreeDuration - sceneThreeDuration / 5,
                fill: "both",
            })
            .finished.then(() => {
                rocketFlame
                    .animate(flameOut, {
                        duration: sceneThreeDuration / 5,
                        fill: "both",
                    })
                    .finished.then(() => {
                        eddie.animate(fade, {
                            fill: "both",
                            duration: 0,
                            direction: "reverse",
                        });
                        eddie.animate(eddieIn, {
                            duration: 500,
                            fill: "forwards",
                            delay: 1000,
                            easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
                        });
                    });
            });
    }
};

// Set up forwards/backwards listener
function processDirectionClick(e) {
    // Are we going forwards ("1") or backwards "0")
    let polarity = e.target.id === "ctlPrev" ? 0 : 1;

    // Set the previousIdx to whatever we are currently, as that is where we are moving from
    previousIdx = currentIdx;

    // If forwards
    if (polarity === 1) {
        ctlPrev.removeAttribute("disabled");
        // If we are already at the end we can set the next btn to disabled and return early
        if (currentIdx === maxIdx) {
            return;
        }
        // Otherwise:
        e.target.removeAttribute("disabled");
        currentIdx = currentIdx++ >= maxIdx ? maxIdx : currentIdx++;
        // We have moved on one, if currentIdx is at the end we can disabled the button
        if (currentIdx === maxIdx) {
            e.target.setAttribute("disabled", "");
        }
    } else {
        ctlNext.removeAttribute("disabled");
        // When going backwards, if we are already at the beginning we can return early and set button to disabled
        if (currentIdx === 0) {
            return;
        }
        // Otherwise:
        e.target.removeAttribute("disabled");
        currentIdx = currentIdx-- <= 0 ? 0 : currentIdx--;
        if (currentIdx === 0) {
            e.target.setAttribute("disabled", "");
        }
    }
    console.log(previousIdx, currentIdx);

    // Here we are asking all running animations to finish and then setting up the next scene
    Promise.all(
        document.getAnimations().map((animation) => {
            animation.finish();
        })
    ).then(function () {
        ctlReadOut.textContent = `Showing ${currentIdx} of ${maxIdx} scenes`;
        document.documentElement.setAttribute("data-scene-no", `${currentIdx}`);
        anim();
    });
}

function togglePlayback() {
    document.getAnimations().map((animation) => {
        if (animation.playState === "running") {
            animation.pause();
        } else if (animation.playState === "paused") {
            animation.play();
        }
    });
}

function createBlackHole() {
    if (blackHoleActive === true || currentIdx !== 1) {
        return;
    }

    [ctlPrev, ctlNext, ctlPause].forEach((btn) => btn.setAttribute("disabled", ""));
    let c = canvasArea.getBoundingClientRect();

    // Function that returns random number between a range
    let randomFloat = (min, max) => Math.random() * (max - min) + min;

    // Creates a random coordinate in our canvas with buffer for black hole size
    function randCoords() {
        let randX = randomFloat(50, c.width - 50);
        let randY = randomFloat(50, c.height - 50);
        return {
            x: randX,
            y: randY,
        };
    }

    // What elements are we happy to be pulled into our black hole?
    let applicableItems = [earth, saturn, stripePlanet, mars, eddie, moon];

    // A function to check whether the item we are iterating over is in our list of applicableItems
    let isApplicable = (item) => applicableItems.includes(item.effect.target);

    // Save the result of producing some random coordinates
    let holeCoords = randCoords();

    // Make a black hole element and append it into our canvas area
    let DOMBlackHole = document.createElement("div");
    DOMBlackHole.classList.add("can-BlackHole");
    canvasArea.appendChild(DOMBlackHole);

    // Set the position of our black hole
    DOMBlackHole.style.left = `${holeCoords.x - 25}px`;
    DOMBlackHole.style.top = `${holeCoords.y - 25}px`;

    // Get anything in the document that is animating
    document.getAnimations().map((animation) => {
        // If it's one of the items we are interested in:
        if (isApplicable(animation)) {
            let animEle = animation.effect.target;
            let animEleGeometry = animEle.getBoundingClientRect();
            let animCoordsX = animEle.offsetLeft;
            let animCoordsY = animEle.offsetTop;
            let newCoords = {
                x: holeCoords.x - animCoordsX,
                y: holeCoords.y - animCoordsY,
            };
            // Get the element and animate it
            animation.effect.target.animate(
                [
                    { transform: window.getComputedStyle(animEle).transform, offset: 0.4 },
                    {
                        transform: `translate(${newCoords.x - animEleGeometry.width / 2}px, ${newCoords.y - animEleGeometry.height / 2}px) scale(.1)`,
                    },
                    {
                        transform: `translate(${newCoords.x - animEleGeometry.width / 2}px, ${newCoords.y - animEleGeometry.height / 2}px) scale(.1)`,
                        opacity: "0",
                        offset: 1,
                    },
                ],
                {
                    duration: 1500,
                    fill: "forwards",
                }
            );
        }
        // Set to true so we can't generate multiple black holes
        blackHoleActive = true;
    });
}
