
// // Extend the base functionality of JavaScript
// Array.prototype.last = function () {
//     return this[this.length - 1];
//   };
  
// // A sinus function that acceps degrees instead of radians
//   Math.sinus = function (degree) {
//     return Math.sin((degree / 180) * Math.PI);
//   };
  
//   // Game data
//   let phase = "waiting"; // waiting | stretching | turning | walking | transitioning | falling
//   let lastTimestamp; // The timestamp of the previous requestAnimationFrame cycle
  
//   let heroX; // Changes when moving forward
//   let heroY; // Only changes when falling
//   let sceneOffset; // Moves the whole game
  
//   let platforms = [];
//   let sticks = [];
//   // let trees = [];
//   let boats = [];

//   // Todo: Save high score to localStorage (?)
  
//   let score = 0;
  
//   // Configuration
//   const canvasWidth = 375;
//   const canvasHeight = 375;
//   const platformHeight = 100;
//   const heroDistanceFromEdge = 10; // While waiting
//   const paddingX = 100; // The waiting position of the hero in from the original canvas size
//   const perfectAreaSize = 10;
  
//   // The background moves slower than the hero
//   const backgroundSpeedMultiplier = 0.2;
  
//   const hill1BaseHeight = 100;
//   const hill1Amplitude = 10;
//   const hill1Stretch = 1;
//   const hill2BaseHeight = 70;
//   const hill2Amplitude = 20;
//   const hill2Stretch = 0.5;
  
//   const stretchingSpeed = 4; // Milliseconds it takes to draw a pixel
//   const turningSpeed = 4; // Milliseconds it takes to turn a degree
//   const walkingSpeed = 4;
//   const transitioningSpeed = 2;
//   const fallingSpeed = 2;
  
//   const heroWidth = 17; // 24
//   const heroHeight = 30; // 40
  
//   const canvas = document.getElementById("game");

//   // canvas.width = window.innerWidth; // Make the Canvas full screen
//   // canvas.height = window.innerHeight;

//   document.addEventListener('DOMContentLoaded', function() {
//     // Get a reference to the canvas element
//     const canvas = document.getElementById('game');

//     // Set the canvas width and height to match the window size
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Your other canvas initialization code can go here...
// });

  
//   const ctx = canvas.getContext("2d");
  
//   const introductionElement = document.getElementById("introduction");
//   const perfectElement = document.getElementById("perfect");
//   const restartButton = document.getElementById("restart");
//   const scoreElement = document.getElementById("score");
  
//   // Initialize layout
//   resetGame();
  
//   // Resets game variables and layouts but does not start the game (game starts on keypress)
//   function resetGame() {
//     // Reset game progress
//     phase = "waiting";
//     lastTimestamp = undefined;
//     sceneOffset = 0;
//     score = 0;
  
//     introductionElement.style.opacity = 1;
//     perfectElement.style.opacity = 0;
//     restartButton.style.display = "none";
//     scoreElement.innerText = score;
  
//     // The first platform is always the same
//     // x + w has to match paddingX
//     platforms = [{ x: 50, w: 50 }];
//     generatePlatform();
//     generatePlatform();
//     generatePlatform();
//     generatePlatform();
  
//     sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];
  
//     // trees = [];
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     // generateTree();
//     boats = [];
//     generateBoat();
//     generateBoat();
//     generateBoat();
//     generateBoat();
//     generateBoat();
//     generateBoat();
//     generateBoat();
//     generateBoat();
//     generateBoat();
//     generateBoat();
    

//     heroX = platforms[0].x + platforms[0].w - heroDistanceFromEdge;
//     heroY = 0;
  
//     draw();
//   }
  
//   // function generateTree() {
//   function generateBoat() {
//     const minimumGap = 30;
//     const maximumGap = 150;
  
//     // X coordinate of the right edge of the furthest tree
//     // const lastTree = trees[trees.length - 1];
//     // let furthestX = lastTree ? lastTree.x : 0;
//     const lastBoat = boats[boats.length - 1];
//     let furthestX = lastBoat ? lastBoat.x : 0;
  
