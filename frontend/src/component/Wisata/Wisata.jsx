import { useState, useEffect } from "react";
import CardWisata from "../Card/Card";

const Wisata = () => {
    const [wisatas, setwisatas] = useState([])
    const [show, setshow] = useState(true)
    const URL = "http://localhost:4444/wisata"

    useEffect(() => {

        fetch(URL, {
            method: "GET",
            headers: { 'content-type': "application/json" }
        })
            .then(res => { return res.json() })
            .then(data => {
                if (data.data == null) {
                    setshow(true)
                    return
                }
                setwisatas(data.data)
                setshow(true)
            })
    }, [URL])


    return (<>
        <div className="cover flex flex-wrap gap-5">
            {
                show
                &&
                wisatas.map((wisata) => (
                    <div className="card">
                        <CardWisata
                            id={wisata.id}
                            gambar={wisata.gambar}
                            nama={wisata.nama}
                            lokasi={wisata.lokasi}
                            harga={wisata.harga}
                        />
                    </div>
                ))
            }
        </div>
    </>);
}

export default Wisata;