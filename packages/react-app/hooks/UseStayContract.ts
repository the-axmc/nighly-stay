import { usePublicClient } from 'wagmi';
import { getContract } from 'viem';
import { useMemo } from 'react';
import { NightlyStayAttestationABI } from '../abi/NightlyStayAttestation';
import { CONTRACT_ADDRESS } from '../constants/contract';
import type { Abi } from 'viem';

export const useStayContract = () => {
  const publicClient = usePublicClient();

  return useMemo(() => {
    if (!publicClient) return null;

    return getContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: NightlyStayAttestationABI as Abi,
      client: publicClient,
    });
  }, [publicClient]);
};