//     const x =
//       furthestX +
//       minimumGap +
//       Math.floor(Math.random() * (maximumGap - minimumGap));
  
//     // const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
//     // const color = treeColors[Math.floor(Math.random() * 3)];
//     const boatColors = ["#4E6172", "#567587", "#6C7D8F"]; // Define boat colors
//     const color = boatColors[Math.floor(Math.random() * boatColors.length)]; // Choose a random color from boat colors
    
  
//     // trees.push({ x, color });
//     boats.push({ x, color });
//   }
  
//   function generatePlatform() {
//     const minimumGap = 40;
//     const maximumGap = 200;
//     const minimumWidth = 20;
//     const maximumWidth = 100;
  
//     // X coordinate of the right edge of the furthest platform
//     const lastPlatform = platforms[platforms.length - 1];
//     let furthestX = lastPlatform.x + lastPlatform.w;
  
//     const x =
//       furthestX +
//       minimumGap +
//       Math.floor(Math.random() * (maximumGap - minimumGap));
//     const w =
//       minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));
  
//     platforms.push({ x, w });
//   }
  
//   resetGame();
  
//   // If space was pressed restart the game
//   window.addEventListener("keydown", function (event) {
//     if (event.key == " ") {
//       event.preventDefault();
//       resetGame();
//       return;
//     }
//   });
  
//   window.addEventListener("mousedown", function (event) {
//     if (phase == "waiting") {
//       lastTimestamp = undefined;
//       introductionElement.style.opacity = 0;
//       phase = "stretching";
//       window.requestAnimationFrame(animate);
//     }
//   });
  
//   window.addEventListener("mouseup", function (event) {
//     if (phase == "stretching") {
//       phase = "turning";
//     }
//   });
  


  
//   window.addEventListener("resize", function (event) {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     draw();
//   });
  
//   window.requestAnimationFrame(animate);
  
//   // The main game loop
//   function animate(timestamp) {
//     if (!lastTimestamp) {
//       lastTimestamp = timestamp;
//       window.requestAnimationFrame(animate);
//       return;
//     }
  
//     switch (phase) {
//       case "waiting":
//         return; // Stop the loop
//       case "stretching": {
//         sticks.last().length += (timestamp - lastTimestamp) / stretchingSpeed;
//         break;
//       }
//       case "turning": {
//         sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;
  
//         if (sticks.last().rotation > 90) {
//           sticks.last().rotation = 90;
  
//           const [nextPlatform, perfectHit] = thePlatformTheStickHits();
//           if (nextPlatform) {
//             // Increase score
//             score += perfectHit ? 2 : 1;
//             scoreElement.innerText = score;
  
//             if (perfectHit) {
//               perfectElement.style.opacity = 1;
//               setTimeout(() => (perfectElement.style.opacity = 0), 1000);
//             }
  
//             generatePlatform();
//             // generateTree();
//             // generateTree();
//             generateBoat();
//             generateBoat();
//           }
  
//           phase = "walking";
//         }
//         break;
//       }
//       case "walking": {
//         heroX += (timestamp - lastTimestamp) / walkingSpeed;
  
//         const [nextPlatform] = thePlatformTheStickHits();
//         if (nextPlatform) {
//           // If hero will reach another platform then limit it's position at it's edge
//           const maxHeroX = nextPlatform.x + nextPlatform.w - heroDistanceFromEdge;
//           if (heroX > maxHeroX) {
//             heroX = maxHeroX;
//             phase = "transitioning";
//           }
//         } else {
//           // If hero won't reach another platform then limit it's position at the end of the pole
//           const maxHeroX = sticks.last().x + sticks.last().length + heroWidth;
//           if (heroX > maxHeroX) {
//             heroX = maxHeroX;
//             phase = "falling";
//           }
//         }
//         break;
//       }
//       case "transitioning": {
//         sceneOffset += (timestamp - lastTimestamp) / transitioningSpeed;
  
