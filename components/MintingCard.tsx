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
import { Container } from '@/components'

const MintingCard: NextPage = () => {
  const [showWinter, setShowWinter] = useState(false)

  const toggleWinter = async () => {
    setShowWinter(true)
  }

  const dispatch = useDispatch()
  const blockchain = useSelector((state: any) => state.blockchain)
  const data = useSelector((state: any) => state.data)
  const [totalSupply, setSupply] = useState(data.totalSupply)

  const onConnectMetamask = () => {
    // @ts-ignore
    dispatch(connect())
  }

  const getTotalSupply = async () => {
    const supply = await blockchain.smartContract.methods.totalSupply().call()
    setSupply(totalSupply)
  }

  useEffect(() => {
    getTotalSupply
  })

  useEffect(() => {
    console.log('Connecting ...')
    onConnectMetamask()
  }, [])

  const publicMint = async () => {
    // console.log(blockchain.smartContract.options.)
    blockchain.smartContract.options.address = config.SMART_CONTRACT

    console.log(totalSupply)
    let cost = config.WEI_COST
    let totalCostWei = String(cost * 1)
    console.log('Cost: ', totalCostWei)
    console.log(data.totalSupply)
    await blockchain.smartContract.methods
      .mint(blockchain.account, 1)
      .send({
        to: config.SMART_CONTRACT,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once('error', (err: any) => {
        console.log(err)
      })
      .then((receipt: any) => {
        console.log(receipt)
      })
  }

  return (
    <>
      {/* <Container> */}
      <div className="bg-[#23102C]">
        <div
          className=" flex flex-col gap-y-6 text-center
      font-['Caveat'] text-white"
        >
          <h1 className="text-5xl">Benefactor</h1>
          <span className="text-5xl">
            {data.totalSupply} / {config.MAX_SUPPLY} remaining
          </span>
          <div className="text-1xl font-sans">
            <p>
              Community Membership * Benefactor Role * Goddess Box Delivered
            </p>
            <p>* $60 to mint *</p>{' '}
            <p>Only $35 in USD or ETH when using a mint pass</p>
            <button className="my-10">
              <Image
                src={'/images/mintButton.png'}
                width="270"
                height="70"
                alt="Mint benefator"
              />
            </button>
            <p>using credit card or ETH</p>
          </div>
          <Container>
            <Image
              src="/images/Preview.png"
              alt="Preview"
              width="1362"
              height="318"
            />
          </Container>
        </div>

        <div
          className=" my-10 mb-20 flex flex-col  gap-y-6
      text-center font-['Caveat'] text-white"
        >
          <h1 className="text-5xl">Patron</h1>
          <span className="text-5xl">
            {data.totalSupply} / {config.MAX_SUPPLY} remaining
          </span>
          <div className="text-1xl font-sans">
            <p>Community Membership * Patron Role in Community</p>
            <p>* $30 to mint *</p>{' '}
            <p>Only $35 in USD or ETH when using a mint pass</p>
            <button className="my-10">
              <Image
                src={'/images/mintButton.png'}
                width="270"
                height="70"
                alt="Mint benefator"
              />
            </button>
            <p>using credit card or ETH</p>
          </div>
          <Container>
            <Image
              src="/images/Preview2.png"
              alt="Preview"
              width="1362"
              height="318"
            />
          </Container>
        </div>
        <div className="bg-white">
          <p className="text-center text-black">copyright@Notsoquiet</p>
        </div>
      </div>
      {/* </Container> */}
    </>
  )
}

export default MintingCard
