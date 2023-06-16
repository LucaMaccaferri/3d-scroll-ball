const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 300;

function getlength(number) {
  return number.toString().length;
}

const currentFrame = (index) => {
   const nOfNumber = getlength(index + 1)
   const nOfZero = 4 - nOfNumber
   let zeri = ""
   for (let i = 0; i < nOfZero; i++) {
     zeri = zeri + "0"
   }
   const number = index + 1
   console.log(zeri , number)
   return `./frame/${( zeri + number).toString()}.png`
  };

const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});

gsap.fromTo(
  ".ball-text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,

      start: "50%",
      end: "60%",
    },
    onComplete: () => {
      gsap.to(".ball-text", { opacity: 0 });
    },
  }
);

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}

/*function checkScroll() {
  // Calcola la posizione dello scorrimento
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Ottieni l'altezza del div iniziale
  var introDivHeight = document.getElementById('intro-div').offsetHeight;

  // Verifica se lo scorrimento supera l'altezza del div iniziale
  if (scrollPosition > introDivHeight) {
    // Mostra il canvas
    document.getElementById('my-canvas').style.display = 'block';
  }
}

// Aggiungi l'evento di scorrimento per chiamare la funzione checkScroll
window.onscroll = function() {
  checkScroll();
};
*/