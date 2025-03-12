export const dynamic = "force-dynamic";
import { axiosInstance } from '@/helper/api'
import { getServerCookie } from '@/helper/server-cookie'
import React from 'react'
import HistoryCard from './components/historyCard'
import { History } from '@/app/karyawan/types'
import FilterPemesanan from './FilterPemesanan'

const GetDataHistory = async (
    start_date: string,
    end_date: string
): Promise<History[]> => {
    try {
        //langkah1 tambahkan url yang akan dituju
        const url = `/purchase/customer?start_date=${start_date}&end_date=${end_date}`
        const TOKEN = await getServerCookie(`token`)
        //hit endpoint
        const response: any = await axiosInstance
            .get(url, {
                headers: { Authorization: `Bearer ${TOKEN}` }
            })
        if (response.data.success === true)
            return response.data.data

        return []
    } catch (error) {
        console.log(error);
        return []
    }
}

type Props = {
    searchParams: Promise <{
        start_date?: string
        end_date?: string
    }>
}
const page = async (myProp: Props) => {
    const start_date = (await myProp.searchParams).start_date?.toString() || ""
    const end_date = (await myProp.searchParams).end_date?.toString() || ""

    const historyData = await GetDataHistory(
        start_date,
        end_date
    )

    return (
        <div className="w-full p-3">
            <div className="bg-sky-700 w-full p-3 rounded-md shadow-md">
                <h1 className="text-white text-xl font-bold">
                    History Pemesanan Tiket
                </h1>

                <FilterPemesanan
                    start_date={start_date}
                    end_date={end_date}
                />
            </div>

            {
                start_date !== "" &&
                end_date !== "" &&
                <div>
                    {/* div ini akan tampil jika  deploc dan arrivloc telah diisi (tidak kosong) */}
                    {
                        historyData.length == 0 ?
                            <div className="w-full p-3 rounded-md bg-orange-100">
                                Maaf, jadwal tidak tersedia
                            </div> :
                            <div>
                                {
                                    historyData.map((item, index) => (
                                        <HistoryCard
                                            item={item}
                                            key={`keyHistory-${index}`} />
                                    ))
                                }
                            </div>
                    }
                </div>
            }

        </div>
    )
}

export default page