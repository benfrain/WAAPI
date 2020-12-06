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
const KFcrawlTextOff = [
    { transform: "rotateX(70deg) translateZ(-400px) translateY(-700px)" },
    { transform: "rotateX(70deg) translateZ(-400px) translateY(-2500px)", opacity: "0" },
];

const KFrocketEarthToSpace = [{ transform: "translate(-20px, 20px) rotate(59deg)" }, { transform: "translate(720px, -270px) rotate(59deg)" }];

const KFmoonSlowlyLeft = [
    { opacity: "1", transform: "translate(0,0)" },
    { opacity: "1", transform: "translate(-30px, -5px)" },
];

const KFearthSmaller = [{ opacity: "1", transform: "scale(.9) translate(-22px, 20px)" }];

const KFfade = [{ opacity: "1" }, { opacity: "0" }];

const KFpanelReveal = [
    { transform: "translateX(-110%)", opacity: "0" },
    { transform: "translateX(0)", opacity: "1" },
];

const KFwipeLeftToRight = [
    { transform: "translateX(-110%)", opacity: "1" },
    { transform: "translateX(0)", opacity: "1" },
];

const KFwipeRightToLeft = [
    { transform: "translateX(110%)", opacity: "1" },
    { transform: "translateX(0)", opacity: "1" },
];

const KFwipeShrink = [
    { transform: "scale(1) translateX(0)", opacity: "1" },
    { transform: "scale(0) translateX(0)", opacity: "1" },
];

const KFmoveAndZoom = [
    { transform: "translate(-100px, 60px) scale(1) rotate(90deg)" },
    { transform: "translate(-100px, 0px) scale(4.5) rotate(90deg)", offset: 0.2 },
    { transform: "translate(900px, -150px) scale(5) rotate(90deg)" },
];

const KFstarShift = [{ backgroundPosition: "0px" }, { backgroundPosition: "-60px" }];
const KFsmallSaturnShiftLeft = [{ transform: "translate(67px, 120px)" }, { transform: "translate(47px, 120px)" }];
const KFsmallStripyShiftLeft = [{ transform: "translate(300px, 0px)" }, { transform: "translate(200px, 0px)" }];

const KFmarsIn = [{ transform: "translateX(0)" }, { transform: "translateX(-200px)" }];
const KFmarsUp = [{ transform: "translate(-400px, 1350px) scale(3)" }, { transform: "translate(-400px, 1050px) scale(3)" }];
const KFstripyUp = [{ transform: "translate(300px, 0)" }, { transform: "translate(300px, -78px)" }];

const KFrocketLand = [{ transform: "translate(500px, -10px) rotate(0deg) scale(3.5)" }, { transform: "translate(500px, 150px) rotate(0deg) scale(3.5)" }];

const KFflameOut = [{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }];

const KFeddieIn = [{ transform: "translate(0, 0)" }, { transform: "translate(0, -150px) rotate(4deg)" }];

// Scene timings
const sceneOneDuration = 5000;
const sceneTwoDuration = 5000;
const sceneThreeDuration = 5000;

// Refactored functions
const ANIMstarWarsTextOff = crawlText.animate(KFcrawlTextOff, {
    duration: sceneOneDuration / 3,
    fill: "forwards",
});
ANIMstarWarsTextOff.cancel();

const ANIMfadeStripyPlanet = stripePlanet.animate(KFfade, {
    fill: "both",
    duration: 0,
});
ANIMfadeStripyPlanet.cancel();

const ANIMearthFade = earth.animate(KFfade, {
    fill: "both",
    direction: "reverse",
    duration: 0,
});
ANIMearthFade.cancel();

const ANIMmarsFade = mars.animate(KFfade, {
    fill: "both",
    duration: 0,
});
ANIMmarsFade.cancel();

const ANIMeddieFade = eddie.animate(KFfade, {
    fill: "both",
    duration: 0,
});
ANIMeddieFade.cancel();

const ANIMpanelIntro = panelIntro.animate(KFpanelReveal, {
    duration: 0,
    fill: "both",
    direction: "reverse",
});
ANIMpanelIntro.cancel();

const ANIMwiperFade = wiper.animate(KFfade, {
    duration: sceneOneDuration / 10,
    fill: "both",
});
ANIMwiperFade.cancel();

const ANIMsceneOnePanelReveal = panelIntro.animate(KFpanelReveal, {
    duration: sceneOneDuration / 7,
    fill: "both",
    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
});
ANIMsceneOnePanelReveal.cancel();

const ANIMwiperLeftToRight = wiper.animate(KFwipeLeftToRight, {
    duration: sceneOneDuration / 14,
    delay: sceneOneDuration - sceneOneDuration / 7,
    fill: "both",
});
ANIMwiperLeftToRight.cancel();

