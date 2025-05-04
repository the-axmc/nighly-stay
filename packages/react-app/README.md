### NightlyStay · Smart Contract + dApp on Celo Alfajores

A minimal, on-chain attestation and reputation system for tracking nights stayed — built for hospitality, digital guestbooks, or creative phygital experiences.

Created using Celo Composer and deployed on Celo Alfajores Testnet.

---

## What This Project Does

This dApp allows users to:

    - Connect a Celo compatible wallet

    - Record a "stay" with metadata (e.g., duration, location, experience)

    - View total number of stays recorded for their wallet

    - Retrieve details of their latest stay (ID, metadata hash, timestamp, status)

Behind the scenes:

    🧾 The user submits a description of their stay.

    🧠 The dApp hashes the metadata to bytes32 and stores it on-chain.

    💸 Users must approve a small cUSD payment before recording a stay.

    🔐 All data is written via smart contracts, ensuring transparency and traceability.

## What the Smart Contract Does

The smart contract deployed to Alfajores handles:

    Storing a Stay struct with:

        - id

        - guest address

        - metadataHash (keccak256 of input text)

        - timestamp

        - status (enum)

    Auto-incrementing stay IDs

    Tracking stays per user (getStayCount)

    Returning the latest stay (getLatestStay)

    Restricting sensitive actions to the contract owner (onlyOwner)

A public Attestation event is emitted on every new stay.
🛠 Built With

    🦄 Celo Composer

    🧱 Hardhat for smart contract development

    🔗 wagmi + viem for frontend Web3 hooks

    🎨 Tailwind CSS for styling

    💸 cUSD token on Alfajores

    🔁 Celo Alfajores Testnet (faucet here)

🧑‍💻 How to Run It

# Clone and install

git clone https://github.com/your-username/nightlystay
cd nightlystay/packages/react-app
npm install

# Start frontend

npm run dev

🧪 Deploy Smart Contracts

From the root project folder:

cd packages/hardhat
npx hardhat deploy --network alfajores

Update the deployed contract address in:

packages/react-app/constants/contract.ts

🌍 Powered By CELO Europe

This project was created as part of the Celo Europe initiative —
supporting builders creating phygital, real-world, and decentralized experiences across the continent.

    Want to expand this with loyalty rewards, IPFS metadata, SBT badges, or real-world integrations?
    Get in touch at celo.org or follow the @CeloEurope community on X.

📜 License

MIT — use, fork, and build upon it freely!
