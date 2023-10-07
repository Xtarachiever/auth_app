"use client"
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

export default function Home() {
 const {data:session } = useSession();

 function handleSignOut(){
  signOut()
 }

  return (
    <div className={styles.container}>
      {session ? User({session, handleSignOut}) : Guest()}
    </div>
  )
}


// Guest
function Guest(){
  return(
    <main className="container mx-auto text-center py-20">
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>
      <div className='flex justify-center'>
          <Link href={'/login'}><span className='mt px-10 py-1 rounded-sm bg-indigo-500 text-gray'>Sign in</span></Link>
      </div>
    </main>
  )
}

// Authorized User
function User({ session, handleSignOut }){
  return(
    <main className="container mx-auto text-center py-20">
      <h3 className='text-4xl font-bold'>Authorized User Homepage</h3>

      <div className='details'>
        <h5>{session?.user.name}</h5>
        <h5>{session?.user.email}</h5>
      </div>

      <div className='flex justify-center'>
        <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50' onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className='flex justify-center'>
          <Link href={'/login'}><span className='mt px-10 py-1 rounded-sm bg-indigo-500 text-gray'>Profile Page</span></Link>
      </div>
    </main>
  )
}

// export async function getServerSideProps({req}){
//   const session = await getSession({req})

//   if(!session){
//     return{
//       redirect:{
//         destination:'/login',
//         permanent:false
//       }
//     }
//   }
//   return{
//     props:{ session }
//   }
// }