// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { transfer} from '@solana/spl-token';
import { transferSOL } from '@lunchboxfi/sdk/lib'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        // Process a POST request
        res.status(200).json({ name: 'Token' })
      } else {
        // Handle any other HTTP method
        res.status(500).json({ name: 'error' })
      }

  
}
