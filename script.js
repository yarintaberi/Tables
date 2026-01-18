// נתונים לדוגמה – בהמשך נחליף ב-Google Sheets
let guestList = {};

const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQajZVUZrsuefc1bRzgDNcJNdsydbSexcQldDco9eXShOnQZt8k2Isy5vJucR6tKMaLRIxai9lI3pqM/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const lines = data.split("\n");
    lines.forEach(line => {
      const [name, table] = line.split(",");
      if(name && table) guestList[name.trim()] = table.trim();
    });
    console.log("Guest list loaded:", guestList);
  })
  .catch(err => console.error("Error loading sheet:", err));

// הצגת הצעות כשמקלידים
function showSuggestions() {
  const input = document.getElementById('guestName');
  const value = input.value.trim().toLowerCase();
  const suggestionsDiv = document.getElementById('suggestions');
  const result = document.getElementById('result');

  result.innerText = '';

  if (!value) {
    suggestionsDiv.classList.add('hidden');
    return;
  }

  const matches = Object.keys(guestList).filter(name =>
    name.toLowerCase().startsWith(value)
  );

  if (matches.length === 0) {
    suggestionsDiv.classList.add('hidden');
    return;
  }

  suggestionsDiv.innerHTML = matches.map(name =>
    `<div onclick="selectName('${name}')"
          class="p-2 hover:bg-gray-100 cursor-pointer">${name}</div>`
  ).join('');

  suggestionsDiv.classList.remove('hidden');
}

function hideSuggestions() {
  setTimeout(() => {
    document.getElementById('suggestions').classList.add('hidden');
  }, 150);
}

function selectName(name) {
  document.getElementById('guestName').value = name;
  document.getElementById('suggestions').classList.add('hidden');
}

// חיפוש שולחן + פתיחת מודאל
function findTable() {
  const input = document.getElementById('guestName');
  const result = document.getElementById('result');
  const name = input.value.trim();

  if (!name) {
    result.innerText = "אנא הזן שם";
    return;
  }

  let table = null;

  // חיפוש לא רגיש לאותיות
  for (const guest in guestList) {
    if (guest.toLowerCase() === name.toLowerCase()) {
      table = guestList[guest];
      break;
    }
  }

  if (!table) {
    result.innerText = "😕 השם לא נמצא";
    return;
  }

  // עדכון טקסט במודאל
  document.getElementById('modalText').innerText =
    `${name} יושב/ת בשולחן ${table}`;

  // פתיחת המודאל
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}
