"use client"

import Modal from "@/components/modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

import { SeatType } from "../../types"

type props = {
    kursi: SeatType
}

const DropKursi = (myProp: props) => {
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/seat/${myProp.kursi.id}`

            // hit endpoint to add kereta
            const response: any = await axiosInstance
                .delete(url, {
                    headers: {
                        authorization: `Bearer ${TOKEN}`
                    }
                })

            const message = response.data.message
            if (response.data.success == true) {
                toast(message, {
                    containerId: `toastDrop-${myProp.kursi.id}`,
                    type: "success"
                })
                setShow(false)
                // reaload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastDrop-${myProp.kursi.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            toast(
                `something wrong`,
                {
                    containerId: `toastDrop-${myProp.kursi.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastDrop-${myProp.kursi.id}`} />
            <button type="button" onClick={() => openModal()} className="px-1 py-1 bg-red-600 rounded-md hover:bg-red-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg ">
                            Hapus Kursi
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang dihapus sudah benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className="w-full p-3">
                        Apakah anda yakin ingin menghapus dara ini?
                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button
                            type="button" onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Ya, saya yakin
                        </button>
                    </div>
                </form>

            </Modal>
        </div>

    )


}
export default DropKursi