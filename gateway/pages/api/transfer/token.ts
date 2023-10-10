// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { transfer} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { transferSOL, decrypt, fetchMultisigAccount } from '@lunchboxfi/sdk/lib'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { loadWalletKeypair } from '@/utils';
import { verifyOwnership } from '../verify';
import bs58 from 'bs58'

type Data = {
  name: number | any
}

const supabase = createClientComponentClient()

import crypto from 'crypto';

export function scramblePin(pin: any, randomString: any): string {
// Create a secret key for HMAC based on the randomString
const secretKey = crypto.createHash('sha256').update(randomString).digest();
// Calculate the HMAC of the PIN using the secret key
const hmac = crypto.createHmac('sha256', secretKey);
hmac.update(pin.toString()); // Convert PIN to a string before hashing
// The scrambled PIN will be the hexadecimal representation of the HMAC
const scrambledPin = hmac.digest('hex');

return scrambledPin;
  
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { to, PIN, userNonce, cardNumber, amount } = req.body;
  
    
    console.log({ to });

    if (req.method === 'POST') {

      let { data: cards, error } = await supabase
       .from('cards')
       .select('card_number, protocolNonce, aes_encrypted_key, multisigPda')
       .eq('card_number', cardNumber)
       
      // returns protocolNonce && value
     if(cards) {
      let protocolNonce = cards[0]?.protocolNonce;
      let encrptedValue = cards[0]?.aes_encrypted_key;
      let multisigPubkey = cards[0]?.multisigPda
      
      const memberOne = decrypt(PIN, userNonce, protocolNonce, encrptedValue)
      
      if(memberOne){
        const memberOnekeypair = loadWalletKeypair(memberOne)
        
        const scrambled = scramblePin(PIN, userNonce)
        


        let { data: advisor, error } = await supabase
       .from('adv')
       .select('advisor_privateKey, multisigPda')
       .eq('multisigPda', multisigPubkey)
        
       if (advisor){
        const advisorKey = advisor[0]?.advisor_privateKey
        const array = bs58.decode(advisorKey)
        const advisorkeypair = loadWalletKeypair(array)
        console.log("Facksssjdj" + memberOnekeypair.publicKey)
        console.log("Facksssjdj" + advisorkeypair.publicKey)
        const toPubkey = new PublicKey(to)
        const mPub = new PublicKey(multisigPubkey)
        console.log("fetch:" + fetchMultisigAccount("54qydCkgRmc5XerpqmpjYddCwAUNqD2FN15p2JzXRSfM", "devnet"))
        const signers = [ memberOnekeypair, advisorkeypair ]
        const signature =  await transferSOL("devnet", memberOnekeypair, toPubkey, mPub, amount, signers)
        console.log(signature)
       }
        
        
      }
     }
      

      // let encrptedValue = cards?.values;

      // const memberOne = decrypt(PIN, userNonce, protocolNonce, encrptedValue)

      // const scrambledPin = scramblePin(PIN, userNonce)

      // let verify = verifyOwnership(scramblePin, protocolNonce)

      // if(verify) {
      //   const memberTwo = // get associated advisor keypair from supabase
      //   const signers = [ memberOne, memberTwo ]
      //   transferSOL("devnet", memberOne, to, multisigPubkey, amount, signers)
      }
      

      
      // const to = new PublicKey("8D2AoV1TqSLN3GKFJD1tujiK8RK9RGkkkwug1McKStiC");
      // const memberOne = loadWalletKeypair([212,243,134,229,121,198,6,168,223,223,58,152,186,16,127,173,23,131,31,195,80,109,186,100,26,205,202,115,233,15,251,176,108,83,169,196,205,75,119,116,36,134,138,127,239,29,174,6,136,197,90,169,127,17,209,224,2,114,74,149,188,176,144,17]);
      // const memberTwo = loadWalletKeypair([10,252,200,135,199,62,1,1,62,48,241,93,117,19,212,105,221,18,82,248,242,238,253,36,119,151,137,13,24,39,230,220,141,111,97,105,50,143,120,60,197,36,128,208,38,204,46,180,108,75,119,17,102,94,165,31,217,255,131,106,0,253,169,100]);
      // const amount = 0.02; // Amount in SOL
      // const signers = [memberOne, memberTwo]; // Load your keypair
      // const multisigPubkey = new PublicKey("FPr8TrG5Hfp4dFFxA4ZivbBk5PbzDRueoMeXTYSDZWps");
        
      //   
        res.status(200).json({ name: cardNumber })
      // } else {
      //   // Handle any other HTTP method
      //   res.status(500).json({ name: 'error' })
      // }

  
}
