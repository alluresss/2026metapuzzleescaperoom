const ROOM_COUNT = 6;
const STORAGE_KEY = "escapeRoomPrototypeState";

const roomData = {
  room1: {
    title: "Outside the House",
    startStatus: "The front door is locked. Find a way to wake up the keypad.",
    completeMessage: "The keypad accepts 517125. The front door opens into the bathroom.",
    objects: {
      porchChair: {
        name: "Porch Chair",
        description: "A weathered porch chair covered in carved and painted bird decorations.",
        inspect: "The bird decorations keep repeating one bird: EAGLE. If A=1, EAGLE becomes 5-1-7-12-5, or 517125 as a six-digit code.",
      },
      doorbell: {
        name: "Doorbell",
        description: "A brass doorbell beside the locked door. It looks recently polished.",
        inspect: "The chime echoes through the house. Something inside the keypad clicks after the fifth ring.",
        customActions: [{ label: "Ring doorbell", type: "ring-doorbell" }],
      },
      doormat: {
        name: "Doormat",
        description: "A coarse welcome mat lies in front of the door.",
        inspect: "The mat has a suspicious lump under one corner.",
        pickup: { item: "gold key 5", label: "Lift mat and take gold key 5" },
      },
      frontDoor: {
        name: "Locked Door",
        description: "The door to the house is shut tight. A numerical keypad is mounted next to it.",
        inspect: "The door has no ordinary keyhole, only the keypad.",
      },
      outsideKeypad: {
        name: "Numerical Keypad",
        description: "A six-digit keypad. At first, the keys refuse to accept input.",
        inspect: "Before five doorbell rings, it stays dark. Afterward, it waits for a six-digit code.",
        customActions: [{ label: "Enter 517125", type: "room1-keypad" }],
      },
    },
  },
  room2: {
    title: "Bathroom",
    startStatus: "The bathroom exit has a number lock. Search the fixtures for hidden writing and keys.",
    completeMessage: "The bathroom door accepts 628976 and opens into the kitchen.",
    objects: {
      towel: {
        name: "Towel",
        description: "A folded towel hangs beside the sink.",
        inspect: "Something crinkles inside the folded towel.",
        pickup: { item: "crumpled paper", label: "Take crumpled paper" },
      },
      toothbrush: {
        name: "Toothbrush",
        description: "A toothbrush sits in a cup by the sink.",
        inspect: "The toothbrush is ordinary, but its cup is dry. Nobody has used it in a while.",
      },
      toilet: {
        name: "Toilet and Shower",
        description: "The toilet and shower are clean, but the room feels hastily abandoned.",
        inspect: "No hidden items here. The shower steam may once have revealed something, but not now.",
      },
      garbageCan: {
        name: "Garbage Can",
        description: "A small trash can has been shoved under the sink.",
        inspect: "Inside is a small locked box, thrown away in a hurry.",
      },
      bathroomBox: {
        name: "Small Locked Box",
        description: "A small lockbox recovered from the garbage can. Its lock looks gold-key sized.",
        inspect: "The box needs a small gold key.",
      },
      bathroomDrawer: {
        name: "Locked Drawer",
        description: "A drawer under the sink is sealed by a letter combination lock.",
        inspect: "The six-letter lock is ready for a word. The airplane figurine suggests AIRBUS.",
        customActions: [{ label: "Enter AIRBUS", type: "room2-drawer" }],
      },
      bathroomDoor: {
        name: "Number-Locked Door",
        description: "The way onward is blocked by a six-digit number combination lock.",
        inspect: "The lock needs the hidden number from the revealed note.",
        customActions: [{ label: "Enter 628976", type: "room2-door" }],
      },
    },
  },
  room3: {
    title: "Kitchen",
    startStatus: "The kitchen smells like dust and old recipes. A locked box waits among the cookware.",
    completeMessage: "The red button drops a hidden latch. You escape into the living room.",
    objects: {
      refrigerator: {
        name: "Refrigerator",
        description: "A refrigerator packed with ingredients, leftovers, and one suspicious stick of butter.",
        inspect: "Among the food, the butter is the only ingredient from the pancake recipe that looks untouched.",
        pickup: { item: "butter", label: "Take butter" },
      },
      potsPans: {
        name: "Pots and Pans",
        description: "A clattering stack of cookware fills a low cabinet.",
        inspect: "Behind the pans is a locked box. It has a small label that says key 7.",
      },
      microwave: {
        name: "Microwave",
        description: "An old microwave with a numeric timer.",
        inspect: "It is waiting for a cooking time. The recipe book says to microwave for some amount of time.",
        customActions: [{ label: "Microwave butter for 124315 seconds", type: "room3-microwave" }],
      },
      recipeBook: {
        name: "Recipe Book",
        description: "A stained recipe book lies open on the counter.",
        inspect: "Pancakes: 1 tbsp Baking Powder, 2 tbsp Sugar, 4 tsp Salt, 3 tbsp Butter, 1 Egg, 5 tbsp Flour. Taking the ingredient initials in amount order gives B-S-S-B-E-F, so butter is connected to 124315 seconds.",
      },
      kitchenBox: {
        name: "Locked Box",
        description: "A metal box hidden inside the pots and pans.",
        inspect: "The box is labelled 7 and needs the matching key.",
      },
      redButton: {
        name: "Red Button",
        description: "A red button sits inside the opened lockbox.",
        inspect: "Pressing it should release the kitchen exit.",
        customActions: [{ label: "Press red button", type: "room3-button" }],
      },
    },
  },
  room4: {
    title: "Living Room",
    startStatus: "The living room lights are dim. Invisible ink from earlier may reveal what matters.",
    completeMessage: "Key 4 turns in the living room door, opening the way to the master bedroom.",
    objects: {
      livingTv: {
        name: "TV",
        description: "A blank TV with a locked service panel and a row of labelled ports behind it.",
        inspect: "One port is labelled FOLIO. The panel is locked with a key labelled 1.",
      },
      livingCouch: {
        name: "Couch",
        description: "A couch with a note tucked deep between the cushions.",
        inspect: "The handwritten note looks blank unless you use the invisible-ink light.",
      },
      livingDrawers: {
        name: "Combination Drawers",
        description: "A bank of drawers protected by a four-digit combination lock.",
        inspect: "The drawers need the code derived from the invisible annotations in the two old books.",
        customActions: [{ label: "Enter 2651", type: "room4-drawers" }],
      },
      oldBooks: {
        name: "Two Old Books",
        description: "Two old books sit side by side. Their margins look too clean.",
        inspect: "Invisible ink reveals strings: 56YGFR, ASE32Q, 9IKLP0, WAZXDE, 8UJKLO9, DRTGVC, U89OKJ, CFGB, SDR43W, I90PLK, MJHB, W34RDS. The annotations resolve to 2651.",
      },
      floorKey: {
        name: "Key on the Ground",
        description: "Once the TV lights up, a glint appears on the ground: a key labelled 4.",
        inspect: "The key was impossible to notice before the TV and lights came on.",
        pickup: { item: "key 4", label: "Pick up key 4" },
      },
      livingDoor: {
        name: "Locked Door",
        description: "The living room exit has a keyhole marked 4.",
        inspect: "It needs key 4.",
      },
    },
  },
  room5: {
    title: "Master Bedroom",
    startStatus: "The master bedroom door is electrical. The computer likely controls it.",
    completeMessage: "The computer accepts admin / OVERRIDE and unlocks the electrical door to the basement.",
    objects: {
      nightstand: {
        name: "Nightstand Drawers",
        description: "The nightstand drawers are locked with a three-digit combination.",
        inspect: "A nearby phone shows 6:07. The alarm clock can reveal another time; subtract 345 from 607 to get 262.",
        customActions: [{ label: "Enter 262", type: "room5-nightstand" }],
      },
      computer: {
        name: "Locked Computer",
        description: "A computer login screen blocks the electrical door controls.",
        inspect: "It asks for a username and password. A hidden note gives the username; previous puzzle answers point to OVERRIDE.",
        customActions: [{ label: "Login admin / OVERRIDE", type: "room5-computer" }],
      },
      bed: {
        name: "Bed",
        description: "The bed is unmade. A phone is tangled in the sheets.",
        inspect: "The phone shows the time 6:07.",
      },
      alarmClock: {
        name: "Alarm Clock",
        description: "The alarm clock has buttons labelled RBG, CLEAR, and ENTER.",
        inspect: "Pressing RBG then ENTER makes the clock glow with the time 3:45.",
        customActions: [{ label: "Press RBG ENTER", type: "room5-clock" }],
      },
      lamp: {
        name: "Lamp with Keyhole",
        description: "A bedside lamp has a tiny keyhole labelled 2.",
        inspect: "A key labelled 2 should open the lamp compartment.",
      },
    },
  },
  room6: {
    title: "Basement",
    startStatus: "Five keyholes stand between you and the final escape. The numbered keys spell a word.",
    completeMessage: "You insert the keys in BADGE order: 2, 1, 4, 7, 5. The basement exit unlocks. You escaped!",
    objects: {
      keyholes: {
        name: "Five Keyholes",
        description: "Five keyholes wait in a row. The collected numbered keys must be inserted in a word order.",
        inspect: "The available keys are 1, 2, 4, 5, and 7. BADGE maps to B=2, A=1, D=4, G=7, E=5, so the key order is 2-1-4-7-5.",
        customActions: [{ label: "Insert keys in BADGE order", type: "room6-keyholes" }],
      },
      basementDoor: {
        name: "Final Door",
        description: "A heavy basement door with no handle, only the five-key mechanism.",
        inspect: "It will open only after the five keyholes are solved.",
      },
      wallMarkings: {
        name: "Wall Markings",
        description: "Scratched letters on the wall read: BADGE.",
        inspect: "BADGE is not a password; it is the order for your numbered keys.",
      },
    },
  },
};

