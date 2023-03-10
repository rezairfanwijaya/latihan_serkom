
const CardWisataUser = (props) => {
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

            </div>
        </div>


    </>);
}

export default CardWisataUser;