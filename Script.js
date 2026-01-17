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
  const input = document.getElementById('guestName');
  const resultDiv = document.getElementById('result');
  const name = input.value.trim();

  if (!name) {
    resultDiv.innerText = "אנא הקלד שם";
    return;
  }

  const table = guestList[name] || guestList[Object.keys(guestList)
                                                .find(n => n.toLowerCase() === name.toLowerCase())];

  if (table) {
    resultDiv.innerText = `אתה יושב ב: ${table}`;
  } else {
    resultDiv.innerText = "השם לא נמצא";
  }
}

function handleFocus() {
  document.getElementById('result').innerText = '';
}
