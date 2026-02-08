"use client";

import { useEffect, useState } from "react";
import { getHistory } from "@/services/api";

/* ================= TYPES ================= */
interface Session {
  _id: string;
  startTime: string;
  endTime?: string;
  duration: number; // seconds
  milkQuantity?: number;

  formattedDate?: string;
  formattedStartTime?: string;
  formattedEndTime?: string;
}

/* ================= COMPONENT ================= */
export default function HistoryPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  /* ================= FETCH HISTORY ================= */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        const rawSessions: Session[] = res?.data || [];

        // Format dates ONLY on client (avoids hydration mismatch)
        const formatted = rawSessions.map((s) => {
          const start = new Date(s.startTime);
          const end = s.endTime ? new Date(s.endTime) : null;

          return {
            ...s,
            formattedDate: start.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
            formattedStartTime: start.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            }),
            formattedEndTime: end
              ? end.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "--",
          };
        });

        setSessions(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /* ================= HELPERS ================= */
  const formatDuration = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return m === 0 ? `${s}s` : `${m}m ${s}s`;
  };

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(sessions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSessions = sessions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <p className="text-center py-20 text-blue-600 text-lg">
        Loading history...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-20 text-red-500 text-lg">
        {error}
      </p>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="w-full px-4 md:px-8 py-12">
      <h1 className="text-4xl font-black mb-8">Session History</h1>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50">
            <tr className="text-left text-blue-800">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Start Time</th>
              <th className="px-4 py-3">End Time</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Milk (L)</th>
            </tr>
          </thead>

          <tbody>
            {paginatedSessions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No sessions found
                </td>
              </tr>
            )}

            {paginatedSessions.map((s) => (
              <tr
                key={s._id}
                className="border-t hover:bg-blue-50 transition"
              >
                {/* Date */}
                <td className="px-4 py-3 font-semibold">
                  {s.formattedDate}
                </td>

                {/* Start Time */}
                <td className="px-4 py-3">
                  {s.formattedStartTime}
                </td>

                {/* End Time */}
                <td className="px-4 py-3">
                  {s.formattedEndTime}
                </td>

                {/* Duration */}
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    {formatDuration(s.duration)}
                  </span>
                </td>

                {/* Milk Quantity */}
                <td className="px-4 py-3 font-semibold">
                  {s.milkQuantity ?? "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            ← Prev
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
