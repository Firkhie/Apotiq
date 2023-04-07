
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

// SCRIPT CABANG
// ------------
const cabangApotiq = document.querySelectorAll('.cabang');
cabangApotiq.forEach(cabang => {
  cabang.addEventListener('click', function (event) {
    event.preventDefault();
    alert('Cabang masih belum buka. Silakan cek kembali nanti.');
  })
})

let cart = JSON.parse(localStorage.getItem('cart'));
const obatDibeli = document.querySelector('#obat-dibeli');
const jumlahObatnya = document.querySelector('#obat-jumlah-dibeli');

for (let namaObat in cart) {
   // ambil jumlah obat
   const jumlahObat = cart[namaObat];
 
   // buat elemen baru untuk menampilkan nama obat dan jumlahnya
   const obatElem = document.createElement('span');
   obatElem.textContent = namaObat;
 
   const jumlahElem = document.createElement('span');
   jumlahElem.textContent = jumlahObat;
 
   // tambahkan elemen ke dalam HTML
   obatDibeli.appendChild(obatElem);
   jumlahObatnya.appendChild(jumlahElem);
 }

