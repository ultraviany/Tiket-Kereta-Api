"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type props = {
    start_date: string
    end_date: string
}

const FilterPemesanan = (myProp: props) => {
    const [start_date, setStart_date] = useState<string>("")
    const [end_date, setEnd_date] = useState<string>("")
    const router = useRouter()

    const handleSearch = ()=>{
        //jika sudah mengisi tanggal awal dan tanggal akhir
        if (start_date !== "" &&
            end_date !== ""
        ) {
            //mengalihkan url yang dituju
            router.push(`/pelanggan/HistoryPemesanan?start_date=${start_date}&end_date=${end_date}`)
        }
    }

    // digunakan untuk update data saat komponen ini dimuat ulang
    useEffect (()=>{
        setStart_date(myProp.start_date)
        setEnd_date(myProp.end_date)
    },[myProp])
    return (
        <div className="my-5 w-full flex flex-wrap items-center">
            <div className="w-full md:w-1/2 p-3">
            <strong className="font-semibold text-white">
                    Tanggal Awal
                </strong><br />
                <input type="text"
                    id={`start_date`}
                    className="w-full border p-2 rounded-sm"
                    value={start_date}
                    onChange={e => setStart_date(e.target.value)} />
            </div>

            <div className="w-full md:w-1/2 p-3">
            <strong className="font-semibold text-white">
                    Tanggal Akhir
                </strong><br />
                <input type="text"
                    id={`end_date`}
                    className="w-full border p-2 rounded-sm"
                    value={end_date}
                    onChange={e => setEnd_date(e.target.value)} />
            </div>
            <button type="button"
                onClick={() => handleSearch()}
                className="px-4 py-2 mx-3 rounded-md bg-orange-600 hover:bg-orange-500 text-white">
                Filter
            </button>

        </div>
    )
}
export default FilterPemesanan