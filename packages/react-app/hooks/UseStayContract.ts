import { usePublicClient } from 'wagmi';
import { NightlyStayAttestationABI } from '../abi/NightlyStayAttestation';
import { CONTRACT_ADDRESS } from '../constants/contract';
import type { Abi } from 'viem';

export const useStayContract = () => {
  const publicClient = usePublicClient();

  return {
    read: {
      getStayCount: (args: [string]) =>
        publicClient.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: NightlyStayAttestationABI as Abi,
          functionName: 'getStayCount',
          args,
        }),
      getLatestStay: (args: [string]) =>
        publicClient.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: NightlyStayAttestationABI as Abi,
          functionName: 'getLatestStay',
          args,
        }),
    },
  };
};
