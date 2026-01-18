// נתונים לדוגמה – בהמשך נחליף ב-Google Sheets
let guestList = {
  "דני כהן": "שולחן 1",
  "שרה לוי": "שולחן 2",
  "יוסי פרץ": "שולחן 3"
};

// הצגת הצעות כשמקלידים
function showSuggestions() {
  const input = document.getElementById('guestName');
  const value = input.value.trim().toLowerCase();
  const suggestionsDiv = document.getElementById('suggestions');

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

// חיפוש שולחן
function findTable() {
  const name = input.value.trim();

  if (!name) {
    result.textContent = "אנא הזן שם";
    return;
  }

  // חיפוש לא רגיש לאותיות גדולות/קטנות
  let table = guests[name];

  if (!table) {
    const lowerName = name.toLowerCase();
    for (const guest in guests) {
      if (guest.toLowerCase() === lowerName) {
        table = guests[guest];
        break;
      }
    }
  }

  if (!table) {
    result.textContent = "השם לא נמצא 😕";
    return;
  }

  // עדכון טקסט במודאל
  document.getElementById("modalText").textContent =
    `${name} יושב/ת בשולחן ${table}`;

  // פתיחת המודאל
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}
function handleFocus() {
  document.getElementById('result').innerText = '';
}
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
