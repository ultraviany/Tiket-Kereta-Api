import { SeatType } from "../../types"
import DropKursi from "./dropSeat"
import EditKursi from "./editSeat"

type props = {
    item: SeatType
}
const Seat = (myProp: props) => {
    return (
        <div className="size-20 rounded-md gap-2 flex flex-col items-center justify-center bg-sky-700">
            <span className="text-white font-semibold">
                {myProp.item.seat_number}
            </span>


            <div className="flex gap-1">
                <EditKursi kursi={myProp.item} />
                <DropKursi kursi={myProp.item} />
            </div>

        </div>

    )
}
export default Seat