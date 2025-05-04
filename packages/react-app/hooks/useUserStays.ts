import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useStayContract } from './UseStayContract';

type Stay = {
  id: bigint;
  guest: string;
  metadataHash: string;
  timestamp: bigint;
  status: number;
  index: number;
};

export const useUserStays = () => {
  const { address, isConnected } = useAccount();
  const contract = useStayContract();

  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStays = async () => {
      if (!isConnected || !address || !contract) return;

      setLoading(true);
      setError(null);

      try {
        const count = await contract.read.getStayCount([address]);
        const stayCount = Number(count);

        const promises = Array.from({ length: stayCount }).map((_, i) =>
          contract.read.getStay([address, BigInt(i)]).then((stayData) => ({
            ...stayData,
            index: i,
          }))
        );

        const stayList = await Promise.all(promises);
        setStays(stayList);
      } catch (err: any) {
        console.error('❌ Error fetching stays:', err);
        setError('Failed to load stays.');
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, [address, isConnected, contract]);

  return { stays, loading, error };
};