const ANIMrocketEarthToSpace = rocket.animate(KFrocketEarthToSpace, {
    duration: sceneOneDuration,
    fill: "both",
});
ANIMrocketEarthToSpace.cancel();

const ANIMmoonSlowlyLeft = moon.animate(KFmoonSlowlyLeft, {
    duration: sceneOneDuration,
    easing: "linear",
});
ANIMmoonSlowlyLeft.cancel();

const ANIMearthSmaller = earth.animate(KFearthSmaller, {
    duration: sceneOneDuration,
    easing: "linear",
});
ANIMearthSmaller.cancel();

const ANIMsaturnSlowlyLeft = saturn.animate([{ transform: "translate(400px, 50px)" }, { transform: "translate(380px, 48px)" }], {
    duration: sceneOneDuration,
    easing: "linear",
});
ANIMsaturnSlowlyLeft.cancel();

const ANIMrocketFlame = rocketFlame.animate(KFflameOut, {
    duration: 0,
    direction: "reverse",
    fill: "both",
});
ANIMrocketFlame.cancel();

const ANIMeddieIn = eddie.animate(KFeddieIn, {
    duration: 0,
    fill: "both",
    direction: "reverse",
});
ANIMeddieIn.cancel();

const ANIMmoonFade = moon.animate(KFfade, {
    fill: "both",
    duration: 0,
});
ANIMmoonFade.cancel();

const ANIMwiperShrink = wiper.animate(KFwipeShrink, {
    duration: sceneTwoDuration / 7,
    fill: "both",
});
ANIMwiperShrink.cancel();

const ANIMwiperRightToLeft = wiper.animate(KFwipeRightToLeft, {
    duration: sceneTwoDuration / 7,
    delay: sceneTwoDuration - sceneTwoDuration / 7,
    fill: "both",
});
ANIMwiperRightToLeft.cancel();

const ANIMsceneTwoPanelReveal = panelIntro.animate(KFpanelReveal, {
    duration: sceneTwoDuration / 7,
    fill: "both",
    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
});
ANIMsceneTwoPanelReveal.cancel();

const ANIMsmallSaturnShiftLeft = saturn.animate(KFsmallSaturnShiftLeft, {
    duration: sceneTwoDuration * 2,
});
ANIMsmallSaturnShiftLeft.cancel();

const ANIMsmallStripyShiftLeft = stripePlanet.animate(KFsmallStripyShiftLeft, {
    duration: sceneTwoDuration * 2,
});
ANIMsmallStripyShiftLeft.cancel();

const ANIMmarsIn = mars.animate(KFmarsIn, {
    duration: sceneTwoDuration,
    fill: "both",
});
ANIMmarsIn.cancel();

const ANIMrocketMoveAndZoom = rocket.animate(KFmoveAndZoom, {
    fill: "both",
    duration: sceneTwoDuration,
    easing: "ease-in-out",
});
ANIMrocketMoveAndZoom.cancel();

const ANIMcanvasStarShift = canvasArea.animate(KFstarShift, {
    duration: sceneTwoDuration,
    fill: "both",
});
ANIMcanvasStarShift.cancel();

const ANIMsaturnFade = saturn.animate(KFfade, {
    duration: 0,
    direction: "reverse",
    fill: "both",
});
ANIMsaturnFade.cancel();

const ANIMwiperLeftToRightScene3 = wiper.animate(KFwipeLeftToRight, {
    duration: sceneThreeDuration / 14,
    fill: "both",
    direction: "reverse",
});

ANIMwiperLeftToRightScene3.cancel();

const ANIMsceneThreePanelReveal = panelIntro.animate(KFpanelReveal, {
    duration: sceneThreeDuration / 7,
    fill: "both",
    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
});
ANIMsceneThreePanelReveal.cancel();

const ANIMstripyPlanetUp = stripePlanet.animate(KFstripyUp, {
    duration: sceneThreeDuration,
    fill: "both",
});
ANIMstripyPlanetUp.cancel();

const ANIMmarsUp = mars.animate(KFmarsUp, {
    duration: sceneThreeDuration,
    fill: "both",
});
ANIMmarsUp.cancel();

const ANIMrocketLand = rocket.animate(KFrocketLand, {
    duration: sceneThreeDuration - sceneThreeDuration / 5,
    fill: "both",
});
ANIMrocketLand.cancel();

const ANIMrocketFlameOut = rocketFlame.animate(KFflameOut, {
    duration: sceneThreeDuration / 5,
    fill: "both",
});
ANIMrocketFlameOut.cancel();

const ANIMeddiePopIn = eddie.animate(KFeddieIn, {
    duration: sceneThreeDuration / 10,
    fill: "forwards",
    delay: sceneThreeDuration / 5,
    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
});
ANIMeddiePopIn.cancel();

function resetAnimations(arrayOfAnimations) {
    arrayOfAnimations.forEach((animation) => {
        animation.currentTime = 0;
        animation.pause();
    });
}

