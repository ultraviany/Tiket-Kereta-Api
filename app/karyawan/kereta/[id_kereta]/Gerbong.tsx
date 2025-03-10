import { GerbongType } from "../../types"
import AddSeat from "./addSeat"
import DropGerbong from "./dropGerbong"
import EditGerbong from "./editGerbong"
import Seat from "./seat"

type props = {
    item: GerbongType
}
const Gerbong = (myProp: props) => {
    return (
        <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
            <div className="p-3">
                <small className="text-xs text-sky-600">Nama Gerbong</small>
                {/* br untuk enter */}
                <br />
                {myProp.item.name}
                <br />
                Jumlah Kursi: {myProp.item.seat_count}

                <div className="w-full my-2 flex flex-wrap gap-2">
                    <AddSeat id_wagon={myProp.item.id}/>
                    {
                        myProp.item.seats.length == 0 ?
                        <div className="bg-sky-200 p-5 rounded-md">
                            Gerbong ini belum mempunyai kursi
                        </div> :
                        <div className="flex flex-wrap gap-3">
                            {
                                myProp.item.seats.map((seat, index) => (
                                    <Seat key={`keySeat-${index}`}
                                    item={seat} />
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="p-3 flex gap-2">
                <EditGerbong item={myProp.item} />
                <DropGerbong item={myProp.item} />
            </div>
        </div>
    )
}
export default Gerbong