//         const [nextPlatform] = thePlatformTheStickHits();
//         if (sceneOffset > nextPlatform.x + nextPlatform.w - paddingX) {
//           // Add the next step
//           sticks.push({
//             x: nextPlatform.x + nextPlatform.w,
//             length: 0,
//             rotation: 0
//           });
//           phase = "waiting";
//         }
//         break;
//       }
//       case "falling": {
//         if (sticks.last().rotation < 180)
//           sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;
  
//         heroY += (timestamp - lastTimestamp) / fallingSpeed;
//         const maxHeroY =
//           platformHeight + 100 + (window.innerHeight - canvasHeight) / 2;
//         if (heroY > maxHeroY) {
//           restartButton.style.display = "block";
//           return;
//         }
//         break;
//       }
//       default:
//         throw Error("Wrong phase");
//     }
  
//     draw();
//     window.requestAnimationFrame(animate);
  
//     lastTimestamp = timestamp;
//   }
  
//   // Returns the platform the stick hit (if it didn't hit any stick then return undefined)
//   function thePlatformTheStickHits() {
//     if (sticks.last().rotation != 90)
//       throw Error(`Stick is ${sticks.last().rotation}°`);
//     const stickFarX = sticks.last().x + sticks.last().length;
  
//     const platformTheStickHits = platforms.find(
//       (platform) => platform.x < stickFarX && stickFarX < platform.x + platform.w
//     );
  
//     // If the stick hits the perfect area
//     if (
//       platformTheStickHits &&
//       platformTheStickHits.x + platformTheStickHits.w / 2 - perfectAreaSize / 2 <
//         stickFarX &&
//       stickFarX <
//         platformTheStickHits.x + platformTheStickHits.w / 2 + perfectAreaSize / 2
//     )
//       return [platformTheStickHits, true];
  
//     return [platformTheStickHits, false];
//   }
  
//   function draw() {
//     ctx.save();
//     ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
//     drawBackground();
  
//     // Center main canvas area to the middle of the screen
//     ctx.translate(
//       (window.innerWidth - canvasWidth) / 2 - sceneOffset,
//       (window.innerHeight - canvasHeight) / 2
//     );
  
//     // Draw scene
//     drawPlatforms();
//     drawHero();
//     drawSticks();
  
//     // Restore transformation
//     ctx.restore();
//   }
  
//   restartButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     resetGame();
//     restartButton.style.display = "none";
//   });
  
//   function drawPlatforms() {
//     platforms.forEach(({ x, w }) => {
//       // Draw platform
//       ctx.fillStyle = "black";
//       ctx.fillRect(
//         x,
//         canvasHeight - platformHeight,
//         w,
//         platformHeight + (window.innerHeight - canvasHeight) / 2
//       );
  
//       // Draw perfect area only if hero did not yet reach the platform
//       if (sticks.last().x < x) {
//         ctx.fillStyle = "red";
//         ctx.fillRect(
//           x + w / 2 - perfectAreaSize / 2,
//           canvasHeight - platformHeight,
//           perfectAreaSize,
//           perfectAreaSize
//         );
//       }
//     });
//   }
  
//   function drawHero() {
//     ctx.save();
//     ctx.fillStyle = "black";
//     ctx.translate(
//       heroX - heroWidth / 2,
//       heroY + canvasHeight - platformHeight - heroHeight / 2
//     );
  
//     // Body
//     drawRoundedRect(
//       -heroWidth / 2,
//       -heroHeight / 2,
//       heroWidth,
//       heroHeight - 4,
//       5
//     );
  
//     // Legs
//     const legDistance = 5;
//     ctx.beginPath();
//     ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
//     ctx.fill();
//     ctx.beginPath();
//     ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
//     ctx.fill();
  
//     // Eye
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
//     ctx.fill();
  
//     // Band
//     ctx.fillStyle = "red";
//     ctx.fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
//     ctx.beginPath();
//     ctx.moveTo(-9, -14.5);
//     ctx.lineTo(-17, -18.5);
//     ctx.lineTo(-14, -8.5);
//     ctx.fill();
//     ctx.beginPath();
//     ctx.moveTo(-10, -10.5);
//     ctx.lineTo(-15, -3.5);
//     ctx.lineTo(-5, -7);
//     ctx.fill();
  
