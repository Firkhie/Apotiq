// SCRIPT INFO
// ------------
const userNow = JSON.parse(localStorage.getItem('user'));
const infoContent = document.querySelector('.info-content');
infoContent.innerHTML = `
   <h2>Nama, ${userNow.name}</h2>
   <h2>Saldo, Rp ${userNow.saldo}</h2>
   <button id="logout-btn">Logout</button>
`;

const userIcon = document.querySelector('.fa-user');
userIcon.addEventListener('click', function() {
   infoContent.classList.toggle('active')
})

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', function() {
   window.location.href = 'login.html';
})

// SCRIPT CART
// ------------


// SCRIPT SEARCH
// -------------
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');

searchBtn.addEventListener('click', function() {
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

// SCRIPT ITEMS
// ------------
const medicineContent = document.querySelector('.medicine-content');

function addMedicine(arr) {
   for (let obat of arr) {
      let { src, nama, kategori, harga } = obat;
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
      <button class="add-btn">Add to Cart</button>
   </div>`
   }
}
addMedicine(obatArr)