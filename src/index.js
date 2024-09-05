// import soundCode from "./phases/sound"
import pageAnimation from "./phases/animation"
import SplitType from "split-type"
import map from "./phases/map";
import functionality from "./phases/functionality";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
// import slider from "./phases/slider";

gsap.registerPlugin(Observer)

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

const heroTestButn = document.querySelector("#header-dive");
heroTestButn.addEventListener('mouseover', () => {
  console.log('Button clicked, attempting to load sound module...');
  import('./phases/sound.js').then((module) => {
    const soundCode = module.default;
    soundCode(); // This is executed only after the button is clicked
  })
  .catch((error) => {
    console.error('Error loading the sound module:', error); // Step 3: Catch and log any errors
  });
});

pageAnimation()
functionality()
map()
// soundCode()
// slider()

//load by sections

//load slider function when you are in view.
// Select the section that you want to animate
const sliderSection = document.getElementById('r-sailing-trigger');

// Create an Intersection Observer to monitor when the section comes into view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("gsap working")
      // Section is in view, dynamically import GSAP animation code
      import('./phases/slider.js').then((module) => {
        const slider = module.default;
        slider(); // Execute the animation
      }).catch((err) => {
        console.error("Error loading the animation module:", err);
      });

      // Stop observing after the code is loaded and animation is triggered
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null, // Use the viewport as the root
  threshold: 0 // Trigger when 50% of the section is in view
});

// Start observing the section
observer.observe(sliderSection);
