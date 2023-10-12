import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

function Success() {

  const router = useRouter();
  const { receiver, amount, symbol} = router.query

  console.log(receiver)
  const receiverText = receiver || 'Unknown Receiver';
  const amountText = amount || 'N/A';
  const symbolText = symbol || 'N/A';

  return (
    <div className='w-[100%] h-[100vh] text-black  flex justify-center items-center'>
        <div className='bg-white text-center rounded-2xl py-12 w-[60%] h-[80vh]'>
        <Player
           autoplay
           loop
           src={"lottie.json"}
           className="h-[100%] w-[10rem] xl:w-[30rem]"
         />
         <h3 className='font-main'>You successfully paid {amountText} {symbolText} to {receiver}</h3>

        </div>
    </div>
  )
}

export default Success