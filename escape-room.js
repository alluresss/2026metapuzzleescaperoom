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
        description: "An old porch chair covered in decorations and carvings of birds.",
        inspect: "An old porch chair covered in decorations and carvings of birds.",
      },
      doorbell: {
        name: "Doorbell",
        description: "A small, exquisitely made doorbell outside the locked door.",
        inspect: "A small, exquisitely made doorbell outside the locked door.",
        customActions: [{ label: "Ring doorbell", type: "ring-doorbell" }],
      },
      doormat: {
        name: "Doormat",
        description: "A coarse welcome mat; upon closer inspection, you see a key under it.",
        inspect: "A coarse welcome mat; upon closer inspection, you see a key under it.",
        pickup: { item: "gold key", label: "Lift mat and take Gold Key" },
      },
      frontDoor: {
        name: "Locked Door",
        description: "A large locked door, presumably the entrance to the house. It is locked tight, and has a small closed keypad.",
        inspect: "The door has no ordinary keyhole, only the keypad.",
      },
      outsideKeypad: {
        name: "Keypad",
        description: "A small locked numerical keypad.",
        inspect: "A small locked numerical keypad.",
        lockedWhen: {
          flag: "doorbellRings",
          untilAtLeast: 5,
          message: "The keypad is locked.",
        },
        customActions: [{ label: "Enter code", type: "room1-keypad", input: { placeholder: "6-digit code", answer: "517125", inputMode: "numeric" } }],
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
        description: "A small lockbox found inside the garbage can. Its lock looks gold-key sized.",
        inspect: "The box needs a small gold key.",
        visibleWhen: { flag: "bathroomBoxFound" },
      },
      bathroomDrawer: {
        name: "Locked Drawer",
        description: "A drawer under the sink is sealed by a letter combination lock.",
        inspect: "The six-letter lock is ready for a word. The airplane figurine suggests AIRBUS.",
        customActions: [{ label: "Enter word", type: "room2-drawer", input: { placeholder: "6-letter word", answer: "AIRBUS" } }],
      },
      bathroomDoor: {
        name: "Number-Locked Door",
        description: "The way onward is blocked by a six-digit number combination lock.",
        inspect: "The lock needs the hidden number from the revealed note.",
        customActions: [{ label: "Enter code", type: "room2-door", input: { placeholder: "6-digit code", answer: "628976", inputMode: "numeric" } }],
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
        customActions: [{ label: "Set microwave time", type: "room3-microwave", input: { placeholder: "seconds", answer: "124315", inputMode: "numeric" } }],
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
        visibleWhen: { flag: "kitchenBoxFound" },
      },
      redButton: {
        name: "Red Button",
        description: "A red button sits inside the opened lockbox.",
        inspect: "Pressing it should release the kitchen exit.",
        visibleWhen: { flag: "boxOpen" },
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
        customActions: [{ label: "Enter combination", type: "room4-drawers", input: { placeholder: "4-digit code", answer: "2651", inputMode: "numeric" } }],
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
        visibleWhen: { flag: "tvLit" },
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
        customActions: [{ label: "Enter combination", type: "room5-nightstand", input: { placeholder: "3-digit code", answer: "262", inputMode: "numeric" } }],
      },
      computer: {
        name: "Locked Computer",
        description: "A computer login screen blocks the electrical door controls.",
        inspect: "It asks for a username and password. A hidden note gives the username; previous puzzle answers point to OVERRIDE.",
        customActions: [{ label: "Log in", type: "room5-computer", input: { placeholder: "username / password", answer: "admin / OVERRIDE" } }],
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
let selectedInventoryItem = null;
let selectedPanelKind = null;

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return structuredClone(defaultState);
  }

  const parsed = JSON.parse(saved);
  const merged = structuredClone(defaultState);
  merged.unlockedRoom = parsed.unlockedRoom || 1;
  merged.inventory = (parsed.inventory || []).filter((item) => !["brass key", "square key"].includes(item));

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
  wireRoomNavigation();

  if (currentRoomNumber() > state.unlockedRoom) {
    showLockedRoom();
    return;
  }

  if (document.querySelector(".room-canvas")) {
    wireRoomObjects();
    wireCanvasReset();
    renderVisibleObjects();
    renderInventory();
    wireResetButton();
    setStatus(currentRoom().startStatus);
  }
}

function updateRoomLocks() {
  document.querySelectorAll(".room-link").forEach((link, index) => {
    const roomNumber = index + 1;
    const isUnlocked = roomNumber <= state.unlockedRoom;
    const isDiscovered = roomNumber <= state.unlockedRoom;

    link.hidden = !isDiscovered;
    link.classList.toggle("locked", !isUnlocked);
    link.classList.toggle("unlocked", isUnlocked);
    link.setAttribute("aria-disabled", String(!isUnlocked));
    link.onclick = !isUnlocked ? (event) => event.preventDefault() : null;
  });
}

