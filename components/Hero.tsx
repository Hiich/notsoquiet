import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import config from '../modules/config'
import { SocialIcon } from 'react-social-icons'
import { WinterCheckout } from '@usewinter/checkout'
import { connect } from '../redux/blockchain/blockchainActions'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/redux/data/dataActions'

const Hero: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>NOT so quiet</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-row justify-center bg-[#23102C]">
          <div className="mt-96 w-full text-center">
            <Image
              src="/images/Logo.png"
              alt={'logo'}
              width="513"
              height="121"
            />
            <div className="font-['Caveat'] text-5xl text-white">
              <p>Leveraging web3</p> <p>to</p>
              <p>Alleviate period poverty</p>
              <p>Educate and Empower</p>
              <p>Build community</p>
            </div>
          </div>
          <div className="w-full">
            {/* <Image src="/images/Logo.png" alt={'logo'} width="513" height="121" /> */}
            <Image
              src="/images/Banner.png"
              alt={'banner'}
              width="1000"
              height="1000"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
