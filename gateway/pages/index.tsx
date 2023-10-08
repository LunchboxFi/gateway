import Image from 'next/image'
import { Inter, Gayathri } from 'next/font/google'

const gayathri = Gayathri({ weight: ["100", "400", "700"],subsets: ['latin'] })

export default function Home() {
  return (
    <div
      className={`flex min-h-screen w-[100%] flex-col items-center justify-center px-[25%] ${gayathri.className}`}
    >
       <div className='bg-white text-black rounded-3xl p-8 shadow-none outline-none border-white w-[100%] h-[70vh]'>
        <div className='flex justify-center'>
        <img src='lunnhbox.png' className='w-[80px] h-[80px]' />
        </div>
       <h2 className='font-700 text-xl'>Card Number</h2>
       <p className='text-[#00000080]'>Enter the 16 digit card number on your card</p>
       <input placeholder='1652 2365 2543 2567' className='outline-none text-xl p-3 mt-3 rounded-xl w-[100%] bg-[#dfd0eb60]' />
       
       
       <div className='flex flex-row justify-between items-center'>
        <div className='mt-7'>
          <h3 className='text-lg'>Your bump</h3>
          <p className='text-sm text-[#00000080]'>This is the 12 digit character attached to your account</p>
        </div>
        <input placeholder='1Erdff#$2rf45b' className='outline-none max-h-12 text-xl p-3 mt-3 rounded-xl w-[40%] bg-[#dfd0eb60]' />
       </div>

       <div className='flex flex-row justify-between items-center'>
        <div className='mt-7'>
          <h3 className='text-lg'>Your PIN</h3>
          <p className='text-sm text-[#00000080]'>This is your digit PIN for your card</p>
        </div>
        <input placeholder='PIN' className='outline-none max-h-12 text-xl p-3 mt-3 rounded-xl w-[40%] bg-[#dfd0eb60]' />
       </div>

       <div className='flex-grow flex justify-center w-[100%]'>
         <h3 className='p-9'>Powered by Solana</h3>
       </div>
       </div>
    </div>
  )
}
