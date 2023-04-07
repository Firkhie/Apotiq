//User Details
//------------
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
  window.location.href = '../index.html';
})

//Menampilkan Jumlah Barang
//-------------------------
const labelJumlahBarang = document.querySelector(`#jumlahBarang`)
function jumlahBarang() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  let jumlah = Object.keys(cart).length
  if (jumlah < 2) {
    labelJumlahBarang.innerHTML = `${jumlah} item`
  } else {
    labelJumlahBarang.innerHTML = `${jumlah} items`
  }
}
// TOPUP
//--------
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

//Menampilkan Total Harga
//-------------------------
function totalHarga() {
  const totalBelanjaan = document.querySelector(`#totalBelanjaan`)
  const cart = JSON.parse(localStorage.getItem('cart'));
  let hargaTotal = 0;
  for (const namaObat in cart) {
    for (const { nama, harga } of obatArr) {
      const totalHarga = cart[namaObat] * harga;
      if (namaObat === nama) {
        hargaTotal += totalHarga;
      }
    }
  }
  totalBelanjaan.innerHTML = `SUBTOTAL Rp. ${hargaTotal}`;
}

//Button Checkout
//-------------------------
function checkout() {
  // cek harga dan saldo,
  // jika saldo kurang dari harga bayar tampilkan saldo tidak cukup
  // jika cukup ke halaman terimakasih
  let subtotal = document.querySelector(`#totalBelanjaan`).innerHTML
  subtotal = subtotal.substring(13, subtotal.length)
  let user = JSON.parse(localStorage.getItem(`user`))
  if(user.saldo >= subtotal) {
    window.location.href = `checkout.html`
  } else {
    alert(`Saldo anda kurang ${Math.abs(user.saldo - subtotal)}`)
  }


}

//Button Plus
//-------------------------
function addToCart(el) {
  const divAtas = el.parentNode
  const namaObat = el.parentNode.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : {};
  if (!cart[namaObat]) cart[namaObat] = 0;
  cart[namaObat]++;
  localStorage.setItem("cart", JSON.stringify(cart))
  divAtas.innerHTML = `
    <button class="fa fa-minus-square" onclick="minusCart(this)"></button>
    <span>${cart[namaObat]}</span>
    <button class="fa fa-plus-square" onclick="addToCart(this)"/></button>`
  let harga = divAtas.previousElementSibling.innerHTML;
  harga = harga.substring(4, harga.length)
  let totalHargaBarang = harga * cart[namaObat];
  divAtas.nextElementSibling.innerHTML = `Rp. ${totalHargaBarang}`

  totalHarga();
}

//Button Minus
//-------------------------
function minusCart(el) {
  const divAtas = el.parentNode
  const namaObat = el.parentNode.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[namaObat]--;
  if (cart[namaObat] === 0) {
    divAtas.parentNode.remove()
    delete cart[namaObat];
  } else {
    divAtas.innerHTML = `
    <button class="fa fa-minus-square" onclick="minusCart(this)"></button>
    <span>${cart[namaObat]}</span>
    <button class="fa fa-plus-square" onclick="addToCart(this)"/></button>`
    let harga = divAtas.previousElementSibling.innerHTML;
    harga = harga.substring(4, harga.length)
    let totalHarga = harga * cart[namaObat];
    divAtas.nextElementSibling.innerHTML = `Rp. ${totalHarga}`
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  jumlahBarang();
  totalHarga();
}

//Button Delete
//-------------------------
function deleteEntry(el) {
  const divAtas = el.parentNode
  const namaObat = el.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
  let cart = JSON.parse(localStorage.getItem("cart"));
  divAtas.remove()
  delete cart[namaObat];
  localStorage.setItem("cart", JSON.stringify(cart))
  jumlahBarang();
  totalHarga();
}

//Initial Render
//-------------------------
const cartContainer = document.querySelector(".container-barang")
function render() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  for (const namaObat in cart) {
    for (const { src, nama, harga } of obatArr) {
      const totalHarga = cart[namaObat] * harga;
      if (namaObat === nama) {
        cartContainer.innerHTML += `<div class="daftar-barang">
        <div>
        <div>
          <img
            src="${src}"
            width="150"
            height="150"
            alt=""
          />
        </div>
        <span>${nama}</span>
      </div>
      <div style="font-weight:bold">Rp. ${harga}</div>
      <div>
        <button class="fa fa-minus-square" onclick="minusCart(this)"></button
        ><span>${cart[namaObat]}</span
        ><button class="fa fa-plus-square" onclick="addToCart(this)"></button>
      </div>
      <div class="pl-md-0 pl-1" style="font-weight:bold">Rp. ${totalHarga}</div>
      <div class="close" onclick="deleteEntry(this)">&times;</div>
      </div>
      `;
      }
    }
  }
}

let cart = JSON.parse(localStorage.getItem('cart'));
if (Object.keys(cart).length !== 0) {
  render()
  jumlahBarang()
  totalHarga();
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