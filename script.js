let uangMasuk = 0;
let uangKeluar = 0;

let historyTransaksi = [];


// ================= LOGIN =================

function login() {

    let nama = document.getElementById("nama").value;
    let nim = document.getElementById("nim").value;
    let kelas = document.getElementById("kelas").value;


    if (nama === "" || nim === "" || kelas === "") {

        alert("Nama, NIM, dan kelas harus diisi!");

        return;
    }


    document.getElementById("dataMahasiswa").innerText =
        "Nama: " + nama +
        " | NIM: " + nim +
        " | Kelas: " + kelas;


    document.getElementById("loginPage").style.display =
        "none";

    document.getElementById("dashboardPage").style.display =
        "block";
}


// ================= LOGOUT =================

function logout() {

    let yakin = confirm("Apakah kamu yakin ingin logout?");

    if (yakin) {

        document.getElementById("dashboardPage").style.display =
            "none";

        document.getElementById("loginPage").style.display =
            "flex";

        document.getElementById("nama").value = "";
        document.getElementById("nim").value = "";
        document.getElementById("kelas").value = "";
    }
}


// ================= TAMBAH TRANSAKSI =================

function tambahTransaksi() {

    let keterangan =
        document.getElementById("keterangan").value;

    let jumlah =
        Number(document.getElementById("jumlah").value);

    let jenis =
        document.getElementById("jenis").value;


    if (keterangan === "") {

        alert("Keterangan harus diisi!");

        return;
    }


    if (jumlah <= 0) {

        alert("Jumlah uang harus lebih dari 0!");

        return;
    }


    // UANG MASUK

    if (jenis === "masuk") {

        uangMasuk = uangMasuk + jumlah;
    }


    // UANG KELUAR

    else {

        let saldoSaatIni =
            uangMasuk - uangKeluar;


        if (jumlah > saldoSaatIni) {

            alert("Saldo tidak cukup!");

            return;
        }


        uangKeluar =
            uangKeluar + jumlah;
    }


    // Simpan history

    historyTransaksi.push({

        keterangan: keterangan,

        jumlah: jumlah,

        jenis: jenis,

        waktu: new Date().toLocaleString("id-ID")
    });


    // Update tampilan

    updateTampilan();

    tampilkanHistory();


    // Bersihkan input

    document.getElementById("keterangan").value = "";

    document.getElementById("jumlah").value = "";
}


// ================= UPDATE TAMPILAN =================

function updateTampilan() {

    let saldo =
        uangMasuk - uangKeluar;


    document.getElementById("uangMasuk").innerText =
        "Rp" + uangMasuk.toLocaleString("id-ID");


    document.getElementById("uangKeluar").innerText =
        "Rp" + uangKeluar.toLocaleString("id-ID");


    document.getElementById("saldo").innerText =
        "Rp" + saldo.toLocaleString("id-ID");


    updateStatus(saldo);
}


// ================= STATUS =================

function updateStatus(saldo) {

    let status =
        document.getElementById("status");


    if (saldo <= 0) {

        status.innerText =
            "Keuangan Defisit";

    }

    else if (saldo < 500000) {

        status.innerText =
            "Keuangan Perlu Diperhatikan";

    }

    else {

        status.innerText =
            "Keuangan Aman";
    }
}


// ================= HISTORY =================

function tampilkanHistory() {

    let history =
        document.getElementById("history");


    history.innerHTML = "";


    if (historyTransaksi.length === 0) {

        history.innerHTML =
            "<p>Belum ada transaksi.</p>";

        return;
    }


    for (
        let i = historyTransaksi.length - 1;
        i >= 0;
        i--
    ) {

        let data =
            historyTransaksi[i];


        let tipe;

        let tanda;

        let className;


        if (data.jenis === "masuk") {

            tipe = "Uang Masuk";

            tanda = "+";

            className = "masuk";

        } else {

            tipe = "Uang Keluar";

            tanda = "-";

            className = "keluar";
        }


        history.innerHTML += `

            <div class="history-item">

                <h3>
                    ${data.keterangan}
                </h3>

                <p>
                    ${tipe}
                </p>

                <p>
                    ${data.waktu}
                </p>

                <strong class="${className}">

                    ${tanda}
                    Rp${data.jumlah.toLocaleString("id-ID")}

                </strong>

            </div>

        `;
    }
}