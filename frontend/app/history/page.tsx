"use client";

import { useEffect, useState } from "react";
import { getHistory } from "@/services/api";

interface MilkingRecord {
  _id: string;
  animalName: string;
  duration: number;
}

export default function HistoryPage() {
  const [data, setData] = useState<MilkingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(data, "data");  
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setData(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Milking History</h2>

      <ul>
        {data.length === 0 && <li>No records found</li>}

        {data.map(item => (
          <li key={item?._id}>
            {item?.animalName} –{" "}
            {typeof item.duration === "number"
              ? item.duration?.toFixed(2)
              : "N/A"}{" "}
            mins
          </li>
        ))}
      </ul>
    </div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// //import { getHistory } from "../../services/api";
// import { getHistory } from "@/services/api";
// export default function HistoryPage() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
// console.log(data,'data');
//     getHistory().then(res => setData(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Milking History</h2>

//       <ul>
//         {data.map(item => (
//           <li key={item._id}>
//              {item.animalName} – {item.duration?.toFixed(2)} mins
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
