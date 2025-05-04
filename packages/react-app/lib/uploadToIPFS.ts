export async function uploadToIPFS(data: object): Promise<string> {
  const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
  const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET!;

  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET,
    },
    body: JSON.stringify({ pinataContent: data }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ IPFS Upload Failed: ${err}`);
  }

  const json = await res.json();
  return `ipfs://${json.IpfsHash}`; // or return CID only
}