//     ctx.restore();
//   }







  
//   function drawRoundedRect(x, y, width, height, radius) {
//     ctx.beginPath();
//     ctx.moveTo(x, y + radius);
//     ctx.lineTo(x, y + height - radius);
//     ctx.arcTo(x, y + height, x + radius, y + height, radius);
//     ctx.lineTo(x + width - radius, y + height);
//     ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
//     ctx.lineTo(x + width, y + radius);
//     ctx.arcTo(x + width, y, x + width - radius, y, radius);
//     ctx.lineTo(x + radius, y);
//     ctx.arcTo(x, y, x, y + radius, radius);
//     ctx.fill();
//   }
  
//   function drawSticks() {
//     sticks.forEach((stick) => {
//       ctx.save();
  
//       // Move the anchor point to the start of the stick and rotate
//       ctx.translate(stick.x, canvasHeight - platformHeight);
//       ctx.rotate((Math.PI / 180) * stick.rotation);
  
//       // Draw stick
//       ctx.beginPath();
//       ctx.lineWidth = 2;
//       ctx.moveTo(0, 0);
//       ctx.lineTo(0, -stick.length);
//       ctx.stroke();
  
//       // Restore transformations
//       ctx.restore();
//     });
//   }
  
//   function drawBackground() {
//     // Draw sky
//     var gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
//     gradient.addColorStop(0, "#BBD691");
//     gradient.addColorStop(1, "#FEF1E1");
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  
//     // Draw hills
//     // drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#95C629");
//     // drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#659F1C");
//     drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#361876");
//     drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#1B0C3B");
//     // Draw trees
//     // trees.forEach((tree) => drawTree(tree.x, tree.color));
//     // trees.forEach((tree) => drawTree(tree.x, tree.color));
//     boats.forEach((boat) => drawBoat(boat.x, boat.color));
//   }

//   // function drawBackground() {
//   //   // Draw a dark background
//   //   ctx.fillStyle = "#222"; // Dark gray
//   //   ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  
//   //   // Draw hills
//   //   drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#111"); // Dark green
//   //   drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#050"); // Darker green
  
//   //   // Draw trees with darker colors
//   //   trees.forEach((tree) => drawTree(tree.x, "#333")); // Dark brown
//   // }





  
//   // A hill is a shape under a stretched out sinus wave
//   function drawHill(baseHeight, amplitude, stretch, color) {
//     ctx.beginPath();
//     ctx.moveTo(0, window.innerHeight);
//     ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
//     for (let i = 0; i < window.innerWidth; i++) {
//       ctx.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
//     }
//     ctx.lineTo(window.innerWidth, window.innerHeight);
//     ctx.fillStyle = color;
//     ctx.fill();
//   }
  
//   // function drawTree(x, color) {
//   //   ctx.save();
//   //   ctx.translate(
//   //     (-sceneOffset * backgroundSpeedMultiplier + x) * hill1Stretch,
//   //     getTreeY(x, hill1BaseHeight, hill1Amplitude)
//   //   );
  
//   //   const treeTrunkHeight = 5;
//   //   const treeTrunkWidth = 2;
//   //   const treeCrownHeight = 25;
//   //   const treeCrownWidth = 10;
  
//   //   // Draw trunk
//   //   ctx.fillStyle = "#7D833C";
//   //   ctx.fillRect(
//   //     -treeTrunkWidth / 2,
//   //     -treeTrunkHeight,
//   //     treeTrunkWidth,
//   //     treeTrunkHeight
//   //   );
  
//   //   // Draw crown
//   //   ctx.beginPath();
//   //   ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
//   //   ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
//   //   ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight);
//   //   ctx.fillStyle = color;
//   //   ctx.fill();
  
//   //   ctx.restore();
//   // }

//   function drawBoat(x, color) {
//     const waterStretch = 0.5; // Example value, replace with the actual value you need
//     ctx.save();
//     ctx.translate(
//       (-sceneOffset * backgroundSpeedMultiplier + x) * waterStretch,
//       getWaterY(x, waterBaseHeight, waterAmplitude)
//     );
  
