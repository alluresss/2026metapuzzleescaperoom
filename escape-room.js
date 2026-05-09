const ROOM_COUNT = 6;
const STORAGE_KEY = "escapeRoomPrototypeState";

const roomData = {
  couch: {
    name: "Couch",
    description: "A red couch with deep cushions. One cushion looks slightly raised.",
    inspect: "You lift the cushion and find a torn note: 'The TV remembers the channel 4-2-7.'",
  },
  tv: {
    name: "TV",
    description: "An old television. The screen is dark, but the remote sensor blinks faintly.",
    inspect: "The TV flashes the numbers 4-2-7 before going dark again.",
  },
  coffeeTable: {
    name: "Coffee Table",
    description: "A low wooden table with scratches, cup rings, and one tiny brass key.",
    inspect: "The key is small enough for a cabinet or keyhole. It has a tag that says 'side door'.",
    pickup: "brass key",
  },
  keys: {
    name: "Loose Keys",
    description: "A bright set of keys left in plain sight. One key has a square head.",
    inspect: "Most of the keys are decoys, but the square-headed key feels useful.",
    pickup: "square key",
  },
  combinationLock: {
    name: "Combination Lock",
    description: "A chunky three-digit combination lock. Its dial is currently set to 000.",
    inspect: "A smudge pattern suggests the digits 4, 2, and 7 are used often.",
    customActions: [{ label: "Enter 427", type: "solve-combo" }],
  },
  keyhole: {
    name: "Keyhole",
    description: "A small keyhole built into the exit door plate.",
    inspect: "The brass plate is scratched by years of hurried escapes.",
  },
  bookshelf: {
    name: "Bookshelf",
    description: "Rows of puzzle books and fake encyclopedias lean at odd angles.",
    inspect: "One book spine reads: 'Start simple. Pick things up. Try them on locks.'",
  },
  painting: {
    name: "Painting",
    description: "A crooked landscape painting hangs above the room.",
    inspect: "Behind the frame is a sticky note: 'Key first. Code second. Door last.'",
  },
  exitDoor: {
    name: "Exit Door",
    description: "The locked exit to Room 2. It has both a keyhole and a combination hasp.",
    inspect: "The door will not budge until the keyhole and combination lock are both solved.",
  },
};

const defaultState = {
  unlockedRoom: 1,
  inventory: [],
  room1: {
    collected: [],
    comboSolved: false,
    keyholeSolved: false,
    complete: false,
  },
};

let state = loadState();
let selectedObjectId = null;

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return structuredClone(defaultState);
  }

  return { ...structuredClone(defaultState), ...JSON.parse(saved) };
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentRoomNumber() {
  return Number(document.body.dataset.room || "1");
}

function initialisePage() {
  updateRoomLocks();

  if (currentRoomNumber() > state.unlockedRoom) {
    showLockedRoom();
    return;
  }

  wirePlaceholderRoom();

  if (document.querySelector(".room-canvas")) {
    wireRoomObjects();
    renderInventory();
    wireResetButton();
    setStatus("Select a rectangle to inspect it or use inventory items.");
  }
}

