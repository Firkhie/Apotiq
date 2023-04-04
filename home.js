// SCRIPT INFO
// ------------
const userNow = JSON.parse(localStorage.getItem('user'));
const infoContent = document.querySelector('.info-content');
infoContent.innerHTML = `
   <h2>Nama, ${userNow.name}</h2>
   <h2>Saldo, Rp ${userNow.saldo}</h2>
`;

// SCRIPT CART
// ------------


// SCRIPT SEARCH
// -------------


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