function wireRoomNavigation() {
  document.querySelectorAll(".room-link").forEach((link) => {
    link.addEventListener("click", () => {
      resetObjectPanel();
    });
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


function renderVisibleObjects() {
  document.querySelectorAll(".room-object").forEach((button) => {
    const object = currentRoom().objects[button.dataset.object];
    const visible = !object?.visibleWhen || Boolean(currentRoomState().flags[object.visibleWhen.flag]);
    button.hidden = !visible;
    button.disabled = !visible;
  });
}

function isObjectVisible(objectId) {
  const object = currentRoom().objects[objectId];
  return !object?.visibleWhen || Boolean(currentRoomState().flags[object.visibleWhen.flag]);
}

function wireRoomObjects() {
  document.querySelectorAll(".room-object").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectObject(button.dataset.object);
    });
  });
}

function wireCanvasReset() {
  document.querySelector(".room-canvas")?.addEventListener("click", () => {
    resetObjectPanel();
  });
}

function wireResetButton() {
  document.getElementById("reset-progress")?.addEventListener("click", () => {
    state = structuredClone(defaultState);
    saveState();
    resetObjectPanel();
    renderVisibleObjects();
    renderInventory();
    updateRoomLocks();
    setStatus("Progress reset. Start again outside the house.");
  });
}

function selectObject(objectId) {
  if (!isObjectVisible(objectId)) {
    setStatus("Inspect nearby objects to discover that hidden item first.", true);
    return;
  }
  selectedObjectId = objectId;
  selectedInventoryItem = null;
  selectedPanelKind = "room";
  const object = currentRoom().objects[objectId];

  showObjectPanel();
  document.querySelectorAll(".room-object").forEach((button) => {
    button.classList.toggle("selected", button.dataset.object === objectId);
  });

  document.getElementById("object-name").textContent = object.name;
  document.getElementById("object-description").textContent = "Inspect this object to learn more.";
  renderActions(objectId);
  renderInventory();
  setStatus(isObjectLocked(objectId) ? lockedMessage(objectId) : "Choose an action below.", isObjectLocked(objectId));
}

function renderActions(objectId) {
  const actions = document.getElementById("object-actions");
  actions.replaceChildren();

  const object = currentRoom().objects[objectId];
  if (!object) {
    return;
  }
  actions.append(createActionButton("Inspect", () => inspectObject(objectId), true));

  if (isObjectLocked(objectId)) {
    const lockedNotice = document.createElement("p");
    lockedNotice.className = "hint action-note";
    lockedNotice.textContent = lockedMessage(objectId);
    actions.append(lockedNotice);
    return;
  }

  if (object.pickup && canPickup(objectId, object.pickup.item)) {
    actions.append(createActionButton(object.pickup.label || `Take ${object.pickup.item}`, () => collectItem(object.pickup.item)));
  }

  getFoundObjectAction(objectId)?.forEach((action) => {
    actions.append(createActionButton(action.label, action.onClick));
  });

  object.customActions?.forEach((action) => {
    if (action.input) {
      actions.append(createInputAction(action));
      return;
    }

    actions.append(createActionButton(action.label, () => runCustomAction(action.type)));
  });

  if (state.inventory.length > 0) {
    const inventoryHint = document.createElement("p");
    inventoryHint.className = "hint action-note";
    inventoryHint.textContent = "Click an inventory item below to try using it on this object.";
    actions.append(inventoryHint);
  }
}

function isObjectLocked(objectId) {
  const rule = currentRoom().objects[objectId]?.lockedWhen;
  if (!rule) {
    return false;
  }

  const value = currentRoomState().flags[rule.flag];
  if (Number.isFinite(rule.untilAtLeast)) {
    return (value || 0) < rule.untilAtLeast;
  }

  return !value;
}

function lockedMessage(objectId) {
  return currentRoom().objects[objectId]?.lockedWhen?.message || "This object is locked and cannot do anything yet.";
}


function getFoundObjectAction(objectId) {
  const roomState = currentRoomState();
  if (!roomState.flags[`inspected_${objectId}`]) {
    return null;
  }

  if (currentRoomNumber() === 2 && objectId === "garbageCan" && !roomState.flags.bathroomBoxFound) {
    return [{ label: "Take out small locked box", onClick: () => revealHiddenObject("bathroomBoxFound", "You take the small locked box out of the garbage can.") }];
  }

  if (currentRoomNumber() === 3 && objectId === "potsPans" && !roomState.flags.kitchenBoxFound) {
    return [{ label: "Pull out locked box", onClick: () => revealHiddenObject("kitchenBoxFound", "You pull the labelled locked box out from behind the pots and pans.") }];
  }

  return null;
}