const defaultRoomState = () => ({ collected: [], flags: {}, complete: false });
const defaultState = {
  unlockedRoom: 1,
  inventory: [],
  rooms: Object.fromEntries(Array.from({ length: ROOM_COUNT }, (_, index) => [`room${index + 1}`, defaultRoomState()])),
};

let state = loadState();
let selectedObjectId = null;

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return structuredClone(defaultState);
  }

  const parsed = JSON.parse(saved);
  const merged = structuredClone(defaultState);
  merged.unlockedRoom = parsed.unlockedRoom || 1;
  merged.inventory = parsed.inventory || [];

  Object.keys(merged.rooms).forEach((roomKey) => {
    merged.rooms[roomKey] = { ...merged.rooms[roomKey], ...(parsed.rooms?.[roomKey] || parsed[roomKey] || {}) };
  });

  return merged;
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentRoomNumber() {
  return Number(document.body.dataset.room || "1");
}

function currentRoomKey() {
  return `room${currentRoomNumber()}`;
}

function currentRoom() {
  return roomData[currentRoomKey()];
}

function currentRoomState() {
  return state.rooms[currentRoomKey()];
}

function initialisePage() {
  updateRoomLocks();

  if (currentRoomNumber() > state.unlockedRoom) {
    showLockedRoom();
    return;
  }

  if (document.querySelector(".room-canvas")) {
    wireRoomObjects();
    renderInventory();
    wireResetButton();
    setStatus(currentRoom().startStatus);
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
  const message = `Room ${currentRoomNumber()} is locked. Complete Room ${currentRoomNumber() - 1} first.`;
  const copy = document.querySelector(".locked-copy");
  if (copy) {
    copy.textContent = message;
  }

  document.querySelectorAll(".room-object").forEach((button) => {
    button.setAttribute("disabled", "true");
  });
  document.getElementById("object-name") && (document.getElementById("object-name").textContent = "Room locked");
  document.getElementById("object-description") && (document.getElementById("object-description").textContent = message);
  setStatus(message, true);
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
    setStatus("Progress reset. Start again outside the house.");
  });
}

