import { useState, useEffect } from "react"
import Swal from 'sweetalert2'

const FormEdit = (props) => {
    const [nama, setnama] = useState("")
    const [lokasi, setlokasi] = useState("")
    var [harga, setharga] = useState(0)
    const [gambar, setgambar] = useState("")
    const isPreview = true
    const SUKSES = 200
    const NOT_FOUND = 400
    

    const currentUrl = window.location.href
    const arrCurrentUrl = currentUrl.split('/')
    harga=harga*1
    
    const id = arrCurrentUrl[5]
    const URL =`http://localhost:4444/wisata/${id}`

    useEffect(() => {
        fetch(URL, {
            method:"GET",
            headers :{'Content-Type': 'application/json'}
        })
        .then(res => {return res.json()})
        .then(data => {
            if (data.meta.code == NOT_FOUND) {
                Swal.fire(
                    'Not Found',
                    'Wisata tidak ditemukan',
                    'warning'
                )
                return
            }
            setgambar(data.data.gambar)
            setnama(data.data.nama)
            setharga(data.data.harga)
            setlokasi(data.data.lokasi)
        })
    }, [URL])

    const handleSubmit = (e)=>{
        e.preventDefault()
        const wisata = { nama, lokasi, harga, gambar }

        fetch(URL, {
            method:"PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(wisata)
        })
        .then(res => {return res.json()})
        .then(data => {
            if (data.meta.code === SUKSES) {
                Swal.fire(
                    'Sukses',
                    'Berhasil update wisata baru',
                    'success'
                )
            }
        })
    }

    return (<>

        <form className="" onSubmit={handleSubmit}>
            <div class="mb-6">
                <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Tempat Wisata</label>
                <input type="text" id="nama" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Curug Bayan" required onChange={e => setnama(e.target.value)} value={nama}/>
            </div>

            <div class="mb-6">
                <label for="lokasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi Tempat Wisata</label>
                <input type="text" id="lokasi" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Purwokerto" required onChange={e => setlokasi(e.target.value)} value={lokasi}/>
            </div>

            <div class="mb-6">
                <label for="harga" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">harga Tempat Wisata</label>
                <input type="number" id="harga" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="12000" required onChange={e => setharga(e.target.value)} value={harga} />
            </div>

            <div class="mb-6">
                <label for="gambar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi Tempat Wisata</label>
                <input type="url" id="gambar" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" required onChange={e => setgambar(e.target.value)} value={gambar} />
                <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">masukan URL sumber gambar</p>
            </div>

            <div class="mb-6">
                <label for="gambar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preview Gambar</label>
                {
                    isPreview
                    &&
                    <img src={gambar} alt="" srcset="" />
                }
            </div>

            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
        </form>

    </>);
}

export default FormEdit;