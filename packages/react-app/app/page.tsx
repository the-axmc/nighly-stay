'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useStayContract } from '../hooks/UseStayContract';
import StayForm from '../components/StayForm';

type Stay = {
  id: bigint;
  guest: `0x${string}`;
  metadataHash: string;
  timestamp: bigint;
  status: number;
};

export default function Home() {
  const { address, isConnected } = useAccount();
  const contract = useStayContract();

  const [isMounted, setIsMounted] = useState(false);
  const [stayCount, setStayCount] = useState<number | null>(null);
  const [latestStay, setLatestStay] = useState<Stay | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!isConnected || !address || !contract?.read) return;

      try {
        const count = await contract.read.getStayCount([address]);
        setStayCount(Number(count));

        if (Number(count) > 0) {
          const stay = await contract.read.getLatestStay([address]);
          setLatestStay(stay as Stay);
        }
      } catch (err) {
        console.error(err);
        setError('⚠️ Error reading stay data from smart contract');
      }
    };

    fetchData();
  }, [isConnected, address, contract]);

  if (!isMounted) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-2">Nightly Stay Dashboard</h1>

      {!isConnected && <p className="text-gray-600">No Wallet Connected</p>}

      {isConnected && (
        <>
          <p className="text-sm text-gray-500 mb-4">Connected: {address}</p>

          {error && <p className="text-red-500">{error}</p>}

          {stayCount !== null && (
            <p className="mb-2">Total stays recorded: {stayCount}</p>
          )}

          {latestStay && (
            <div className="p-4 mt-2 mb-4 rounded-md border bg-gray-50 text-sm text-left max-w-md w-full">
              <p><strong>Last Stay ID:</strong> {latestStay.id.toString()}</p>
              <p><strong>Metadata Hash:</strong> {latestStay.metadataHash}</p>
              <p><strong>Timestamp:</strong> {new Date(Number(latestStay.timestamp) * 1000).toLocaleString()}</p>
              <p><strong>Status:</strong> {latestStay.status}</p>
            </div>
          )}

          <StayForm />
        </>
      )}
    </main>
  );
}