function selectObject(objectId) {
  selectedObjectId = objectId;
  const object = currentRoom().objects[objectId];

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

  const object = currentRoom().objects[objectId];
  actions.append(createActionButton("Inspect", () => inspectObject(objectId), true));

  if (object.pickup && canPickup(objectId, object.pickup.item)) {
    actions.append(createActionButton(object.pickup.label || `Pick up ${object.pickup.item}`, () => collectItem(object.pickup.item)));
  }

  object.customActions?.forEach((action) => {
    actions.append(createActionButton(action.label, () => runCustomAction(action.type)));
  });

  state.inventory.forEach((item) => {
    actions.append(createActionButton(`Use ${item}`, () => useItemOnObject(item, objectId)));
  });
}

function canPickup(objectId, item) {
  const roomState = currentRoomState();
  if (roomState.collected.includes(item)) {
    return false;
  }

  if (item === "key 4") {
    return Boolean(roomState.flags.tvLit);
  }

  return true;
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
  setStatus(currentRoom().objects[objectId].inspect || "You do not notice anything else yet.");
}

function collectItem(item) {
  if (!state.inventory.includes(item)) {
    state.inventory.push(item);
  }
  if (!currentRoomState().collected.includes(item)) {
    currentRoomState().collected.push(item);
  }
  saveState();
  renderInventory();
  renderActions(selectedObjectId);
  setStatus(`Added ${item} to your inventory.`);
}

