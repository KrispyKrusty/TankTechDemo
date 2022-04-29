//////////////////////////
// Variable Definitions //
//////////////////////////

const $ = qry => document.querySelector(qry);
const $all = qry => document.querySelectorAll(qry);

const wrapper = $("#wrapper");
const grid = $("#grid");
const terminal = $("#terminal");
const output = $("#output");

let playerCount = parseInt(prompt("How many players are there?")) || 2;
let playersSpawned = 0;
let currentPlayer = 0;
let actions = 2;

const gridSize = {
  columns: parseInt(prompt("Amount of columns:")) || 20,
  rows: parseInt(prompt("Amount of rows:")) || 12,
  get tiles() { return this.rows * this.columns },
}

const Actions = {
  Spawning: "Spawning",
  Moving: "Moving",
  Attacking: "Attacking",
  Building: "Building",
  Demolishing: "Demolishing",
}
let currentAction = Actions.Spawning;


  ///////////////
 // Functions //
///////////////

const str_to_html = (str) => {
  const elem = document.createElement("div");
  elem.innerHTML = str;
  return elem.children;
}

const clickedTile = (x, y) => {
  const tile = getTile(x, y);

  switch (currentAction) {
    case Actions.Spawning:
      if (tile.children.length > 0) return;
      output.innerText = `Columns: ${gridSize.columns}, Rows: ${gridSize.rows}, Tiles: ${gridSize.tiles}`
      playersSpawned++;
      tile.insertAdjacentHTML("beforeend", `<div id="player-${playersSpawned}" class="player">${playersSpawned}</div>`);
      if (playersSpawned >= playerCount) {
        for (let i = 1; i < Object.keys(Actions).length; i++) {
          // terminal.insertAdjacentHTML("beforeend", `<button id="${Object.keys(Actions)[i].toLowerCase()}-button" onclick="setCurrentAction(this.id)">${Object.keys(Actions)[i].replace('ing','').toUpperCase()}</button>`);
          terminal.insertAdjacentHTML("beforeend", `<button id="${Object.keys(Actions)[i].toLowerCase()}-button" class="inactive" onclick="setCurrentAction(this.id)"></button>`);
          if ($("#moving-button")) $("#moving-button").innerText = "MOVE";
          if ($("#attacking-button")) $("#attacking-button").innerText = "ATK";
          if ($("#building-button")) $("#building-button").innerText = "BLD";
          if ($("#demolishing-button")) $("#demolishing-button").innerText = "DSTR";
        }
        nextTurn();
      };
      break;

    case Actions.Moving:
      break;
      
      case Actions.Attacking:
        break;
        
        case Actions.Building:
      break;
      
    case Actions.Demolishing:
      break;
  }
}

const nextTurn = () => {
  currentAction = false;
  currentPlayer++;
  output.innerText = `It is now player ${currentPlayer}'s turn [${actions}/2 actions left]`
}

const setCurrentAction = (actionBtn) => {
  if (!actionBtn) return;
  const cList = $(`#${actionBtn}`).classList;
  const newAction = actionBtn.charAt(0).toUpperCase() + actionBtn.slice(1).replace('-button', '');
  
  Array.from(terminal.children).forEach(elem => {
    const cList = elem.classList;
    cList.toggle("inactive", !cList.toggle("active", false));
  });

  console.log(currentAction + " is a " + typeof currentAction + " but  " + newAction + " is a " + typeof newAction)
  // console.log(Actions.find(newAction))
  if (newAction == currentAction) {
    cList.toggle("inactive", !cList.toggle("active", false));
    currentAction = false;
  } else {
    cList.toggle("active", !cList.toggle("inactive", false));
    currentAction = Object.keys(Actions).find(newAction);
  }

}

const getTile = (x, y) => (document.getElementById(`-${x}-${y}`));

grid.style.gridTemplateColumns = `repeat(${gridSize.columns}, minmax(0, 1fr))`;
grid.style.gridTemplateRows = `repeat(${gridSize.rows}, minmax(0, 1fr))`;

Array.from(Array(gridSize.rows)).forEach((_, y) => {
  Array.from(Array(gridSize.columns)).forEach((_, x) => {
    grid.insertAdjacentHTML("beforeend", `<div class="tile" id="-${x}-${y}"></div>`);
    grid.children[grid.children.length - 1].onclick = () => {
      clickedTile(x, y);
    }
  });
});
  
window.onresize = () => {
  let scale = 1;
  const w = document.body.clientWidth;
  const h = document.body.clientHeight;
  if (w * 0.6 >= h) scale = h / 600;
  else scale = w / 1000;

  wrapper.style.transform = `translate(-50%, -50%) scale(${scale - 0.02}, ${scale - 0.02})`;
}
window.onresize();



  ///////////////////////////////////
 // THE FOLLOWING CODE IS YOINKED //
///////////////////////////////////

// (A) LOCK SCREEN ORIENTATION
function lock(orientation) {
  // (A1) GO INTO FULL SCREEN FIRST
  let de = document.documentElement;
  if (de.requestFullscreen) { de.requestFullscreen(); }
  else if (de.mozRequestFullScreen) { de.mozRequestFullScreen(); }
  else if (de.webkitRequestFullscreen) { de.webkitRequestFullscreen(); }
  else if (de.msRequestFullscreen) { de.msRequestFullscreen(); }

  // (A2) THEN LOCK ORIENTATION
  screen.orientation.lock(orientation);
}

// (B) UNLOCK SCREEN ORIENTATION
function unlock() {
  // (B1) UNLOCK FIRST
  screen.orientation.unlock();

  // (B2) THEN EXIT FULL SCREEN
  if (document.exitFullscreen) { document.exitFullscreen(); }
  else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
  else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
  else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}