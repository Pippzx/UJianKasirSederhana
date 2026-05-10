let dataBarang = [];

const form = document.getElementById("formBarang");
const tabel = document.getElementById("tabelBarang");
const total = document.getElementById("totalBarang");

form.addEventListener("submit", function(e){
  e.preventDefault();

  let nama = document.getElementById("nama").value.trim();
  let harga = document.getElementById("harga").value;
  let stok = document.getElementById("stok").value;

  if(!nama || !harga || !stok){
    alert("Semua field wajib diisi!");
    return;
  }

  if(isNaN(harga) || isNaN(stok)){
    alert("Harga & stok harus angka!");
    return;
  }

  if(stok < 0){
    alert("Stok tidak boleh negatif!");
    return;
  }

  dataBarang.push({
    nama,
    harga: Number(harga),
    stok: Number(stok)
  });

  tampilkanData();
  form.reset();
});

function tampilkanData(){
  tabel.innerHTML = "";

  let filterNama = document.getElementById("filterNama").value.toLowerCase();
  let filterHarga = document.getElementById("filterHarga").value;

  let hasil = dataBarang.filter(item => {
    return item.nama.toLowerCase().includes(filterNama) &&
      (filterHarga === "" || item.harga <= filterHarga);
  });

  hasil.forEach((item, index) => {
    tabel.innerHTML += `
      <tr class="border-t">
        <td class="p-4">${item.nama}</td>
        <td>Rp ${item.harga.toLocaleString()}</td>
        <td>${item.stok}</td>
        <td class="text-center">
          <button onclick="hapusData(${index})"
            class="bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-200">
            🗑️
          </button>
        </td>
      </tr>
    `;
  });

  total.innerText = dataBarang.length;
}

function hapusData(index){
  dataBarang.splice(index,1);
  tampilkanData();
}

function resetForm() {
  // reset input tambah barang
  document.getElementById("nama").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("stok").value = "";

  // reset filter
  document.getElementById("filterNama").value = "";
  document.getElementById("filterHarga").value = "";

  // tampilkan ulang data
  tampilkanData();
}

// filter realtime
document.getElementById("filterNama").addEventListener("input", tampilkanData);
document.getElementById("filterHarga").addEventListener("input", tampilkanData);
