import NavbarHome from "../Navbar/NavbarHome";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const PesanWisata = () => {
    const [wisatas, setwisatas] = useState([])
    const [tempatWisata, settempatWisata] = useState('')
    const [namaLengkap, setnamaLengkap] = useState('')
    const [nomorIdentitas, setnomorIdentitas] = useState(0)
    const [nomorHp, setnomorHP] = useState(0)
    const [tanggalKunjungan, settanggalKunjungan] = useState('')
    const [pengunjungDewasa, setpengunjungDewasa] = useState(0)
    const [pengunjungAnak, setpengunjungAnak] = useState(0)
    const [totalBayar, settotalBayar] = useState(0)
    const [hargaTiket, sethargaTiket] = useState(0)
    const URL = "http://localhost:4444/wisata"
    const SUKSES = 200

    useEffect(() => {
        fetch(URL, {
            method: "GET",
            headers: { 'content-type': 'application/json' },
        })
            .then(res => { return res.json() })
            .then(data => {
                if (data.data === null) {
                    alert("kosong")
                }
                setwisatas(data.data)
            })
    }, [URL])

    useEffect(() => {
        fetch(`http://localhost:4444/wisatas/${tempatWisata}`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },
        })
            .then(res => { return res.json() })
            .then(data => {
                sethargaTiket(data.data.harga)
                const hargaAnak = hargaTiket * pengunjungAnak
                const hargaDewasa = (hargaTiket * 2) * pengunjungDewasa
                settotalBayar(hargaAnak + hargaDewasa)
            })


    }, [tempatWisata, pengunjungAnak, pengunjungDewasa])

    const handlePesanTiket = (e) => {
        e.preventDefault()
        const pengunjungDewasaInNumber = pengunjungDewasa * 1
        const pengunjungAnakInNumber = pengunjungAnak * 1

        const newReservasi = {
            nama_lengkap: namaLengkap,
            nomor_identitas: nomorIdentitas,
            nomor_hp: nomorHp,
            tempat_wisata: tempatWisata,
            tanggal_kunjungan: tanggalKunjungan,
            pengunjung_dewasa: pengunjungDewasaInNumber,
            pengunjung_anak: pengunjungAnakInNumber,
            harga_tiket: hargaTiket,
            total_bayar: totalBayar
        }

        console.log(newReservasi)
        fetch("http://localhost:4444/reservasi", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReservasi)
        })
            .then(res => { return res.json() })
            .then(data => {
                if (data.meta.code === SUKSES){
                    Swal.fire(
                        'Sukses',
                        'Reservasi berhasil',
                        'success'
                    )
                }
            })
    }

    return (<>
        <NavbarHome />
        <div className="container flex flex-col gap-8 mx-auto">
            <h1 className="text-xl text-center font-bold">Formulir Pemesanan Tiket Wisata</h1>
            <form className="px-72 py-6" onSubmit={handlePesanTiket}>
                <div class="mb-6">
                    <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                    <input type="text" id="nama" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required onChange={e => setnamaLengkap(e.target.value)} />
                </div>
                <div class="mb-6">
                    <label for="nik" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Identitas</label>
                    <input type="number" id="nik" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => setnomorIdentitas(e.target.value)} />
                </div>
                <div class="mb-6">
                    <label for="nik" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No.HP</label>
                    <input type="number" id="nik" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => setnomorHP(e.target.value)} />
                </div>

                <div class="mb-6">
                    <label for="wisatas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat Wisata</label>
                    <select id="wisatas" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => settempatWisata(e.target.value)}>
                        <option>Pilih Tempat Wisata</option>
                        {wisatas.map((wisata) => (
                            <option value={wisata.nama}>{wisata.nama}</option>
                        ))}
                    </select>
                </div>

                <div class="mb-6">
                    <label for="tanggal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Kunjungan</label>
                    <input type="date" id="tanggal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => settanggalKunjungan(e.target.value)} />
                </div>

                <div class="mb-6">
                    <label for="dewasa" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pengunjung Dewasa</label>
                    <input type="number" id="dewasa" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => setpengunjungDewasa(e.target.value)} />
                    <p>harga tiket 2 kali lipat</p>
                </div>

                <div class="mb-6">
                    <label for="anak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pengunjung Anak-Anak</label>
                    <input type="number" id="anak" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => setpengunjungAnak(e.target.value)} />
                </div>

                <div class="mb-6">
                    <h1>Harga Tiket : {hargaTiket}</h1>
                </div>

                <div class="mb-6">
                    <h1>Total Bayar : {totalBayar} </h1>
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>

    </>);
}

export default PesanWisata;