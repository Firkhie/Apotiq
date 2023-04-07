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