//     const boatWidth = 20;
//     const boatHeight = 10;
  
//     // Draw hull
//     ctx.fillStyle = "#4E6172";
//     ctx.fillRect(
//       -boatWidth / 2,
//       -boatHeight,
//       boatWidth,
//       boatHeight
//     );
  
//     // Draw cabin
//     const cabinWidth = 10;
//     const cabinHeight = 8;
//     ctx.fillStyle = color;
//     ctx.fillRect(
//       -cabinWidth / 2,
//       -boatHeight - cabinHeight,
//       cabinWidth,
//       cabinHeight
//     );
  
//     ctx.restore();
//   }
  
  
//   function getHillY(windowX, baseHeight, amplitude, stretch) {
//     const sineBaseY = window.innerHeight - baseHeight;
//     return (
//       Math.sinus((sceneOffset * backgroundSpeedMultiplier + windowX) * stretch) *
//         amplitude +
//       sineBaseY
//     );
//   }
  
//   // function getTreeY(x, baseHeight, amplitude) {
//   //   const sineBaseY = window.innerHeight - baseHeight;
//   //   return Math.sinus(x) * amplitude + sineBaseY;
//   // }
//   function getBoatY(x, baseHeight, amplitude) {
//     const sineBaseY = window.innerHeight - baseHeight;
//     return Math.sinus(x) * amplitude + sineBaseY;
//   }










// Extend the base functionality of JavaScript
Array.prototype.last = function () {
  return this[this.length - 1];
};

// A sinus function that acceps degrees instead of radians
Math.sinus = function (degree) {
  return Math.sin((degree / 180) * Math.PI);
};

// Game data
let phase = "waiting"; // waiting | stretching | turning | walking | transitioning | falling
let lastTimestamp; // The timestamp of the previous requestAnimationFrame cycle

let heroX; // Changes when moving forward
let heroY; // Only changes when falling
let sceneOffset; // Moves the whole game

let platforms = [];
let sticks = [];
let boats = [];

// Define the clouds array with initial cloud objects
let clouds = [
  { x: 100, y: 50, speed: 0.5 },
  { x: 300, y: 80, speed: 0.3 },
  { x: 500, y: 120, speed: 0.7 }
  // Add more cloud objects as needed
];


// Todo: Save high score to localStorage (?)

let score = 0;

// Configuration
const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;
const heroDistanceFromEdge = 10; // While waiting
const paddingX = 100; // The waiting position of the hero in from the original canvas size
const perfectAreaSize = 10;

// The background moves slower than the hero
const backgroundSpeedMultiplier = 0.2;

const hill1BaseHeight = 100;
const hill1Amplitude = 10;
const hill1Stretch = 1;
const hill2BaseHeight = 70;
const hill2Amplitude = 20;
const hill2Stretch = 0.5;

const stretchingSpeed = 4; // Milliseconds it takes to draw a pixel
const turningSpeed = 4; // Milliseconds it takes to turn a degree
const walkingSpeed = 4;
const transitioningSpeed = 2;
const fallingSpeed = 2;

const heroWidth = 17; // 24
const heroHeight = 30; // 40

const canvas = document.getElementById("game");

document.addEventListener('DOMContentLoaded', function() {
  // Get a reference to the canvas element
  const canvas = document.getElementById('game');

  // Set the canvas width and height to match the window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Your other canvas initialization code can go here...
});

const ctx = canvas.getContext("2d");

const introductionElement = document.getElementById("introduction");
const perfectElement = document.getElementById("perfect");
const restartButton = document.getElementById("restart");
const scoreElement = document.getElementById("score");

// Initialize layout
resetGame();

