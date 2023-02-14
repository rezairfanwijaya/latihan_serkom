import { useState, useEffect } from "react";

import DataTable from 'react-data-table-component';

const Try = () => {
    const [reservasis, setreservasis] = useState([])
    const columns = [
        {
            name: 'No',
            selector: row => row.no,
            sortable: true,
        },
        {
            name: 'Nama Lengkap',
            selector: row => row.nama,
            sortable: true,
        },
        {
            name: 'Nomor HP',
            selector: row => row.hp,
            sortable: true,
        },
        {
            name: 'NIK',
            selector: row => row.nik,
            sortable: true,
        },
        {
            name: 'Pengunjung Anak',
            selector: row => row.anak,
            sortable: true,
        },
        {
            name: 'Pengunjung Dewasa',
            selector: row => row.dewasa,
            sortable: true,
        },
        {
            name: 'Tanggal Kunjungan',
            selector: row => row.tanggal,
            sortable: true,
        },
        {
            name: 'Tempat Wisata',
            selector: row => row.tempat,
            sortable: true,
        },
        {
            name: 'Harga Tiket',
            selector: row => row.harga,
            sortable: true,
        },
        {
            name: 'Total Bayar',
            selector: row => row.total,
            sortable: true,
        },
    ];

    const data = reservasis.map(mappingReservasi)
    
    function mappingReservasi(reservasi, row) {
        const tanggalSplit = reservasi.tanggal_kunjungan.split("T")
        const tanggal = tanggalSplit[0]

        row++

        return {
            no: row,
            id: reservasi.id,
            nama: reservasi.nama_lengkap,
            hp: reservasi.nomor_hp,
            nik: reservasi.nomor_identitas,
            anak: reservasi.pengunjung_anak,
            dewasa: reservasi.pengunjung_dewasa,
            tanggal: tanggal,
            tempat: reservasi.tempat_wisata,
            harga: `Rp ${reservasi.harga_tiket}`,
            total: `Rp ${reservasi.total_bayar}`,
        }
    }

    const URL = "http://localhost:4444/reservasi"
    useEffect(() => {
        fetch(URL, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => { return res.json() })
            .then(data => setreservasis(data.data))
    }, [URL])

    return (<>
        <div className="main  p-10">
            <DataTable
                title={"TRY"}
                columns={columns}
                data={data}
                pagination
            />
        </div>
    </>)
}

export default Try;