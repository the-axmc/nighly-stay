export async function fetchIPFSMetadata(cid: string): Promise<any> {
  const res = await fetch(`https://ipfs.io/ipfs/${cid}`);
  if (!res.ok) throw new Error(`Failed to fetch metadata for CID: ${cid}`);
  return await res.json();
}
