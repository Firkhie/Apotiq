if (!localStorage.getItem("user")) {
  window.location.href = "../index.html";
}
const userNow = JSON.parse(localStorage.getItem('user'));
const infoContent = document.querySelector('.info-content');
infoContent.innerHTML = `
   <h2>Nama, ${userNow.name}</h2>
   <h2>Saldo, Rp ${userNow.saldo}</h2>
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
  let totalHarga = harga * cart[namaObat];
  divAtas.nextElementSibling.innerHTML = `Rp. ${totalHarga}`
}

function minusCart(el) {
  const divAtas = el.parentNode
  const namaObat = el.parentNode.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[namaObat]--;
  if (cart[namaObat] === 0) {
    divAtas.parentNode.innerHTML = ``
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
}

function deleteEntry(el) {
  const divAtas = el.parentNode
  const namaObat = el.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
  let cart = JSON.parse(localStorage.getItem("cart"));
  divAtas.innerHTML = ``
  delete cart[namaObat];
  localStorage.setItem("cart", JSON.stringify(cart))
}


const cartContainer = document.querySelector(".container-barang")
const cart = JSON.parse(localStorage.getItem('cart'));

function render() {
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

if (Object.keys(cart).length !== 0) {
  render()
}