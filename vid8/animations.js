const ctlPrev = document.getElementById("ctlPrev");
const ctlNext = document.getElementById("ctlNext");
const ctlPause = document.getElementById("ctlPause");
const ctlBlackHole = document.getElementById("ctlBlackHole");
const ctlReadOut = document.getElementById("ctlReadOut");

ctlNext.addEventListener("click", processDirectionClick);
ctlPrev.addEventListener("click", processDirectionClick);

// we could set this dynamically based on data/DOM
const maxIdx = 3;

// lets for current/previous
let previousIdx = null;
let currentIdx = 0;

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
    });
}
