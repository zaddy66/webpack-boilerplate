import soundCode from "./phases/sound"
import pageAnimation from "./phases/animation"
import SplitType from "split-type"
import map from "./phases/map";
import functionality from "./phases/functionality";
import slider from "./phases/slider";

//split type
//split text
let splitText;
function runSplit() {
  splitText = new SplitType("[text-split]", {
    types: "words, chars",
  });
}
runSplit();

// ————— Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    splitText.revert();
    runSplit();
  }
});

//using unload function to scroll to top
$(window).on("unload", function () {
    $(window).scrollTop(0);
  });

pageAnimation()
functionality()
map()
soundCode()
slider()