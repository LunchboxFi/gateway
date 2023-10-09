import Image from 'next/image'
import { Inter, Gayathri } from 'next/font/google'
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios'
import * as Yup from 'yup';

const gayathri = Gayathri({ weight: ["100", "400", "700"],subsets: ['latin'] })

export default function Home() {
  const [cardNumber, setCardNumber] = useState('');
  const [userNonce, setUserNonce] = useState('');
  const [PIN, setPIN] = useState('');

  const router = useRouter();

  enum TokenType {
    Token,
    Token2022
  }

  const { amount, receiver, tokenType, symbol, multisigPubkey } = router.query;

  // console.log({
  //   amount,
  //   receiver,
  //   tokenType,
  //   symbol
  // })
  

 
  // useEffect to trigger the POST request when the component mounts
  // useEffect(() => {
  //   handleSubmitr();
  // }, []); 

  const handleCardNumberChange = (e: any) => {
    const input = e.target.value;
    const formattedInput = input
      .replace(/\D/g, '') // Remove non-digit characters
      .replace(/(\d{4})/g, '$1 '); // Insert a space after every 4 characters

    setCardNumber(formattedInput);
  };

  const CardValidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .min(16, 'Card number must be 16 characters')
      .required('Card number is required'),
    bump: Yup.string()
      .min(12, 'Bump must be 12 characters')
      .required('Bump is required'),
    pin: Yup.string()
      .matches(/^\d{4}$/, 'PIN must be 4 digits')
      .required('PIN is required'),
  });
  
  
    async function handleSubmit(values: any, { setSubmitting }: any) {
      // Handle form submission here
      const transferPayload = {
        userNonce: values.bump,
        PIN: values.pin,
        to: receiver,
        cardNumber: values.cardNumber, 
        amount: amount, 
      }
      console.log(transferPayload)
      try {
        // Make a POST request to the server
        const response = await fetch('/api/transfer/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transferPayload),
        });
  
        if (!response.ok) {
          console.log(response)
        }
  
        const data = await response.json();
  
        // Handle the response as needed
        console.log('Server response:', data);
      } catch (error) {
        console.error('Error sending POST request:', error);
      }

      setSubmitting(false);
    }
  

  return (
    <div
      className={`flex min-h-screen w-[100%] flex-col items-center justify-center px-[25%] ${gayathri.className}`}
    >
       <div className='bg-white text-black rounded-3xl p-8 shadow-none outline-none border-white w-[100%] '>
        <div className='flex justify-center'>
        <img src='lunnhbox.png' className='w-[80px] h-[80px]' />
        </div>
        <Formik
      initialValues={{
        cardNumber: '',
        bump: '',
        pin: '',
      }}
      validationSchema={CardValidationSchema}
      onSubmit={handleSubmit}
    >
        {({ isSubmitting }) => (
        <Form>
          <h2 className='font-700 text-xl'>Card Number</h2>
          <p className='text-[#00000080]'>Enter the 16 digit card number on your card</p>
          <Field
            type='text'
            name='cardNumber'
            placeholder='1652 2365 2543 2567'
            className='outline-none font-main text-xl p-3 mt-3 rounded-xl w-[100%] bg-[#dfd0eb60]'
          />
          <ErrorMessage name='cardNumber' component='div' className='text-red-600' />

          <div className='flex flex-row justify-between items-center'>
            <div className='mt-7'>
              <h3 className='text-lg'>Your seed</h3>
              <p className='text-sm text-[#00000080]'>This is the 12 digit character attached to your account</p>
            </div>
            <div className='flex flex-col items-end w-[40%]'>
            <Field
              type='text'
              name='bump'
              placeholder='Erdf$2rf45#b'
              className='outline-none max-h-12 text-xl font-main p-3 mt-3 rounded-xl w-[100%] bg-[#dfd0eb60]'
            />
            <ErrorMessage name='bump' component='div' className='text-red-600' />
            </div>
            
          </div>

          <div className='flex flex-row justify-between items-center'>
            <div className='mt-7'>
              <h3 className='text-lg'>Your PIN</h3>
              <p className='text-sm text-[#00000080]'>This is your digit PIN for your card</p>
            </div>
            <div className='flex flex-col items-end w-[40%]'>
            <Field
              type='text'
              name='pin'
              placeholder='PIN'
              className='outline-none font-main max-h-12 text-xl p-3 mt-3 rounded-xl w-[100%] bg-[#dfd0eb60]'
            />
            <ErrorMessage name='pin' component='div' className='text-red-600' />
            </div>
            
          </div>

          <div className='w-[100%] flex justify-center'>
          <button type='submit' disabled={isSubmitting} className='bg-blue-500 font-main text-white p-3 w-[100%] mt-5 rounded-xl'>
            Pay {amount} {symbol}
          </button>
          </div>
          
        </Form>
      )}
    </Formik>

       <div className='flex-grow flex justify-center w-[100%]'>
         <h3 className='p-9'>Powered by Solana</h3>
       </div>
       </div>
    </div>
  )
}
