import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import config from '../modules/config'
import { SocialIcon } from 'react-social-icons'
import { Hero, Container, MintingCard } from '@/components'

const Home: NextPage = () => {
  return (
    <>
      {/* <Container> */}
      <Hero />
      <MintingCard />
      {/* </Container> */}
    </>
  )
}

export default Home
