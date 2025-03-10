import { showTime } from "@/app/karyawan/jadwal/schedule";
import { History } from "@/app/karyawan/types";


interface Props {
  item: History
}

const HistoryCard = (props: Props) => {
  return (
    <div className='bg-sky-50 rounded-lg shadow-lg border border-gray-300 p-6 w-full transition-all hover:shadow-xl'>
      <div className='grid grid-cols-4 gap-6 mb-8'>
        <InfoSection
          title="TGL ORDER"
          content={showTime(props.item.purchase_date)}
        />
        <InfoSection
          title="Stasiun Awal"
          content={props.item.schedule_details.departured_location}
          subContent={showTime(props.item.schedule_details.departured_time)}
        />
        <InfoSection
          title="Stasiun Akhir"
          content={props.item.schedule_details.arrived_location}
          subContent={showTime(props.item.schedule_details.arrived_time)}
        />
        <InfoSection
          title="Nama Kereta"
          content={props.item.schedule_details.train_details?.name || "-"}
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-bold text-sky-600 mb-4">List Penumpang</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-600">
              <tr>
                <th className="text-white text-sm font-bold py-3 px-4 text-left">Nama</th>
                <th className="text-white text-sm font-bold py-3 px-4 text-left">NIK</th>
                <th className="text-white text-sm font-bold py-3 px-4 text-left">Nomor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {props.item.purchases_details.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{item.passanger_name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.passanger_id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.seat_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InfoSection = ({ title, content, subContent }: { 
  title: string;
  content: string;
  subContent?: string;
}) => (
  <div className='space-y-2'>
    <div className='font-bold text-sky-600 text-lg'>{title}</div>
    <div className="font-semibold text-gray-800">{content}</div>
    {subContent && (
      <div className="font-medium text-gray-600">{subContent}</div>
    )}
  </div>
);

export default HistoryCard;