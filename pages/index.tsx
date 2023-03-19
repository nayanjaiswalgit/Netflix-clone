import React from 'react'
import {getSession } from "next-auth/react"
import { NextPageContext } from 'next'
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';

export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context);

    if(!session){
        return {
            redirect: {
                destination: '/auth',
                permanent : false,
            }
        }
    }
    return {
        props : {}
    }
}


const Home = () => {
  return (
   <>
   <Navbar/>
   <Billboard/>
   </>
  )
}

export default Home