function revealHiddenObject(flag, message) {
  currentRoomState().flags[flag] = true;
  saveState();
  renderVisibleObjects();
  renderActions(selectedObjectId);
  setStatus(message);
}

function createInputAction(action) {
  const form = document.createElement("form");
  form.className = "input-action";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = action.input.placeholder;
  input.autocomplete = "off";
  if (action.input.inputMode) {
    input.inputMode = action.input.inputMode;
  }
  input.setAttribute("aria-label", action.input.placeholder);

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "action-button";
  submit.textContent = action.label;

  form.append(input, submit);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entry = input.value.trim();
    if (normaliseEntry(entry) !== normaliseEntry(action.input.answer)) {
      setStatus(`That entry does not work.`, true);
      return;
    }
    runCustomAction(action.type, entry);
  });

  return form;
}

function normaliseEntry(value) {
  return value.replace(/\s+/g, " ").toUpperCase();
}

function canPickup(objectId, item) {
  const roomState = currentRoomState();
  if (roomState.collected.includes(item)) {
    return false;
  }

  if (!roomState.flags[`inspected_${objectId}`]) {
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
  if (selectedPanelKind === "inventory" && selectedInventoryItem === objectId) {
    const inspectedText = inventoryInspect(objectId);
    document.getElementById("object-description").textContent = inspectedText;
    return;
  }

  currentRoomState().flags[`inspected_${objectId}`] = true;
  saveState();
  renderVisibleObjects();
  renderActions(objectId);

  if (currentRoomNumber() === 1 && objectId === "outsideKeypad") {
    const rings = currentRoomState().flags.doorbellRings || 0;
    const keypadText = rings === 5 ? "The keypad lights up. It is now accepting a 6-digit code." : "A small locked numerical keypad.";
    document.getElementById("object-description").textContent = keypadText;
    setStatus("Inspected object.");
    return;
  }

  const inspectText = currentRoom().objects[objectId].inspect || "You do not notice anything else yet.";
  document.getElementById("object-description").textContent = inspectText;
  setStatus("Inspected object.");
}

function collectItem(item) {
  if (!state.inventory.includes(item)) {
    state.inventory.push(item);
  }
  if (!currentRoomState().collected.includes(item)) {
    currentRoomState().collected.push(item);
  }
  saveState();
  renderVisibleObjects();
  renderInventory();
  renderActions(selectedObjectId);
  setStatus(`Added ${item} to your inventory.`);
}

function useItemOnObject(item, objectId) {
  if (currentRoom().objects[objectId] && isObjectLocked(objectId)) {
    setStatus(lockedMessage(objectId), true);
    return;
  }

  const roomNumber = currentRoomNumber();
  const roomState = currentRoomState();

  if (roomNumber === 2 && item === "gold key" && objectId === "bathroomBox") {
    roomState.flags.boxOpen = true;
    saveState();
    addInventoryItem("airplane figurine");
    setStatus("The gold key opens the discarded box. Inside is a small airplane figurine. From earlier answers, it must be an Airbus.");
    return;
  }

  if (roomNumber === 2 && item === "invisible-ink light" && objectId === "towel") {
    setStatus("Take the crumpled paper first, then use the invisible-ink light from the inventory panel on the paper itself.", true);
    return;
  }

  if (roomNumber === 2 && item === "invisible-ink light" && objectId === "crumpled paper") {
    roomState.flags.paperRevealed = true;
    saveState();
    setStatus("The crumpled paper reveals: 'I do not have much time. They’re coming. I was once where you were as well. I’ve tried to leave you hints through this note. But I cannot make it too obvious. Or else he will find out.' The sentence word counts are 6-2-8-9-7-6.");
    return;
  }

  if (roomNumber === 3 && item === "key 7" && objectId === "kitchenBox") {
    roomState.flags.boxOpen = true;
    saveState();
    renderVisibleObjects();
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
    renderVisibleObjects();
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

  const targetName = currentRoom().objects[objectId]?.name || objectId;
  setStatus(`${item === "gold key" ? "Gold Key" : capitalize(item)} does not seem to work on the ${targetName.toLowerCase()}.`, true);
}

function addInventoryItem(item) {
  if (!state.inventory.includes(item)) {
    state.inventory.push(item);
  }
  if (!currentRoomState().collected.includes(item)) {
    currentRoomState().collected.push(item);
  }
  saveState();
  renderVisibleObjects();
  renderInventory();
  renderActions(selectedObjectId);
}

function runCustomAction(actionType, entry = "") {
  const roomState = currentRoomState();

  if (actionType === "ring-doorbell") {
    roomState.flags.doorbellRings = (roomState.flags.doorbellRings || 0) + 1;
    saveState();
    const rings = roomState.flags.doorbellRings;
    if (rings === 5) {
      setStatus("After the fifth ring, the keypad lights up and starts accepting input.");
      return;
    }
    setStatus("The doorbell rings.");
    return;
  }

  if (actionType === "room1-keypad") {
    if ((roomState.flags.doorbellRings || 0) < 5) {
      setStatus("The keypad is locked.", true);
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
    const requiredKeys = ["key 2", "key 1", "key 4", "key 7", "gold key"];
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
    itemElement.textContent = displayItemName(item);
    itemElement.classList.toggle("selected", item === selectedInventoryItem);
    itemElement.addEventListener("click", () => selectInventoryItem(item));
    list.append(itemElement);
  });
}


function selectInventoryItem(item) {
  if (selectedPanelKind === "room" && selectedObjectId) {
    useItemOnObject(item, selectedObjectId);
    return;
  }

  if (selectedPanelKind === "inventory" && selectedInventoryItem && selectedInventoryItem !== item) {
    useItemOnObject(item, selectedInventoryItem);
    return;
  }

  selectedInventoryItem = item;
  selectedObjectId = null;
  selectedPanelKind = "inventory";
  showObjectPanel();
  document.querySelectorAll(".room-object").forEach((button) => button.classList.remove("selected"));
  document.getElementById("object-name").textContent = item === "gold key" ? "Gold Key" : capitalize(item);
  document.getElementById("object-description").textContent = inventoryDescription(item);

  const actions = document.getElementById("object-actions");
  actions.replaceChildren();
  actions.append(createActionButton("Inspect", () => inspectObject(item), true));

  if (state.inventory.some((inventoryItem) => inventoryItem !== item)) {
    const inventoryHint = document.createElement("p");
    inventoryHint.className = "hint action-note";
    inventoryHint.textContent = "Click another inventory item below to try using it on this item.";
    actions.append(inventoryHint);
  }

  renderInventory();
  setStatus(`Opened ${displayItemName(item)}.`);
}

function showObjectPanel() {
  document.getElementById("object-panel")?.classList.remove("hidden");
}

function resetObjectPanel() {
  selectedObjectId = null;
  selectedInventoryItem = null;
  selectedPanelKind = null;
  document.querySelectorAll(".room-object").forEach((button) => button.classList.remove("selected"));
  document.getElementById("object-panel")?.classList.add("hidden");
  const actions = document.getElementById("object-actions");
  actions?.replaceChildren();
  renderInventory();
}

function inventoryInspect(item) {
  const inspections = {
    "gold key": "A small gold key, exquisitely made. On it, the number 5 is stamped.",
    "crumpled paper": "The paper is wrinkled and faintly discolored, as if hidden ink is waiting for the right light.",
    "airplane figurine": "The miniature plane looks like a passenger jet: an Airbus clue for the drawer word.",
    "invisible-ink light": "Its beam is tuned to expose invisible ink on notes and surfaces.",
    butter: "The butter wrapper is marked like an ingredient from the pancake recipe.",
    "key 7": "The key is labelled 7 and should fit a matching lock.",
    "key 1": "The key is labelled 1 and should fit a matching lock.",
    cable: "Both ends are intact and ready for a labelled port.",
    "key 4": "The key is labelled 4 and should fit a matching lock.",
    "key 2": "The key is labelled 2 and should fit a matching lock.",
  };
  return inspections[item] || "You do not notice anything else yet.";
}


function inventoryDescription(item) {
  const descriptions = {
    "gold key": "A small gold key, exquisitely made. On it, the number 5 is stamped.",
    "crumpled paper": "A crumpled paper from inside the towel. It may reveal more under the right light.",
    "airplane figurine": "A small airplane figurine hinting at AIRBUS.",
    "invisible-ink light": "A handheld light that reveals invisible ink on objects or notes.",
    butter: "A stick of butter connected to the recipe-book timing clue.",
    "key 7": "A numbered key labelled 7.",
    "key 1": "A numbered key labelled 1.",
    cable: "A cable that can connect to a matching port.",
    "key 4": "A numbered key labelled 4.",
    "key 2": "A numbered key labelled 2.",
  };
  return descriptions[item] || "An item in your inventory.";
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

function displayItemName(item) {
  if (item === "gold key") {
    return "Gold Key";
  }
  return capitalize(item);
}

initialisePage();
