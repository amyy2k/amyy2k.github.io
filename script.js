gsap.registerPlugin(ScrollTrigger);





gsap.to(".fullName", {
  scrollTrigger: {
    trigger: ".fullName",
    start: "1400px center",
    end: "1850px top",
    scrub: 3,
    pin: true,
  },
});



const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".flower",
    start: "50px center",
    end: "2000px center",
    scrub: 5,
    pin: true,
  }
});

tl.to(".flower", {
  x: -900,  // Move left
  rotation: 70,
  duration: 5 // Duration to reach the left position
});

tl.to(".flower", {
  x: 600,  // Move right
  rotation: 0, // Increase rotation if desired
  duration: 5 // Duration to reach the right position
});


gsap.to(".lastName", {
  scrollTrigger: {
    trigger: ".firstName",  // This should probably be changed to ".lastName" if the trigger is the element itself
    start: "600px top",  // Adjusted to start after the .fullName animation ends
    end: "600px top",
    scrub: 3,
  },
  x: 600,
  y: 480,
  duration: 2
});

gsap.to(".firstName", {
  scrollTrigger: {
    trigger: ".firstName",
    start: "600px top",  // Adjusted to start after the .fullName animation ends
    end: "600px top",
    scrub: 3,
  },
  x: -600,
  y: -280,
  duration: 2
});

gsap.to(".welcome",{
  scrollTrigger:{
    trigger: ".firstName",
    start: "-50px bottom",
    end: "100px 800px",
    scrub: 3,
  },

  opacity: 0,
  duration: 2
});


gsap.timeline({
  scrollTrigger: {
    trigger: ".firstName",
    start: "600px top",
    end: "600px top",
    scrub: 3,
  }
})
.to(".goal", {opacity: 0.5, delay: 4}); // Then transitions to opacity 0.5 after 2 seconds

gsap.timeline({
  scrollTrigger: {
    trigger: ".firstName",
    start: "600px top",
    end: "600px top",
    scrub: 3,
  }
})
.to(".bulletpoints", {opacity: .75, delay: 15}); // Then transitions to opacity 0.5 after 2 seconds

gsap.to(".top-line", {
  scrollTrigger: {
    trigger: ".firstName",
    start: "600px top",  // Adjusted to start after the .fullName animation ends
    end: "600px top",
    scrub: 3, // Smooth scrubbing effect with the scroll
  },
  width: "1500px" // Animate width from 0% to 100% based on the scroll
});

gsap.to(".left-line", {
  scrollTrigger: {
    trigger: ".firstName",
    start: "600px top",  // Adjusted to start after the .fullName animation ends
    end: "600px top",
    scrub: 3, // Smooth scrubbing effect with the scroll
  },
  height: "721px" // Animate width from 0% to 100% based on the scroll
});

gsap.to(".bottom-line", {
  scrollTrigger: {
    trigger: ".firstName",
    start: "600px top",  // Adjusted to start after the .fullName animation ends
    end: "600px top",
    scrub: 3, // Smooth scrubbing effect with the scroll
  },
  width: "1350px" // Animate width from 0% to 100% based on the scroll
});

gsap.to(".right-line", {
  scrollTrigger: {
    trigger: ".firstName",
    start: "600px top",  // Adjusted to start after the .fullName animation ends
    end: "600px top",
    scrub: 3, // Smooth scrubbing effect with the scroll
  },
  height: "690px" // Animate width from 0% to 100% based on the scroll
});



function showBox(id) {
  const boxes = document.querySelectorAll('.info-box');
  const activeBox = document.getElementById(id);

  boxes.forEach(box => {
    if (box !== activeBox && box.classList.contains('show')) {
      box.classList.remove('show');
    }
  });

  // Delay showing the new one to allow transition
  setTimeout(() => {
    activeBox.classList.add('show');
  }, 100); // 100ms gives a clean exit before new one slides in
}