function resetGame() {
    // Reset game progress
    phase = "waiting";
    lastTimestamp = undefined;
    sceneOffset = 0;
    score = 0;

    introductionElement.style.opacity = 1;
    perfectElement.style.opacity = 0;
    restartButton.style.display = "none";
    scoreElement.innerText = score;

    // The first platform is always the same
    // x + w has to match paddingX
    platforms = [{ x: 50, w: 50 }];
    generatePlatform(); // Add this line
    generatePlatform(); // Add this line
    generatePlatform(); // Add this line
    generatePlatform(); // Add this line

    sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];

    // trees = [];
    // generateTree();
    // generateTree();
    // generateTree();
    // generateTree();
    // generateTree();
    // generateTree();
    // generateTree();
    // generateTree();
    // generateTree();
    // generateTree();
    boats = [];
    generateBoat();
    generateBoat();
    generateBoat();
    generateBoat();
    generateBoat();
    generateBoat();
    generateBoat();
    generateBoat();
    generateBoat();
    generateBoat();
    heroX = platforms[0].x + platforms[0].w - heroDistanceFromEdge;
    heroY = 0;

    draw();
}


// // Resets game variables and layouts but does not start the game (game starts on keypress)
// function resetGame() {
//   // Reset game progress
//   phase = "waiting";
//   lastTimestamp = undefined;
//   sceneOffset = 0;
//   score = 0;

//   introductionElement.style.opacity = 1;
//   perfectElement.style.opacity = 0;
//   restartButton.style.display = "none";
//   scoreElement.innerText = score;

//   // The first platform is always the same
//   // x + w has to match paddingX
//   platforms = [{ x: 50, w: 50 }];
//   generatePlatform();
//   generatePlatform();
//   generatePlatform();
//   generatePlatform();

//   sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];

//   boats = [];
//   generateBoat();
//   generateBoat();
//   generateBoat();
//   generateBoat();
//   generateBoat();
//   generateBoat();
//   generateBoat();
//   generateBoat();
//   generateBoat();
//   generateBoat();

//   heroX = platforms[0].x + platforms[0].w - heroDistanceFromEdge;
//   heroY = 0;

//   draw();
// }

function generateBoat() {
  const minimumGap = 30;
  const maximumGap = 150;

  const lastBoat = boats[boats.length - 1];
  let furthestX = lastBoat ? lastBoat.x : 0;

  const x =
      furthestX +
      minimumGap +
      Math.floor(Math.random() * (maximumGap - minimumGap));

  const boatColors = ["#4E6172", "#567587", "#6C7D8F"]; // Define boat colors
  const color = boatColors[Math.floor(Math.random() * boatColors.length)]; // Choose a random color from boat colors

  boats.push({ x, color });
}

function generatePlatform() {
  const minimumGap = 40;
  const maximumGap = 200;
  const minimumWidth = 20;
  const maximumWidth = 100;

  // X coordinate of the right edge of the furthest platform
  const lastPlatform = platforms[platforms.length - 1];
  let furthestX = lastPlatform.x + lastPlatform.w;

  const x =
      furthestX +
      minimumGap +
      Math.floor(Math.random() * (maximumGap - minimumGap));
  const w =
      minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));

  platforms.push({ x, w });
}


resetGame();

// If space was pressed restart the game
window.addEventListener("keydown", function (event) {
  if (event.key == " ") {
      event.preventDefault();
      resetGame();
      return;
  }
});

window.addEventListener("mousedown", function (event) {
  if (phase == "waiting") {
      lastTimestamp = undefined;
      introductionElement.style.opacity = 0;
      phase = "stretching";
      window.requestAnimationFrame(animate);
  }
});

window.addEventListener("mouseup", function (event) {
  if (phase == "stretching") {
      phase = "turning";
  }
});

window.addEventListener("resize", function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
});

window.requestAnimationFrame(animate);

