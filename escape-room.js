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
      bathroomDrawer: {
        name: "Locked Drawer",
        description: "",
        inspect: "A locked drawer. It requires a word.",
        customActions: [{ label: "Enter word", type: "room2-drawer", input: { placeholder: "", answer: "AIRBUS" } }],
      },
      bathroomDoor: {
        name: "Number-Locked Door",
        description: "",
        inspect: "Another large door, this one requiring another 6-digit code.",
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
        description: "A large refrigerator. It has a lot of food in it. What would you like to pull out?",
        inspect: "A large refrigerator. It has a lot of food in it. What would you like to pull out?",
        customActions: [{ label: "Search", type: "room3-fridge", input: { placeholder: "item name" } }],
      },
      potsPans: {
        name: "Pots and Pans",
        description: "A bunch of stacked pots and pans. Upon closer inspection, there is a small container that is locked with a keyhole.",
        inspect: "A bunch of stacked pots and pans. Upon closer inspection, there is a small container that is locked with a keyhole.",
      },
      microwave: {
        name: "Microwave",
        description: "A microwave. It requires an object and a cooking time.",
        inspect: "A microwave. It requires an object and a cooking time.",
        customActions: [{ label: "Set microwave time", type: "room3-microwave", input: { placeholder: "seconds", answer: "124315", inputMode: "numeric" } }],
      },
      recipeBook: {
        name: "Recipe Book",
        description: "An old recipe book laying on the counter. It is extremely thick and has a bunch of old recipes. Which recipe would you like to search for?",
        inspect: "An old recipe book laying on the counter. It is extremely thick and has a bunch of old recipes. Which recipe would you like to search for?",
        customActions: [{ label: "Search recipe", type: "room3-recipe", input: { placeholder: "recipe name" } }],
      },
    },
  },
  room4: {
    title: "Living Room",
    startStatus: "The living room lights are dim. Invisible ink from earlier may reveal what matters.",
    completeMessage: "Large Gold Key turns in the living room door, opening the way to the master bedroom.",
    objects: {
      livingTv: {
        name: "TV",
        description: "An large, old TV. When you open the side panel to check, there is  a large keyhole.",
        inspect: "An large, old TV. When you open the side panel to check, there is  a large keyhole.",
        customActions: [{ label: "Submit port", type: "room4-tv-port", input: { placeholder: "Port" } }],
      },
      livingCouch: {
        name: "Couch",
        description: "An old couch; upon closer inspection, there is a small folded note.",
        inspect: "An old couch; upon closer inspection, there is a small folded note.",
      },
      livingDrawers: {
        name: "Old Drawers",
        description: "The drawers are locked with a numerical keypad.",
        inspect: "The drawers need the code derived from the invisible annotations in the two old books.",
        customActions: [{ label: "Enter combination", type: "room4-drawers", input: { placeholder: "", answer: "2651", inputMode: "numeric" } }],
      },
      oldBooks: {
        name: "Old Book",
        description: "An old book; it seems suspiciously empty...",
        inspect: "An old book; it seems suspiciously empty...",
      },
      floorKey: {
        name: "Large Gold Key",
        description: "An exquisitely made large gold key. The number 4 is stamped on it.",
        inspect: "An exquisitely made large gold key. The number 4 is stamped on it.",
        visibleWhen: { flag: "tvLit" },
        pickup: { item: "key 4", label: "Pick up Large Gold Key" },
      },
      livingDoor: {
        name: "Locked Door",
        description: "A huge locked door. It needs a key.",
        inspect: "A huge locked door. It needs a key.",
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
        description: "The drawers are locked with a 3-digit numerical code.",
        inspect: "A nearby phone shows 6:07. The alarm clock can reveal another time; subtract 345 from 607 to get 262.",
        customActions: [{ label: "Enter combination", type: "room5-nightstand", input: { placeholder: "3-digit code", answer: "262", inputMode: "numeric" } }],
      },
      computer: {
        name: "Locked Computer",
        description: "A locked computer sitting near the table. It requires a username and password.",
        inspect: "It asks for a username and password. A hidden note gives the username; previous puzzle answers point to OVERRIDE.",
        customActions: [{ label: "Log in", type: "room5-computer", input: { placeholder: "username / password", answer: "admin / OVERRIDE" } }],
      },
      bed: {
        name: "Bed",
        description: "You rummage through the bed. Under the pillow, a locked phone is frozen at the time 6:07.",
        inspect: "You rummage through the bed. Under the pillow, a locked phone is frozen at the time 6:07.",
      },
      alarmClock: {
        name: "Alarm Clock",
        description: "An alarm clock sitting on the nightstand. There are 5 buttons.",
        inspect: "An alarm clock sitting on the nightstand. There are 5 buttons.",
        customActions: [{ label: "Use buttons", type: "room5-clock" }],
      },
      lamp: {
        name: "Lamp with Keyhole",
        description: "A normal lamp... However, there is a suspicious latch with a keyhole at the back.",
        inspect: "A normal lamp... However, there is a suspicious latch with a keyhole at the back.",
      },
    },
  },
  room6: {
    title: "Basement",
    startStatus: "A giant locked door looms ahead. Maybe the huge lock mechanism can open it.",
    completeMessage: "You hear a clicking noise: the door unlocks!",
    objects: {
      keyholes: {
        name: "Huge Lock",
        description: "A huge row of keyholes. Namely, 5 keyholes. Which order should you insert the keys in though?",
        inspect: "A huge row of keyholes. Namely, 5 keyholes. Which order should you insert the keys in though?",
        customActions: [{ label: "Check", type: "room6-keyholes" }],
      },
      basementDoor: {
        name: "Giant Door",
        description: "A ginormous door, bigger than any others you've seen. However, it is locked. Nothing you try opens it.",
        inspect: "A ginormous door, bigger than any others you've seen. However, it is locked. Nothing you try opens it.",
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

function roomStateByNumber(roomNumber) {
  return state.rooms[`room${roomNumber}`];
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
    if (action.type === "room6-keyholes") {
      actions.append(createRoom6LockAction(action));
      return;
    }
    if (action.type === "room5-clock") {
      actions.append(createClockAction());
      return;
    }
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

  if (currentRoomNumber() === 6 && objectId === "basementDoor" && currentRoomState().complete) {
    const openButton = createActionButton("EXIT", () => {
      window.location.href = "exit.html";
    });
    actions.append(openButton);
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


  if (currentRoomNumber() === 2 && objectId === "garbageCan" && !state.inventory.includes("small locked box")) {
    return [{ label: "Take out small locked box", onClick: () => collectItem("small locked box") }];
  }

  if (currentRoomNumber() === 3 && objectId === "potsPans" && !state.inventory.includes("kitchen container")) {
    return [{ label: "Take kitchen container", onClick: () => collectItem("kitchen container") }];
  }

  if (currentRoomNumber() === 4 && objectId === "livingCouch" && !state.inventory.includes("small note")) {
    return [{ label: "PICK UP THE NOTE", onClick: () => collectItem("small note") }];
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
  if (action.type === "room5-clock") {
    return createClockAction(action);
  }
  if (action.type === "room5-computer") {
    return createComputerAction(action);
  }
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
    if (action.input.answer && normaliseEntry(entry) !== normaliseEntry(action.input.answer)) {
      setStatus(`That entry does not work.`, true);
      return;
    }
    runCustomAction(action.type, entry);
  });

  return form;
}


function createClockAction() {
  const wrap = document.createElement("div");
  wrap.className = "input-action";
  const buttons = ["CLEAR","G","B","R","ENTER"];
  const presses = [];
  buttons.forEach((label)=>{
    wrap.append(createActionButton(label, ()=>{
      if (label === "CLEAR") { presses.length = 0; runCustomAction("room5-clock","CLEAR"); return; }
      if (label === "ENTER") { const sequence = `${presses.join("")}ENTER`; presses.length = 0; runCustomAction("room5-clock", sequence); return; }
      presses.push(label);
      setStatus(`Pressed: ${presses.join("")}`);
    }));
  });
  return wrap;
}

function createComputerAction(action) {
  const form = document.createElement("form");
  form.className = "input-action";
  const username = document.createElement("input");
  username.type = "text"; username.placeholder = "Username";
  const password = document.createElement("input");
  password.type = "text"; password.placeholder = "Password";
  const submit = document.createElement("button"); submit.type = "submit"; submit.className = "action-button"; submit.textContent = action.label;
  form.append(username,password,submit);
  form.addEventListener("submit", (event)=>{ event.preventDefault(); runCustomAction(action.type, `${username.value.trim()}||${password.value.trim()}`); });
  return form;
}

function createRoom6LockAction(action) {
  const wrap = document.createElement("div");
  wrap.className = "room6-lock-ui";

  const slotsWrap = document.createElement("div");
  slotsWrap.className = "room6-slots";

  const sequence = currentRoomState().flags.room6Sequence || [];
  for (let index = 0; index < 5; index += 1) {
    const slot = document.createElement("div");
    slot.className = "room6-slot";
    slot.textContent = sequence[index] ? displayItemName(sequence[index]) : `Slot ${index + 1}`;
    slotsWrap.append(slot);
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "action-button";
  button.textContent = action.label;
  button.disabled = sequence.length < 5;
  button.addEventListener("click", () => runCustomAction(action.type));

  wrap.append(slotsWrap, button);
  return wrap;
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

  if (currentRoomNumber() === 6 && objectId === "basementDoor") {
    const doorText = currentRoomState().complete
      ? "The ginormous door is now unlocked. You can finally leave."
      : "A ginormous door, bigger than any others you've seen. However, it is locked. Nothing you try opens it.";
    document.getElementById("object-description").textContent = doorText;
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
  setStatus(`Added ${displayItemName(item)} to your inventory.`);
}

function useItemOnObject(item, objectId) {
  if (currentRoom().objects[objectId] && isObjectLocked(objectId)) {
    setStatus(lockedMessage(objectId), true);
    return;
  }

  const room2State = roomStateByNumber(2);
  const room3State = roomStateByNumber(3);
  const room4State = roomStateByNumber(4);
  const room5State = roomStateByNumber(5);

  if (item === "gold key" && objectId === "small locked box") {
    room2State.flags.boxOpen = true;
    saveState();
    addInventoryItem("airplane figurine");
    setStatus("The gold key opens the small locked box. Inside is a small airplane figurine.");
    return;
  }

  if (item === "invisible-ink light" && objectId === "towel") {
    setStatus("Take the crumpled paper first, then use the invisible-ink light from the inventory panel on the paper itself.", true);
    return;
  }

  if (item === "invisible-ink light" && objectId === "crumpled paper") {
    room2State.flags.paperRevealed = true;
    saveState();
    setStatus("The crumpled paper reveals: 'I do not have much time. They’re coming. I was once where you were as well. I’ve tried to leave you hints through this note. But I cannot make it too obvious. Or else he will find out.'");
    return;
  }

  if (item === "small silver key" && objectId === "kitchen container") {
    room3State.flags.boxOpen = true;
    saveState();
    addInventoryItem("red button");
    setStatus("The kitchen container unlocks and reveals a red button.");
    return;
  }

  if (item === "butter" && currentRoomNumber() === 3 && objectId === "microwave") {
    room3State.flags.microwaveLoadedButter = true;
    saveState();
    setStatus("You put the butter in the microwave.");
    return;
  }

  if (item === "red button" && currentRoomNumber() === 3) {
    completeRoom();
    return;
  }

  if (item === "invisible-ink light" && objectId === "livingCouch") {
    setStatus("The couch note appears in invisible ink: 'Remember: Buy Groceries.'");
    return;
  }

  if (item === "invisible-ink light" && objectId === "small folded note") {
    setStatus("In invisible ink: Username = admin. Password = [illegible]");
    return;
  }

  if (item === "invisible-ink light" && objectId === "oldBooks") {
    setStatus("Hastily scribbled in the margins are the annotations: 56YGFR, ASE32Q, 9IKLP0, WAZXDE, 8UJKLO9, DRTGVC, U89OKJ, CFGB, SDR43W, I90PLK, MJHB, W34RDS.");
    return;
  }

  if (item === "key 1" && objectId === "livingTv") {
    room4State.flags.tvPanelOpen = true;
    saveState();
    setStatus("The side panel swings open. There are a lot of ports. Which port do you plug the cable into?");
    return;
  }


  if (item === "key 4" && objectId === "livingDoor") {
    completeRoom();
    return;
  }

  if (item === "key 2" && objectId === "lamp") {
    room5State.flags.lampOpen = true;
    saveState();
    setStatus("The hidden compartment slides open, revealing a folded note.");
    addInventoryItem("small folded note");
    return;
  }

  const targetName = currentRoom().objects[objectId]?.name || objectId;
  setStatus(`${displayItemName(item)} does not seem to work on the ${targetName.toLowerCase()}.`, true);
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
    setStatus("The doorbell rings.");
    return;
  }

  if (actionType === "room1-keypad") {
    if ((roomState.flags.doorbellRings || 0) !== 5) {
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
    if (!roomState.flags.microwaveLoadedButter) {
      setStatus("What do you want to microwave?", true);
      return;
    }
    addInventoryItem("small silver key");
    setStatus("After 124315 seconds, the butter melts away to reveal a small silver key.");
    return;
  }

  if (actionType === "room3-recipe") {
    if (normaliseEntry(entry) === "PANCAKES") {
      setStatus("Pancakes:\n1 tbsp Baking Powder\n2 tbsp Sugar\n4 tsp Salt\n3 tbsp Butter\n1 Egg\n5 tbsp Flour.");
      return;
    }
    setStatus("Hm... nothing useful", true);
    return;
  }

  if (actionType === "room3-fridge") {
    if (normaliseEntry(entry) === "BUTTER") {
      addInventoryItem("butter");
      setStatus("Butter pulled out!");
      return;
    }
    setStatus("Hm... that doesn't seem helpful.", true);
    return;
  }

  if (actionType === "room4-drawers") {
    roomState.flags.drawersOpen = true;
    addInventoryItem("key 1");
    setStatus("The code 2651 opens the drawers. Inside is Small Bronze Key.");
    return;
  }

  if (actionType === "room4-tv-port") {
    if (!roomState.flags.tvPanelOpen) {
      setStatus("The side panel is still locked.", true);
      return;
    }
    if (normaliseEntry(entry) === "FOLIO") {
      roomState.flags.tvLit = true;
      saveState();
      renderVisibleObjects();
      renderActions(selectedObjectId);
      setStatus("The whole room lights up.");
      return;
    }
    setStatus(`You try plugging the cable into PORT ${entry}, but nothing happens.`);
    return;
  }

  if (actionType === "room5-clock") {
    const sequence = normaliseEntry(entry).replace(/\s+/g, "");
    if (sequence === "CLEAR" || sequence === "ENTER") {
      roomState.flags.clockSequence = "";
      saveState();
      setStatus("The button sequence is cleared.");
      return;
    }
    if (sequence === "RBGENTER") {
      roomState.flags.clockLit = true;
      roomState.flags.clockSequence = "";
      saveState();
      setStatus("The alarm clock lights up, stuck at the time 3:45.");
      return;
    }
    setStatus("Nothing happens.", true);
    return;
  }

  if (actionType === "room5-nightstand") {
    if (!roomState.flags.clockLit) {
      setStatus("Find the second time on the alarm clock before solving the nightstand.", true);
      return;
    }
    addInventoryItem("key 2");
    setStatus("The nightstand opens with 262. Inside is Large Silver Key.");
    return;
  }

  if (actionType === "room5-computer") {
    if (!roomState.flags.lampOpen) {
      setStatus("The computer still needs the hidden username clue from the lamp.", true);
      return;
    }
    const [username,password] = entry.split("||");
    if (normaliseEntry(username||"") !== "ADMIN" || normaliseEntry(password||"") !== "OVERRIDE") {
      setStatus("That login does not work.", true);
      return;
    }
    completeRoom();
    return;
  }

  if (actionType === "room6-keyholes") {
    const requiredKeys = ["key 2", "key 1", "key 4", "small silver key", "gold key"];
    const sequence = currentRoomState().flags.room6Sequence || [];
    const missing = requiredKeys.filter((item) => !state.inventory.includes(item));
    if (missing.length > 0) {
      setStatus(`You are missing: ${missing.map((item) => displayItemName(item)).join(", ")}.`, true);
      return;
    }
    if (sequence.length < 5) {
      setStatus("Fill all 5 slots before checking.", true);
      return;
    }
    const isCorrect = requiredKeys.every((item, idx) => sequence[idx] === item);
    if (isCorrect) {
      completeRoom();
      setStatus("You hear a clicking noise as something unlocks.");
      return;
    }
    currentRoomState().flags.room6Sequence = [];
    saveState();
    renderActions("keyholes");
    setStatus("Nothing happens. Try again.", true);
  }
}

function completeRoom() {
  const roomNumber = currentRoomNumber();
  const roomState = currentRoomState();
  roomState.complete = true;
  state.unlockedRoom = Math.max(state.unlockedRoom, Math.min(roomNumber + 1, ROOM_COUNT));
  saveState();
  updateRoomLocks();
  if (currentRoomNumber() === 6) {
    renderActions("basementDoor");
  }
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
  if (currentRoomNumber() === 6 && selectedPanelKind === "room" && selectedObjectId === "keyholes") {
    tryAddRoom6Key(item);
    return;
  }
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
  document.getElementById("object-name").textContent = displayItemName(item);
  document.getElementById("object-description").textContent = "Inspect this object to learn more.";

  const actions = document.getElementById("object-actions");
  actions.replaceChildren();
  actions.append(createActionButton("Inspect", () => inspectObject(item), true));
  if (item === "red button" && currentRoomNumber() === 3) {
    actions.append(createActionButton("Press", () => useItemOnObject("red button", "inventory")));
  }

  if (state.inventory.some((inventoryItem) => inventoryItem !== item)) {
    const inventoryHint = document.createElement("p");
    inventoryHint.className = "hint action-note";
    inventoryHint.textContent = "Click another inventory item below to try using it on this item.";
    actions.append(inventoryHint);
  }

  renderInventory();
  setStatus(`Opened ${displayItemName(item)}.`);
}

function tryAddRoom6Key(item) {
  const allowed = ["key 2", "key 1", "key 4", "small silver key", "gold key"];
  if (!allowed.includes(item)) {
    setStatus("That key does not fit this mechanism.", true);
    return;
  }
  const sequence = currentRoomState().flags.room6Sequence || [];
  if (sequence.includes(item)) {
    setStatus("That key is already in a slot.", true);
    return;
  }
  if (sequence.length >= 5) {
    setStatus("All 5 slots are already filled. Press Check.", true);
    return;
  }
  currentRoomState().flags.room6Sequence = [...sequence, item];
  saveState();
  renderActions("keyholes");
  setStatus(`${displayItemName(item)} slides into slot ${sequence.length + 1}.`);
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
    "small locked box": "A small locked box, opened with a key.",
    "airplane figurine": "A small airplane figurine. You can't figure out why it's in the box, and you try desperately to figure out what type of plane it is...",
    "invisible-ink light": "Its beam is tuned to expose invisible ink on notes and surfaces.",
    butter: "An inconspicuous stick of butter.",
    "kitchen container": "A small kitchen container that is locked. It needs a key.",
    "red button": "A red button.",
    "small silver key": "A small silver key, exquisitely made. The number 7 is stamped.",
    "small note": "A small piece of paper. On it are the words 'Remember: Buy Groceries'.",
    "key 1": "A small bronze key, exquisitely made. The number 1 is stamped on it.",
    "key 4": "An exquisitely made large gold key. The number 4 is stamped on it.",
    "key 2": "A large silver key, exquisitely made. It is stamped with the number 2.",
    "small folded note": "A small note, on it written 'I'm sorry. I can't help you anymore.' However, it does look a bit suspicious...",
  };
  return inspections[item] || "You do not notice anything else yet.";
}


function inventoryDescription(item) {
  const descriptions = {
    "gold key": "A small gold key, exquisitely made. On it, the number 5 is stamped.",
    "crumpled paper": "A small piece of crumpled paper. Nothing seems to be written on it.",
    "small locked box": "A small locked box, opened with a key.",
    "airplane figurine": "A small airplane figurine. You can't figure out why it's in the box, and you try desperately to figure out what type of plane it is...",
    "invisible-ink light": "A handheld light that reveals invisible ink on objects or notes.",
    butter: "An inconspicuous stick of butter.",
    "kitchen container": "A small kitchen container that is locked. It needs a key.",
    "red button": "",
    "small silver key": "",
    "small note": "A small piece of paper. On it are the words 'Remember: Buy Groceries'.",
    "key 1": "A small bronze key, exquisitely made. The number 1 is stamped on it.",
    "key 4": "An exquisitely made large gold key. The number 4 is stamped on it.",
    "key 2": "A large silver key, exquisitely made. It is stamped with the number 2.",
    "small folded note": "A small note, on it written 'I'm sorry. I can't help you anymore.' However, it does look a bit suspicious...",
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
  if (item === "small silver key") {
    return "Small Silver Key";
  }
  if (item === "small note") {
    return "Small Note";
  }
  if (item === "red button") {
    return "Red Button";
  }
  if (item === "kitchen container") {
    return "Kitchen Container";
  }
  if (item === "key 1") {
    return "Small Bronze Key";
  }
  if (item === "key 4") {
    return "Large Gold Key";
  }
  if (item === "key 2") {
    return "Large Silver Key";
  }
  if (item === "small folded note") {
    return "Small Folded Note";
  }
  return capitalize(item);
}

initialisePage();
