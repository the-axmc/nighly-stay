### NightlyStay App – Overview

NightlyStay is a decentralized lodging attestation app built on the Celo blockchain that leverages EAS-style on-chain attestations to record and verify short-term accommodation stays (like Airbnb, hotels, hostels, etc.).

---

## 📜 Smart Contract Functionality (NightlyStayAttestation)

The smart contract deployed on Celo handles the recording and retrieval of guest stays, enabling an on-chain proof of lodging events.

Key features:

    - Record Stay:

    Users (guests or hosts) submit a hashed metadata record (bytes32) and a CID (IPFS link) via recordStay(bytes32 metadataHash, string cid).

        ✅ Saves the data on-chain.

        ✅ Emits StayRecorded and Attestation events with metadata + CID.

        ✅ Stores the full Stay struct with ID, address, timestamp, and status (Recorded, Verified, or Disputed).

    - Querying:

        getStayCount(address) → total stays recorded by a user.

        getStay(address, index) → returns individual stay struct.

        getLatestStay(address) → gets most recent stay.

        getCid(bytes32 metadataHash) → returns the IPFS CID associated with a metadata hash.

    - State:

        Every stay is stored per user (mapping(address => Stay[])).

        An additional mapping(bytes32 => string) tracks IPFS hashes per record.

## 🌐 What the DApp Lets Users Do

The React + Next.js front-end built with Wagmi, Viem, and RainbowKit allows users to:

- Record a New Stay:

  Fill out a form with:

        Guest name, cost, nights, number of guests, notes.

  The metadata is:

        ✅ Uploaded to IPFS.

        ✅ Hashed and stored on-chain via the smart contract.

        ✅ Associated with a payment approval (e.g., 1 cUSD).

- View Stay History:

  Dashboard displays:

        All previous stays.

        Metadata (from IPFS) like guest name, cost, etc.

        Blockchain data: timestamps, IDs, and status.

  Includes a search filter by guest name.

## 💡 Designed For:

- Travel / hospitality ecosystems.

- Hosts needing verifiable records.

- Integration with decentralized reputation or passport systems.

# App Structure

packages/react-app/
├── app/
│ ├── page.tsx
│ └── dashboard/
│ └── page.tsx ✅ new dashboard route
├── hooks/
│ ├── UseStayContract.ts
│ └── useUserStays.ts ✅ new hook
├── lib/
│ └── uploadToIPFS.ts
├── utils/
│ └── fetchIPFSMetadata.ts ✅ new util
├── components/
│ └── StayForm.tsx
