"use-client"

import { SeatType } from "@/app/karyawan/types"
import Modal from "@/components/modal"
import { FormEvent, useState } from "react"

type SeatBook = {
    passanger_id: string
    passanger_name: string
    seat_number: string
}
type Props = {
    item: SeatType
    onSave: (item: SeatBook) => void
}
const Seat = (myProp: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [passanger_id, setPasanngerID] = useState<string>("")
    const [passanger_name, setPassangerName] = useState<string>("")

    const openModal = () => {
        setShow(true)
        setPasanngerID("")
        setPassangerName("")
    }
    const closeModal = () => {
        setShow(false)
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setShow(false)
        myProp.onSave({
            passanger_id,
            passanger_name,
            seat_number: myProp.item.seat_number
        })
    }

    return (
        <div>
            <button type="button"
                onClick={() => openModal()}
                // bernilai true button tidak bisa dipilih
                disabled={myProp.item.used}
                // ketika belum dipesan berwarna biru, dan sebliknya berwarna abu-abu
                className="size-10 flex items-center justify-center font-semibold rounded-md bg-sky-600 disabled:bg-slate-600 text-white">
                {myProp.item.seat_number}
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg ">
                            Identitas Penumpang
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2">
                            <small className="text-xs font-semibold text-sky-600">
                                Nomor Kursi
                            </small> <br />
                            <strong className="font-semibold">
                                {myProp.item.seat_number}
                            </strong>
                        </div>

                        <div className="my-2">
                            <small className="text-xs font-semibold text-sky-600">
                                NIK Penumpang
                            </small> <br />
                            <input
                                type="number"
                                id={`nik-${myProp.item.id}`}
                                required={true}
                                value={passanger_id}
                                onChange={e => setPasanngerID(e.target.value)}
                                className="w-full p-2 rounded-md border text-sm" />
                        </div>

                        <div className="my-2">
                            <small className="text-xs font-semibold text-sky-600">
                                Nama Penumpang
                            </small> <br />
                            <input
                                type="text"
                                id={`nama-${myProp.item.id}`}
                                required={true}
                                value={passanger_name}
                                onChange={e => setPassangerName(e.target.value)}
                                className="w-full p-2 rounded-md border text-sm" />
                        </div>
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
export default Seat