function useItemOnObject(item, objectId) {
  const roomNumber = currentRoomNumber();
  const roomState = currentRoomState();

  if (roomNumber === 2 && item === "gold key 5" && objectId === "bathroomBox") {
    roomState.flags.boxOpen = true;
    saveState();
    addInventoryItem("airplane figurine");
    setStatus("The gold key opens the discarded box. Inside is a small airplane figurine. From earlier answers, it must be an Airbus.");
    return;
  }

  if (roomNumber === 2 && item === "invisible-ink light" && objectId === "towel") {
    if (!state.inventory.includes("crumpled paper")) {
      setStatus("Find the crumpled paper folded inside the towel before shining the light through it.", true);
      return;
    }
    roomState.flags.paperRevealed = true;
    saveState();
    setStatus("The crumpled paper reveals: 'I do not have much time. They’re coming. I was once where you were as well. I’ve tried to leave you hints through this note. But I cannot make it too obvious. Or else he will find out.' The sentence word counts are 6-2-8-9-7-6.");
    return;
  }

  if (roomNumber === 3 && item === "key 7" && objectId === "kitchenBox") {
    roomState.flags.boxOpen = true;
    saveState();
    setStatus("Key 7 opens the box and reveals a red button.");
    return;
  }

  if (roomNumber === 4 && item === "invisible-ink light" && objectId === "livingCouch") {
    setStatus("The couch note appears in invisible ink: 'Remember: Buy Groceries.'");
    return;
  }

  if (roomNumber === 4 && item === "invisible-ink light" && objectId === "oldBooks") {
    setStatus("The light reveals the book annotations. Solving them gives the drawer combination 2651.");
    return;
  }

  if (roomNumber === 4 && item === "key 1" && objectId === "livingTv") {
    roomState.flags.tvPanelOpen = true;
    saveState();
    setStatus("Key 1 opens the TV service panel. One cable port is labelled FOLIO.");
    return;
  }

  if (roomNumber === 4 && item === "cable" && objectId === "livingTv") {
    if (!roomState.flags.tvPanelOpen) {
      setStatus("The cable cannot reach the FOLIO port until the TV panel is unlocked with key 1.", true);
      return;
    }
    roomState.flags.tvLit = true;
    saveState();
    renderActions(selectedObjectId);
    setStatus("You plug the cable into FOLIO. The TV and lights turn on, revealing key 4 on the ground.");
    return;
  }

  if (roomNumber === 4 && item === "key 4" && objectId === "livingDoor") {
    completeRoom();
    return;
  }

  if (roomNumber === 5 && item === "key 2" && objectId === "lamp") {
    roomState.flags.lampOpen = true;
    saveState();
    setStatus("Key 2 opens the lamp. A note reads: 'I’m sorry. I can’t help you anymore.' Invisible ink adds: username = admin. Password = [scribbled].");
    return;
  }

  setStatus(`${capitalize(item)} does not seem to work on the ${currentRoom().objects[objectId].name.toLowerCase()}.`, true);
}

