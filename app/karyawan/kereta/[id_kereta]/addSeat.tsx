"use client"

import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import { axiosInstance } from "@/helper/api"
import { useRouter } from "next/navigation"
import Modal from "@/components/modal"
type props = {
    id_wagon: number
}
const AddSeat = (myProp: props) => {
    const [seat_number, setSeatNumber] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const [wagon_id, setWagonId] = useState<number>(0)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setSeatNumber("")
        setWagonId(myProp.id_wagon)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/seat`
            const requestData = {
                seat_number, wagon_id
            }
            const response: any = await axiosInstance.post(
                url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
            )
            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId:`toastAddSeat-${myProp.id_wagon}`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId:`toastAddSeat-${myProp.id_wagon}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something wrong`,
                {
                    containerId: `toastAddSeat-${myProp.id_wagon}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer
                containerId={`toastAddSeat-${myProp.id_wagon}`} />
            <button type="button"
                onClick={() => openModal()}
                className="size-10 rounded-sm flex items-center justify-center bg-green-600 hover:bg-green-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Kursi
                        </h1>
                        <span className="text-sm  text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nomor Kursi
                            </small>
                            <input type="text" id={seat_number}
                                value={seat_number}
                                onChange={e => setSeatNumber(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button"
                            onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
export default AddSeat