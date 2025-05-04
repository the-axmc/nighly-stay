'use client';

import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { keccak256, toHex, parseEther } from 'viem';
import { NightlyStayAttestationABI } from '../abi/NightlyStayAttestation';
import { CONTRACT_ADDRESS } from '../constants/contract';
import { uploadToIPFS } from '../lib/uploadToIPFS';

const cUSD_CONTRACT = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'; // Alfajores

export default function StayForm() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [formData, setFormData] = useState({
    guestName: '',
    cost: '1',
    nights: 1,
    guests: 1,
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletClient || !address) return;

    setStatus('loading');

    try {
      const metadataJSON = JSON.stringify(formData);
      const metadataHash = keccak256(toHex(metadataJSON));
      const cost = parseEther(formData.cost);

      // 1️⃣ Upload to IPFS
      const cid = await uploadToIPFS(formData);

      // 2️⃣ Approve cUSD transfer
      await walletClient.writeContract({
        address: cUSD_CONTRACT,
        abi: [
          {
            name: 'approve',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'spender', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ name: '', type: 'bool' }],
          },
        ],
        functionName: 'approve',
        args: [CONTRACT_ADDRESS, cost],
        account: address,
      });

      // 3️⃣ Record stay (with metadataHash + IPFS CID)
      await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: NightlyStayAttestationABI,
        functionName: 'recordStay',
        args: [metadataHash, cid],
        account: address,
      });

      console.log(`✅ Metadata stored at ipfs://${cid}`);
      setStatus('success');
      setFormData({ guestName: '', cost: '1', nights: 1, guests: 1, notes: '' });
    } catch (err) {
      console.error('❌ Error submitting stay:', err);
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-6 p-4 border rounded bg-white shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">🏨 Record New Stay</h2>

      <input
        type="text"
        name="guestName"
        value={formData.guestName}
        onChange={handleChange}
        placeholder="Guest Name"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="cost"
        value={formData.cost}
        onChange={handleChange}
        min={0.1}
        step={0.01}
        placeholder="Cost in cUSD"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="nights"
        value={formData.nights}
        onChange={handleChange}
        min={1}
        className="w-full p-2 border rounded"
        placeholder="Number of nights"
        required
      />

      <input
        type="number"
        name="guests"
        value={formData.guests}
        onChange={handleChange}
        min={1}
        className="w-full p-2 border rounded"
        placeholder="Number of guests"
        required
      />

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Additional notes (optional)"
        className="w-full p-2 border rounded"
        rows={3}
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        disabled={status === 'loading' || !isConnected}
      >
        {status === 'loading' ? 'Processing...' : 'Record Stay'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 mt-2">✅ Stay recorded successfully!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-2">⚠️ Something went wrong.</p>
      )}
    </form>
  );
}