const anim = () => {
    if (currentIdx === 0) {
        resetAnimations([ANIMstarWarsTextOff, ANIMwiperFade, ANIMwiperLeftToRight]);
        ANIMwiperRightToLeft.cancel();
        ANIMwiperLeftToRight.cancel();
    }
    if (currentIdx === 1) {
        panelIntro.textContent = `Scene ${currentIdx}: Solar Recon 9 Leaves Orbit!`;
        resetAnimations([
            ANIMstarWarsTextOff,
            ANIMfadeStripyPlanet,
            ANIMearthFade,
            ANIMmarsFade,
            ANIMeddieFade,
            ANIMpanelIntro,
            ANIMwiperFade,
            ANIMsceneOnePanelReveal,
            ANIMwiperLeftToRight,
            ANIMrocketEarthToSpace,
            ANIMcanvasStarShift,
            ANIMmoonSlowlyLeft,
            ANIMearthSmaller,
            ANIMsaturnSlowlyLeft,
        ]);
        ANIMfadeStripyPlanet.playbackRate = 1;
        ANIMfadeStripyPlanet.finish();
        ANIMrocketMoveAndZoom.cancel();
        ANIMwiperRightToLeft.cancel();
        ANIMwiperLeftToRight.cancel();
        ANIMmoonFade.cancel();
        ANIMwiperShrink.cancel();
        ANIMmarsIn.cancel();
        // Start what we want to see
        ANIMstarWarsTextOff.play();
        ANIMstarWarsTextOff.finished.then(() => {
            ctlBlackHole.removeAttribute("disabled");
            ANIMwiperFade.play();
            ANIMwiperFade.finished.then(() => {
                ANIMsceneOnePanelReveal.play();
                ANIMwiperLeftToRight.play();
                ANIMrocketEarthToSpace.play();
                ANIMmoonSlowlyLeft.play();
                ANIMearthSmaller.play();
                ANIMsaturnSlowlyLeft.play();
                ANIMsaturnSlowlyLeft.finished.then(() => {
                    ctlBlackHole.setAttribute("disabled", "");
                });
            });
        });
    } else if (currentIdx === 2) {
        panelIntro.textContent = `Scene ${currentIdx}: Modern Warp-drive means Mars is just a 3-hour journey!`;

        // Reset anything from future scenes
        resetAnimations([
            ANIMpanelIntro,
            ANIMfadeStripyPlanet,
            ANIMearthFade,
            ANIMrocketFlame,
            ANIMeddieIn,
            ANIMmoonFade,
            ANIMrocketFlameOut,
            ANIMeddieFade,
            ANIMmarsIn,
            ANIMsmallStripyShiftLeft,
            ANIMwiperRightToLeft,
        ]);
        ANIMfadeStripyPlanet.playbackRate = -1;
        ANIMrocketLand.cancel();
        ANIMearthFade.playbackRate = -1;
        ANIMearthSmaller.finish();
        ANIMearthSmaller.cancel();
        ANIMeddiePopIn.cancel();

        // Mars
        ANIMmarsUp.cancel();
        ANIMmarsFade.cancel();

        // Stripy
        ANIMstripyPlanetUp.cancel();

        // Wiper reset
        ANIMwiperLeftToRightScene3.cancel();
        ANIMwiperLeftToRight.cancel();
        ANIMwiperRightToLeft.cancel();

        ANIMwiperShrink.play();
        ANIMwiperShrink.finished.then(() => {
            ANIMwiperRightToLeft.play();
            ANIMsceneTwoPanelReveal.play();
        });
        ANIMsaturnFade.play();
        ANIMsaturnFade.finished.then(() => {
            ANIMsmallSaturnShiftLeft.play();
        });
        ANIMsmallStripyShiftLeft.play();
        ANIMmarsIn.play();
        ANIMrocketMoveAndZoom.play();
        ANIMcanvasStarShift.play();
    } else if (currentIdx === 3) {
        panelIntro.textContent = `Scene ${currentIdx}: On Mars. What new adventures await‽`;

        resetAnimations([ANIMpanelIntro, ANIMsaturnFade, ANIMrocketFlame]);
        ANIMrocketFlameOut.cancel();
        ANIMrocketFlame.play();
        ANIMwiperLeftToRightScene3.play();
        ANIMwiperLeftToRightScene3.finished.then(() => {
            ANIMsceneThreePanelReveal.play();
        });
        ANIMstripyPlanetUp.play();
        ANIMmarsUp.play();
        ANIMrocketLand.play();
        ANIMrocketLand.finished.then(() => {
            ANIMrocketFlameOut.play();
            ANIMrocketFlameOut.finished.then(() => {
                ANIMeddieFade.playbackRate = -1;
                ANIMeddiePopIn.play();
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
