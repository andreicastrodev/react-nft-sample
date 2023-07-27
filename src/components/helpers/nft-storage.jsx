import crypto from 'crypto';
import { File, NFTStorage } from 'nft.storage';

const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFjYmMyODQwZDkzMGZEMkQ1NkExOTgzQzNlQmFkZDM3OUIyNjAyM0QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDQ0NTk3MzcwNSwibmFtZSI6InNhbXBsZSJ9.xumfq_g9TiM2UpCH0tEUV04ZJXnNazZ7kwDD7typivA';

export class NftStorageUploader {
  async upload(file, metadata) {
    const dataFileName = file.name;
    const dataContent = file.content;
    const dataHash = crypto.createHash('sha256').update(dataContent).digest('hex');
    const dataFile = new File([dataContent], dataFileName, { type: file.type });

    const metadataString = JSON.stringify(metadata, null, 2);
    const metadataHash = crypto.createHash('sha256').update(metadataString).digest('hex');
    const metadataFile = new File([metadataString], 'metadata.json', {
      type: 'application/json',
    });

    const client = new NFTStorage({
      token: NFT_STORAGE_TOKEN,
    });
    const cid = await client.storeDirectory([dataFile, metadataFile]);
    return {
      dataUris: [
        `https://nftstorage.link/ipfs/${cid}/${encodeURIComponent(dataFileName)}`,
        `ipfs://${cid}/${encodeURIComponent(dataFileName)}`,
      ],
      dataHash,
      metadataUris: [`https://nftstorage.link/ipfs/${cid}/metadata.json`, `ipfs://${cid}/metadata.json`],
      metadataHash,
    };
  }
}
