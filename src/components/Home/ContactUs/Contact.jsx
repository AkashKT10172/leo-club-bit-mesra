import { useRef } from "react"
import React from 'react'
import emailjs from '@emailjs/browser';

const Contact = () => {
  const myForm = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_q93y8hw', 'template_3t3bm2c', myForm.current, {
        publicKey: 'zrZUrtGicYNbKUnUn',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset();
  };
  return (
    <div className='h-auto w-full flex flex-col items-center'>
      <h1 className='text-center font-bold text-2xl sm:text-4xl text-wrap pt-14 underline'>Connect with us for Collaborations/Donations!</h1>
      <form ref={myForm} onSubmit={sendEmail} className='w-3/4 pt-4 flex flex-col justify-center items-center'>
      <div className='flex md:flex-row flex-col w-full h-auto'>
        <div className='md:w-2/4 w-full px-1 h-96'>
            <label htmlFor="user_name" className='text-xl'>First Name</label>
            <input type="text" placeholder='FIrst Name' name='user_Fname' required className='border-slate-800 border-2 p-2 w-full rounded-sm h-[59px]'/>
            <label htmlFor="user_name" className='text-xl'>Last Name</label>
            <input type="text" placeholder='Last Name' name='user_Lname' className='border-slate-800 border-2 p-2 w-full rounded-sm h-[59px]'/>
            <label htmlFor="user_name" className='text-xl'>E-Mail</label>
            <input type="email" placeholder='Your e-Mail' name='user_mail' required className='border-slate-800 border-2 p-2 w-full rounded-sm h-[59px]'/>
            <label htmlFor="user_name" className='text-xl'>Subject</label>
            <input type="text" placeholder='Subject' name='user_sub' required className='border-slate-800 border-2 p-2 w-full rounded-sm h-[59px]'/>
        </div>
        <div className='md:w-2/4 w-full px-1 h-96'>
            <label htmlFor="message" className='text-xl'>Leave Us a Message...</label>
            <textarea name="message" placeholder='Your Message Goes Here...' className='border-slate-800 border-2 p-2 w-full h-80 rounded-sm'></textarea>
        </div>
        </div>
        <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">SUBMIT</button>
      </form>
    </div>
    )
}

export default Contact