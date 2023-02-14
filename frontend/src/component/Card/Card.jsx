import { useEffect } from "react"


const CardWisata = (props) => {
    console.log(props)
    const handleDelete = (e) => {
        const id = e.target.value * 1
        const URL = `http://localhost:4444/wisata/${id}`
        fetch(URL, {
            method: "DELETE"
        })
            .then(res => { return res.json() })
            .then(data => {
                if (data.meta.code === 200) {
                    window.location.reload()
                }
            })
    }

    return (<>

        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src={props.gambar} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.nama}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lokasi : {props.lokasi}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Harga : Rp{props.harga}</p>

                <div className="group flex gap-3">
                    <a href={`/admin/edit-wisata/${props.id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit
                    </a>
                    <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleDelete} value={props.id}>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    </>);
}

export default CardWisata;