// The main game loop
function animate(timestamp) {
  if (!lastTimestamp) {
      lastTimestamp = timestamp;
      window.requestAnimationFrame(animate);
      return;
  }

  switch (phase) {
      case "waiting":
          return; // Stop the loop
      case "stretching": {
          sticks.last().length += (timestamp - lastTimestamp) / stretchingSpeed;
          break;
      }
      case "turning": {
          sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;

          if (sticks.last().rotation > 90) {
              sticks.last().rotation = 90;

              const [nextPlatform, perfectHit] = thePlatformTheStickHits();
              if (nextPlatform) {
                  // Increase score
                  score += perfectHit ? 2 : 1;
                  scoreElement.innerText = score;

                  if (perfectHit) {
                      perfectElement.style.opacity = 1;
                      setTimeout(() => (perfectElement.style.opacity = 0), 1000);
                  }

                  generatePlatform();
                  generateBoat();
                  generateBoat();
              }

              phase = "walking";
          }
          break;
      }
      case "walking": {
          heroX += (timestamp - lastTimestamp) / walkingSpeed;

          const [nextPlatform] = thePlatformTheStickHits();
          if (nextPlatform) {
              // If hero will reach another platform then limit it's position at it's edge
              const maxHeroX = nextPlatform.x + nextPlatform.w - heroDistanceFromEdge;
              if (heroX > maxHeroX) {
                  heroX = maxHeroX;
                  phase = "transitioning";
              }
          } else {
              // If hero won't reach another platform then limit it's position at the end of the pole
              const maxHeroX = sticks.last().x + sticks.last().length + heroWidth;
              if (heroX > maxHeroX) {
                  heroX = maxHeroX;
                  phase = "falling";
              }
          }
          break;
      }
      case "transitioning": {
          sceneOffset += (timestamp - lastTimestamp) / transitioningSpeed;

          const [nextPlatform] = thePlatformTheStickHits();
          if (sceneOffset > nextPlatform.x + nextPlatform.w - paddingX) {
              // Add the next step
              sticks.push({
                  x: nextPlatform.x + nextPlatform.w,
                  length: 0,
                  rotation: 0
              });
              phase = "waiting";
          }
          break;
      }
      case "falling": {
          if (sticks.last().rotation < 180)
              sticks.last().rotation += (timestamp - lastTimestamp) / turningSpeed;

          heroY += (timestamp - lastTimestamp) / fallingSpeed;
          const maxHeroY =
              platformHeight + 100 + (window.innerHeight - canvasHeight) / 2;
          if (heroY > maxHeroY) {
              restartButton.style.display = "block";
              return;
          }
          break;
      }
      default:
          throw Error("Wrong phase");
  }

  
  // Move clouds
  moveClouds();

  draw();
  window.requestAnimationFrame(animate);

  lastTimestamp = timestamp;
}

// Returns the platform the stick hit (if it didn't hit any stick then return undefined)
function thePlatformTheStickHits() {
  if (sticks.last().rotation != 90)
      throw Error(`Stick is ${sticks.last().rotation}°`);
  const stickFarX = sticks.last().x + sticks.last().length;

  const platformTheStickHits = platforms.find(
      (platform) => platform.x < stickFarX && stickFarX < platform.x + platform.w
  );

  // If the stick hits the perfect area
  if (
      platformTheStickHits &&
      platformTheStickHits.x + platformTheStickHits.w / 2 - perfectAreaSize / 2 <
      stickFarX &&
      stickFarX <
      platformTheStickHits.x + platformTheStickHits.w / 2 + perfectAreaSize / 2
  )
      return [platformTheStickHits, true];

  return [platformTheStickHits, false];
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  drawBackground();

  // Center main canvas area to the middle of the screen
  ctx.translate(
      (window.innerWidth - canvasWidth) / 2 - sceneOffset,
      (window.innerHeight - canvasHeight) / 2
  );

  // Draw scene
  drawPlatforms();
  drawHero();
  drawSticks();

  // Restore transformation
  ctx.restore();
}

restartButton.addEventListener("click", function (event) {
  event.preventDefault();
  resetGame();
  restartButton.style.display = "none";
});

function drawPlatforms() {
  platforms.forEach(({ x, w }) => {
      // Draw platform
      ctx.fillStyle = "black";
      ctx.fillRect(
          x,
          canvasHeight - platformHeight,
          w,
          platformHeight + (window.innerHeight - canvasHeight) / 2
      );

      // Draw perfect area only if hero did not yet reach the platform
      if (sticks.last().x < x) {
          ctx.fillStyle = "red";
          ctx.fillRect(
              x + w / 2 - perfectAreaSize / 2,
              canvasHeight - platformHeight,
              perfectAreaSize,
              perfectAreaSize
          );
      }
  });
}