function addInventoryItem(item) {
  if (!state.inventory.includes(item)) {
    state.inventory.push(item);
  }
  if (!currentRoomState().collected.includes(item)) {
    currentRoomState().collected.push(item);
  }
  saveState();
  renderInventory();
  renderActions(selectedObjectId);
}

function runCustomAction(actionType) {
  const roomState = currentRoomState();

  if (actionType === "ring-doorbell") {
    roomState.flags.doorbellRings = (roomState.flags.doorbellRings || 0) + 1;
    saveState();
    const rings = roomState.flags.doorbellRings;
    setStatus(rings >= 5 ? "After the fifth ring, the numerical keypad wakes up and accepts input." : `The doorbell rings. Count: ${rings}/5.`);
    return;
  }

  if (actionType === "room1-keypad") {
    if ((roomState.flags.doorbellRings || 0) < 5) {
      setStatus("The keypad is still locked and will not accept anything. Ring the doorbell five times first.", true);
      return;
    }
    completeRoom();
    return;
  }

  if (actionType === "room2-drawer") {
    if (!state.inventory.includes("airplane figurine")) {
      setStatus("You need the airplane clue before the letter lock makes sense.", true);
      return;
    }
    roomState.flags.drawerOpen = true;
    addInventoryItem("invisible-ink light");
    setStatus("AIRBUS opens the drawer. Inside is a light that reveals invisible ink.");
    return;
  }

  if (actionType === "room2-door") {
    if (!roomState.flags.paperRevealed) {
      setStatus("You have not revealed the note's hidden sentence counts yet.", true);
      return;
    }
    completeRoom();
    return;
  }

  if (actionType === "room3-microwave") {
    if (!state.inventory.includes("butter")) {
      setStatus("The microwave is empty. Take the butter from the refrigerator first.", true);
      return;
    }
    addInventoryItem("key 7");
    setStatus("After 124315 seconds, the butter melts away to reveal a key labelled 7.");
    return;
  }

  if (actionType === "room3-button") {
    if (!roomState.flags.boxOpen) {
      setStatus("The red button is still locked inside the box.", true);
      return;
    }
    completeRoom();
    return;
  }

  if (actionType === "room4-drawers") {
    roomState.flags.drawersOpen = true;
    addInventoryItem("key 1");
    addInventoryItem("cable");
    setStatus("The code 2651 opens the drawers. Inside are a key labelled 1 and a cable.");
    return;
  }

  if (actionType === "room5-clock") {
    roomState.flags.clockLit = true;
    saveState();
    setStatus("RBG ENTER lights the alarm clock, showing 3:45. With the phone's 6:07, 607 - 345 = 262.");
    return;
  }

  if (actionType === "room5-nightstand") {
    if (!roomState.flags.clockLit) {
      setStatus("Find the second time on the alarm clock before solving the nightstand.", true);
      return;
    }
    addInventoryItem("key 2");
    setStatus("The nightstand opens with 262. Inside is a key labelled 2.");
    return;
  }

  if (actionType === "room5-computer") {
    if (!roomState.flags.lampOpen) {
      setStatus("The computer still needs the hidden username clue from the lamp.", true);
      return;
    }
    completeRoom();
    return;
  }

  if (actionType === "room6-keyholes") {
    const requiredKeys = ["key 2", "key 1", "key 4", "key 7", "gold key 5"];
    const missing = requiredKeys.filter((item) => !state.inventory.includes(item));
    if (missing.length > 0) {
      setStatus(`You are missing: ${missing.join(", ")}.`, true);
      return;
    }
    completeRoom();
  }
}

function completeRoom() {
  const roomNumber = currentRoomNumber();
  const roomState = currentRoomState();
  roomState.complete = true;
  state.unlockedRoom = Math.max(state.unlockedRoom, Math.min(roomNumber + 1, ROOM_COUNT));
  saveState();
  updateRoomLocks();
  setStatus(currentRoom().completeMessage);
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
