'use client';

import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { parseEther, keccak256, toHex } from 'viem';
import { NightlyStayAttestationABI } from '../abi/NightlyStayAttestation';
import { CONTRACT_ADDRESS } from '../constants/contract';

const cUSD_CONTRACT = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'; // Alfajores cUSD

export default function StayForm() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [metadata, setMetadata] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletClient || !address || !metadata) return;

    setStatus('loading');

    try {
      // Convert metadata to bytes32 hash
      const metadataHash = keccak256(toHex(metadata, { size: 32 }));

      const cost = parseEther('1'); // Example: 1 cUSD

      // 1️⃣ Approve cUSD to the contract
      await walletClient.writeContract({
        address: cUSD_CONTRACT,
        abi: [
          {
            name: 'approve',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'spender', type: 'address' },
              { name: 'amount', type: 'uint256' }
            ],
            outputs: [{ name: '', type: 'bool' }]
          }
        ],
        functionName: 'approve',
        args: [CONTRACT_ADDRESS, cost],
        account: address,
      });

      // 2️⃣ Call `recordStay(metadataHash)`
      await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: NightlyStayAttestationABI,
        functionName: 'recordStay',
        args: [metadataHash],
        account: address,
      });

      setStatus('success');
      setMetadata('');
    } catch (err) {
      console.error('💥 Error:', err);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">Record New Stay</h2>

      <textarea
        value={metadata}
        onChange={(e) => setMetadata(e.target.value)}
        placeholder="Enter metadata for your stay"
        className="w-full p-2 border rounded mb-4"
        rows={4}
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={status === 'loading' || !isConnected}
      >
        {status === 'loading' ? 'Processing...' : 'Record Stay'}
      </button>

      {status === 'success' && <p className="text-green-600 mt-2">✅ Stay recorded successfully!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">⚠️ Something went wrong. Try again.</p>}
    </form>
  );
}