function drawHero() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.translate(
      heroX - heroWidth / 2,
      heroY + canvasHeight - platformHeight - heroHeight / 2
  );

  // Body
  drawRoundedRect(
      -heroWidth / 2,
      -heroHeight / 2,
      heroWidth,
      heroHeight - 4,
      5
  );

  // Legs
  const legDistance = 5;
  ctx.beginPath();
  ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
  ctx.fill();

  // Eye
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
  ctx.fill();

  // Band
  ctx.fillStyle = "red";
  ctx.fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
  ctx.beginPath();
  ctx.moveTo(-9, -14.5);
  ctx.lineTo(-17, -18.5);
  ctx.lineTo(-14, -8.5);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-10, -10.5);
  ctx.lineTo(-15, -3.5);
  ctx.lineTo(-5, -7);
  ctx.fill();

  ctx.restore();
}

function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.fill();
}

function drawSticks() {
  sticks.forEach((stick) => {
      ctx.save();

      // Move the anchor point to the start of the stick and rotate
      ctx.translate(stick.x, canvasHeight - platformHeight);
      ctx.rotate((Math.PI / 180) * stick.rotation);

      // Draw stick
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -stick.length);
      ctx.stroke();

      // Restore transformations
      ctx.restore();
  });
}

// Define the drawMoon function
function drawMoon() {
  // Save the current canvas state
  ctx.save();

  // Set moon properties
  const moonRadius = 30;
  const moonX = 300; // Adjust the x-coordinate of the moon
  const moonY = 100; // Adjust the y-coordinate of the moon

  // Draw the moon
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#D9F1FF"; // Set moon color
  ctx.fill();

  // Restore the canvas state
  ctx.restore();
}

// Define the drawCloud function
function drawCloud(x, y) {
  ctx.save();
  
  // Draw the cloud
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.arc(x + 15, y - 10, 25, 0, Math.PI * 2);
  ctx.arc(x + 40, y, 20, 0, Math.PI * 2);
  ctx.arc(x + 15, y + 10, 25, 0, Math.PI * 2);
  ctx.fillStyle = "#C7C4BF";
  ctx.fill();
  
  ctx.restore();
}

// Define the moveClouds function to handle cloud movement
function moveClouds() {
    // Move clouds horizontally
    clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > window.innerWidth + 50) {
            // Reset cloud position when it moves out of view
            cloud.x = -50;
        }
    });
}

// Modify the drawBackground function to include drawing the moon
function drawBackground() {
  // Draw sky
  var gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  gradient.addColorStop(0, "#BBD691");
  gradient.addColorStop(0, "#483C62");
  gradient.addColorStop(1, "#FEF1E1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // Draw hills
  drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#361876");
  drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#1B0C3B");

  // Draw the moon
  drawMoon();

  
  // Draw clouds
  clouds.forEach((cloud) => {
    drawCloud(cloud.x, cloud.y);
  });
}


// function drawBackground() {
//   // Draw sky
//   var gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
//   gradient.addColorStop(0, "#BBD691");
//   gradient.addColorStop(1, "#FEF1E1");
//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

//   // Draw hills
//   drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#361876");
//   drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#1B0C3B");
// }

// A hill is a shape under a stretched out sinus wave
function drawHill(baseHeight, amplitude, stretch, color) {
  ctx.beginPath();
  ctx.moveTo(0, window.innerHeight);
  ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
  for (let i = 0; i < window.innerWidth; i++) {
      ctx.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
  }
  ctx.lineTo(window.innerWidth, window.innerHeight);
  ctx.fillStyle = color;
  ctx.fill();
}

function getHillY(windowX, baseHeight, amplitude, stretch) {
  return (
      window.innerHeight -
      baseHeight -
      Math.sinus(windowX * stretch) * amplitude
  );
}












