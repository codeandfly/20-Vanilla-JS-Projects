const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
let showWealth = false;

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Double everyone's money
function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    };
  });

  updateDOM();
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Sort users by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Show only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate all weather
function calculateWealth() {
  const totalWealth = data.reduce((acc, user) => acc + user.money, 0);

  console.log(formatMoney(totalWealth));

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3 class="total-wealth">Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;

  if (showWealth !== true) main.appendChild(wealthEl);

  showWealth = true;
}

// Update DOM
function updateDOM(providedData = data) {
  // clear main DIV
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
