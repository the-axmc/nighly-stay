'use client';

import { useUserStays } from '../../hooks/useUserStays';
import { useEffect, useState } from 'react';
import { fetchIPFSMetadata } from '../../utils/fetchIPFSMetadata';
import { getCidForHash } from '../../utils/cidRegistry';

type StayMetadata = {
  guestName: string;
  cost: string;
  nights: number;
  guests: number;
  notes?: string;
};

export default function DashboardPage() {
  const { stays, loading, error } = useUserStays();
  const [metadataMap, setMetadataMap] = useState<Record<number, StayMetadata>>({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchAllMetadata = async () => {
      const entries = await Promise.allSettled(
        stays.map(async (stay) => {
          const cid = getCidForHash(stay.metadataHash);
          if (!cid) return null;

          try {
            const metadata = await fetchIPFSMetadata(cid);
            return [stay.index, metadata] as [number, StayMetadata];
          } catch (e) {
            console.warn(`❌ Failed to load metadata for stay ${stay.index}:`, e);
            return null;
          }
        })
      );

      const validEntries = entries
        .filter((r): r is PromiseFulfilledResult<[number, StayMetadata]> => r.status === 'fulfilled' && r.value)
        .map((r) => r.value);

      setMetadataMap(Object.fromEntries(validEntries));
    };

    if (stays.length > 0) fetchAllMetadata();
  }, [stays]);

  const filteredStays = stays
    .filter((stay) => {
      const metadata = metadataMap[stay.index];
      return filter === '' || metadata?.guestName.toLowerCase().includes(filter.toLowerCase());
    })
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Your Stay History</h1>

      <input
        type="text"
        placeholder="🔍 Search by guest name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 w-full p-2 border rounded shadow-sm"
      />

      {loading && <p className="text-gray-500">Loading stays...</p>}
      {error && <p className="text-red-600">⚠️ {error}</p>}
      {!loading && stays.length === 0 && <p>No stays recorded yet.</p>}

      <ul className="space-y-4">
        {filteredStays.map((stay) => {
          const metadata = metadataMap[stay.index];
          return (
            <li key={stay.index} className="p-4 border rounded bg-white shadow-sm">
              {metadata ? (
                <>
                  <p><strong>🧍 Guest:</strong> {metadata.guestName}</p>
                  <p><strong>💰 Cost:</strong> {metadata.cost} cUSD</p>
                  <p><strong>🛏️ Nights:</strong> {metadata.nights}</p>
                  <p><strong>👥 Guests:</strong> {metadata.guests}</p>
                  {metadata.notes && <p><strong>📝 Notes:</strong> {metadata.notes}</p>}

                  <div className="text-xs text-gray-500 mt-3">
                    <p>📅 {new Date(Number(stay.timestamp) * 1000).toLocaleString()}</p>
                    <p>ID: {stay.id.toString()}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-800">🧾 Metadata unavailable</p>
                  <p className="text-xs text-gray-400">📭 CID not found for hash: {stay.metadataHash}</p>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