function updateRoomLocks() {
  document.querySelectorAll(".room-link").forEach((link, index) => {
    const roomNumber = index + 1;
    const isUnlocked = roomNumber <= state.unlockedRoom;
    link.classList.toggle("locked", !isUnlocked);
    link.classList.toggle("unlocked", isUnlocked);
    link.setAttribute("aria-disabled", String(!isUnlocked));

    if (!isUnlocked) {
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });
}

function showLockedRoom() {
  const copy = document.querySelector(".locked-copy");
  if (copy) {
    copy.textContent = `Room ${currentRoomNumber()} is locked. Complete Room ${currentRoomNumber() - 1} first.`;
  }

  document.querySelector(".placeholder-complete")?.setAttribute("disabled", "true");
}

function wirePlaceholderRoom() {
  const button = document.querySelector(".placeholder-complete");
  if (!button) {
    return;
  }

  const roomNumber = currentRoomNumber();
  const copy = document.querySelector(".locked-copy");
  if (copy) {
    copy.textContent = `Room ${roomNumber} is unlocked. Placeholder objects are ready for future puzzles.`;
  }

  if (roomNumber >= ROOM_COUNT) {
    button.textContent = "All rooms complete";
  }

  button.addEventListener("click", () => {
    state.unlockedRoom = Math.max(state.unlockedRoom, Math.min(roomNumber + 1, ROOM_COUNT));
    saveState();
    updateRoomLocks();
    button.textContent = roomNumber >= ROOM_COUNT ? "All rooms complete" : `Room ${roomNumber + 1} unlocked`;
  });
}

function wireRoomObjects() {
  document.querySelectorAll(".room-object").forEach((button) => {
    button.addEventListener("click", () => selectObject(button.dataset.object));
  });
}

function wireResetButton() {
  document.getElementById("reset-progress")?.addEventListener("click", () => {
    state = structuredClone(defaultState);
    saveState();
    selectedObjectId = null;
    document.querySelectorAll(".room-object").forEach((button) => button.classList.remove("selected"));
    document.getElementById("object-name").textContent = "Nothing selected";
    document.getElementById("object-description").textContent = "Click a rectangle in the room to open its popup description here.";
    document.getElementById("object-actions").replaceChildren();
    renderInventory();
    updateRoomLocks();
    setStatus("Progress reset. Try collecting items and solving the room again.");
  });
}

function selectObject(objectId) {
  selectedObjectId = objectId;
  const object = roomData[objectId];

  document.querySelectorAll(".room-object").forEach((button) => {
    button.classList.toggle("selected", button.dataset.object === objectId);
  });

  document.getElementById("object-name").textContent = object.name;
  document.getElementById("object-description").textContent = object.description;
  renderActions(objectId);
  setStatus("Choose an action below.");
}

function renderActions(objectId) {
  const actions = document.getElementById("object-actions");
  actions.replaceChildren();

  const inspectButton = createActionButton("Inspect", () => inspectObject(objectId), true);
  actions.append(inspectButton);

  const object = roomData[objectId];
  if (object.pickup && !state.room1.collected.includes(object.pickup)) {
    actions.append(createActionButton(`Pick up ${object.pickup}`, () => collectItem(object.pickup)));
  }

  object.customActions?.forEach((action) => {
    actions.append(createActionButton(action.label, () => runCustomAction(action.type)));
  });

  state.inventory.forEach((item) => {
    actions.append(createActionButton(`Use ${item}`, () => useItemOnObject(item, objectId)));
  });
}

function createActionButton(label, onClick, isPrimary = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `action-button${isPrimary ? " primary-action" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function inspectObject(objectId) {
  setStatus(roomData[objectId].inspect || "You do not notice anything else yet.");
}

function collectItem(item) {
  if (!state.inventory.includes(item)) {
    state.inventory.push(item);
  }
  if (!state.room1.collected.includes(item)) {
    state.room1.collected.push(item);
  }
  saveState();
  renderInventory();
  renderActions(selectedObjectId);
  setStatus(`Added ${item} to your inventory.`);
}

function useItemOnObject(item, objectId) {
  if (item === "brass key" && objectId === "keyhole") {
    state.room1.keyholeSolved = true;
    saveState();
    setStatus("The brass key turns smoothly in the keyhole.");
    checkRoomCompletion();
    return;
  }

  if (item === "square key" && objectId === "exitDoor") {
    setStatus("The square key fits a decoy plate, but the main door still needs the brass key and combination.", true);
    return;
  }

  setStatus(`${capitalize(item)} does not seem to work on the ${roomData[objectId].name.toLowerCase()}.`, true);
}

function runCustomAction(actionType) {
  if (actionType === "solve-combo") {
    state.room1.comboSolved = true;
    saveState();
    setStatus("The combination lock clicks open with 4-2-7.");
    checkRoomCompletion();
  }
}

function checkRoomCompletion() {
  if (state.room1.comboSolved && state.room1.keyholeSolved) {
    state.room1.complete = true;
    state.unlockedRoom = Math.max(state.unlockedRoom, 2);
    saveState();
    updateRoomLocks();
    setStatus("Room 1 complete! Room 2 is now unlocked in the room navigation.");
  }
}

function renderInventory() {
  const list = document.getElementById("inventory-list");
  if (!list) {
    return;
  }

  list.replaceChildren();
  if (state.inventory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-inventory";
    empty.textContent = "Your inventory is empty.";
    list.append(empty);
    return;
  }

  state.inventory.forEach((item) => {
    const itemElement = document.createElement("button");
    itemElement.type = "button";
    itemElement.className = "inventory-item";
    itemElement.textContent = item;
    itemElement.addEventListener("click", () => {
      if (!selectedObjectId) {
        setStatus(`Select a room object before using ${item}.`, true);
        return;
      }
      useItemOnObject(item, selectedObjectId);
    });
    list.append(itemElement);
  });
}

function setStatus(message, isError = false) {
  const status = document.getElementById("status-message");
  if (!status) {
    return;
  }
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

initialisePage();
