// SCRIPT INFO
// ------------

const userNow = JSON.parse(localStorage.getItem('user'));
const infoContent = document.querySelector('.info-content');
infoContent.innerHTML = `
   <h2>Nama, ${userNow.name}</h2>
   <h2>Saldo, Rp ${userNow.saldo}</h2>
   <button id="topup-btn" onclick="topup()">TopUp</button>
   <button id="logout-btn">Logout</button>
`;

const userIcon = document.querySelector('.fa-user');
userIcon.addEventListener('click', function () {
  infoContent.classList.toggle('active')
})

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', function () {
  localStorage.removeItem("user")
  localStorage.removeItem("cart")
  window.location.href = '../index.html';
})

// SCRIPT CABANG
// ------------
const cabangApotiq = document.querySelectorAll('.cabang');
cabangApotiq.forEach(cabang => {
  cabang.addEventListener('click', function (event) {
    event.preventDefault();
    alert('Cabang masih belum buka. Silakan cek kembali nanti.');
  })
})

// SCRIPT TOPUP
// ------------
function topup() {
  const user = JSON.parse(localStorage.getItem('user'));
  let jumlah = Number(prompt("masukan jumlah yang di topup"));
  if (isNaN(jumlah)) {
    alert(`input harus angka!`)
  } else {
    user.saldo += jumlah;
    const infoContent = document.querySelector('.info-content');
    infoContent.innerHTML = `
   <h2>Nama, ${user.name}</h2>
   <h2>Saldo, Rp ${user.saldo}</h2>
   <button id="topup-btn" onclick="topup()">TopUp</button>
   <button id="logout-btn">Logout</button>
`;
    localStorage.setItem("user", JSON.stringify(user));
  }
}


// SCRIPT SEARCH
// -------------
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');

searchBtn.addEventListener('click', function () {
  const searchValue = searchBar.value;
  let filteredObatArr = [];

  for (let obat of obatArr) {
    let { nama } = obat;
    if (nama.toLowerCase().includes(searchValue)) {
      filteredObatArr.push(obat);
    }
  }
  medicineContent.innerHTML = '';
  addMedicine(filteredObatArr);
})

// SCRIPT FILTER
// -------------
const filterKategori = document.querySelector('#kategori');
const filterSort = document.querySelector('#sort-by');

function filterMedicine() {
  let filteredObatArr = [];

  if (filterKategori.value === '') {
    filteredObatArr = obatArr;
  } else {
    filteredObatArr = obatArr.filter(obat => obat.kategori.toLowerCase() === filterKategori.value.toLowerCase());
  }

  if (filterSort.value === 'asc') {
    filteredObatArr.sort((a, b) => a.nama.localeCompare(b.nama, 'id', { sensitivity: 'base' }));
  } else if (filterSort.value === "desc") {
    filteredObatArr.sort((a, b) => b.nama.localeCompare(a.nama, 'id', { sensitivity: 'base' }));
  }

  medicineContent.innerHTML = '';
  addMedicine(filteredObatArr);
}

filterKategori.addEventListener('change', filterMedicine);
filterSort.addEventListener('change', filterMedicine);

// SCRIPT ADD CART ITEMS
// ---------------------
const buttonAdd = document.querySelector(".add-btn")

function addToCart(el) {
  const divAtas = el.parentNode
  const namaObat = el.parentNode.previousElementSibling.firstElementChild.innerHTML;
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : {};
  if (!cart[namaObat]) cart[namaObat] = 0;
  cart[namaObat]++;
  localStorage.setItem("cart", JSON.stringify(cart))
  divAtas.innerHTML = `
    <button class="fa fa-minus-square" onclick="minusCart(this)"></button>
    <span>${cart[namaObat]}</span>
    <button class="fa fa-plus-square" onclick="addToCart(this)"/></button>`
}

function minusCart(el) {
  const divAtas = el.parentNode
  const namaObat = el.parentNode.previousElementSibling.firstElementChild.innerHTML;
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[namaObat]--;
  if (cart[namaObat] === 0) {
    divAtas.innerHTML = `
    <button class="add-btn" onclick="addToCart(this)">Add to Cart</button>`
    delete cart[namaObat];
  } else {
    divAtas.innerHTML = `
    <button class="fa fa-minus-square" onclick="minusCart(this)"></button>
    <span>${cart[namaObat]}</span>
    <button class="fa fa-plus-square" onclick="addToCart(this)"/></button>`
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}


// SCRIPT ITEMS
// ------------
const medicineContent = document.querySelector('.medicine-content');

function addMedicine(arr) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = {};
  for (let obat of arr) {
    let { src, nama, kategori, harga } = obat;
    if (!cart[nama]) {
      medicineContent.innerHTML += `
     <div class="medicine-box">
        <div class="med-image">
           <img src="${src}" alt="">
        </div>
        <div class="med-info">
           <h2>${nama}</h2>
           <p>Kategori: <span>${kategori}</span></p>
           <p>Harga: <span>${harga}</span></p>
        </div>
        <div class="cart"><button class="add-btn" onclick="addToCart(this)">Add to Cart</button></div>
     </div>`
    } else {
      medicineContent.innerHTML += `
     <div class="medicine-box">
        <div class="med-image">
           <img src="${src}" alt="">
        </div>
        <div class="med-info">
           <h2>${nama}</h2>
           <p>Kategori: <span>${kategori}</span></p>
           <p>Harga: <span>${harga}</span></p>
        </div>
        <div class="cart"><button class="fa fa-minus-square" onclick="minusCart(this)"></button>
        <span>${cart[nama]}</span>
        <button class="fa fa-plus-square" onclick="addToCart(this)"/></button></div>
     </div>`
    }
  }
}
addMedicine(obatArr)