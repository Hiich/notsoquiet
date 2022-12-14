// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  proof: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const discount = req.query.discount
  const resp = await fetch(
    `https://louisbekk.mypinata.cloud/ipfs/QmdPr27txWQt9NYJjTBmHEfopcCuqmGndfL11XSFCAgCTL/${discount}.json`
  )
  const proof = await resp.json()
  res.status(200).json({ proof: proof.proof })
}
