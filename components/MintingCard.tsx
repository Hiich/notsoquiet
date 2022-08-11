import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import config from '../modules/config'
import { SocialIcon } from 'react-social-icons'
import { WinterCheckout } from '@usewinter/checkout'
import { connect, setContract } from '../redux/blockchain/blockchainActions'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/redux/data/dataActions'
import { Container } from '@/components'
import toast, { Toaster } from 'react-hot-toast'

const MintingCard: NextPage = () => {
  const [showWinter, setShowWinter] = useState(false)
  const [showWinterWithDiscount, setShowWinterWithDiscount] = useState(false)
  const dispatch = useDispatch()
  const blockchain = useSelector((state: any) => state.blockchain)
  const data = useSelector((state: any) => state.data)
  const [discount, setDiscount] = useState('')
  const [amount, setAmount] = useState(1)
  const USE_WINTER_MINT_PATRON = 6824
  const USE_WINTER_MINT_PATRON_DISCOUNT = 6828
  const USE_WINTER_MINT_BENEFACTOR = 6826
  const USE_WINTER_MINT_BENEFACTOR_DISCOUNT = 6830
  const [useWinterProjectId, setUseWinterProjectId] = useState(
    USE_WINTER_MINT_BENEFACTOR
  )
  const BENEFACTOR = 1
  const PATRON = 2
  const nullProof = ['0x0000000000000000000000000000000000000000000000000000000000000000']
  const [proof, setProof] = useState(nullProof)
  const onConnectMetamask = async () => {
    // @ts-ignore
    dispatch(connect())
    console.log(blockchain.account)
  }

  useEffect(() => {
    console.log('Init smart contract ...')
    // @ts-ignore
    dispatch(setContract())
  }, [])

  const getProof = async () => {
    // let proof
    let response
    if (discount != '') {
      const resp = await fetch(`/api/discounts/${discount}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      response = await resp.json().catch((e) => console.log(e))
    }
    if (response != undefined)
      setProof(response.proof)

    return proof
  }

  const toggleWinter = async (benefatorOrPatron: number) => {
    blockchain.smartContract.options.address = config.SMART_CONTRACT

    await getProof()
    let projectId
    if (benefatorOrPatron == BENEFACTOR) {
      if (
        proof == nullProof
      )
        projectId = USE_WINTER_MINT_BENEFACTOR
      else projectId = USE_WINTER_MINT_BENEFACTOR_DISCOUNT
    } else {
      if (
        proof == nullProof)
        projectId = USE_WINTER_MINT_PATRON
      else projectId = USE_WINTER_MINT_PATRON_DISCOUNT
    }

    if (
      proof == nullProof && discount != ''
    )
      toast.error('Invalid coupon')
    else {
      let isUsed = await blockchain.smartContract.methods.couponNonce(discount).call()
      if (isUsed) toast.error('Coupon already used')
      else {
        setUseWinterProjectId(projectId)
        if (projectId == USE_WINTER_MINT_PATRON_DISCOUNT || projectId == USE_WINTER_MINT_BENEFACTOR_DISCOUNT)
          setShowWinterWithDiscount(true)
        else
          setShowWinter(true)
      }

    }
  }

  const publicMint = async (patronOrBenefactor: any) => {
    blockchain.smartContract.options.address = config.SMART_CONTRACT
    await getProof()

    if (
      proof == nullProof && discount != ''
    )
      toast.error('Invalid coupon')
    else {
      let isUsed = await blockchain.smartContract.methods.couponNonce(discount).call()
      if (isUsed) toast.error('Coupon already used')
      else {
        console.log(amount, patronOrBenefactor, discount, proof)
        let cost = await blockchain.smartContract.methods
          .getCost(amount, patronOrBenefactor, discount, proof)
          .call()

        let totalCostWei = String(cost)
        console.log('Cost: ', totalCostWei)
        toast.promise(
          blockchain.smartContract.methods
            .mint(amount, blockchain.account, patronOrBenefactor, discount, proof)
            .send({
              to: config.SMART_CONTRACT,
              from: blockchain.account,
              value: totalCostWei,
            }),
          {
            loading: 'Minting...',
            success: <b>Successfully minted.</b>,
            error: <b>Minting failed.</b>,
          }
        );
      }
      setDiscount('')
    }
  }

  return (
    <>
      {/* <Container> */}
      <div className="bg-[#23102C] pt-8">
        <div><Toaster /></div>

        <div
          className=" flex flex-col gap-y-6 text-center
      font-['Caveat'] text-white"
        >
          <h1 className="text-5xl">Benefactor</h1>
          <span className="text-2xl md:text-4xl">
            {data.benefactorSupply} / {config.MAX_SUPPLY_BENEFACTORS} minted
          </span>
          <div className="text-1xl font-sans">
            <p>
              Community Membership * Benefactor Role * Goddess Box Delivered
            </p>
            <p>* $60 to mint *</p>{' '}
            <p>Only $35 in USD or ETH when using a mint pass</p>
            <div className="mt-2">
              <label>Discount code : </label>
              <input
                type="text"
                onChange={(e) => setDiscount(e.target.value)}
                className="text-black"
              />
            </div>
            <button
              className="my-10 mx-auto hidden md:flex"
              onClick={() => toggleWinter(BENEFACTOR)}
            >
              <Image
                src={'/images/mintCard.png'}
                width="270"
                height="70"
                alt="Mint benefator"
              />
            </button>
            {blockchain.account != undefined && blockchain.account != null ? (
              <button
                className="my-10 mx-auto hidden md:flex"
                onClick={() => publicMint(BENEFACTOR)}
              >
                <Image
                  src={'/images/mintButton.png'}
                  width="270"
                  height="70"
                  alt="Mint benefator"
                />
              </button>
            ) : <button
              className="my-10 mx-auto hidden md:flex"
              onClick={() => onConnectMetamask()}
            >
              <Image
                src={'/images/connectButton.png'}
                width="270"
                height="70"
                alt="Mint benefator"
              />
            </button>}

            <div className="md:hidden">
              {blockchain.account != undefined && blockchain.account != null ? <button className="mt-10"
                onClick={() => publicMint(BENEFACTOR)}>
                <Image
                  src={'/images/mintButton.png'}
                  width="149"
                  height="40"
                  alt="Mint benefator"
                />
              </button> : <button
                className="my-10 mx-auto hidden md:flex"
                onClick={() => onConnectMetamask()}
              >
                <Image
                  src={'/images/connectButton.png'}
                  width="149"
                  height="40"
                  alt="Mint benefator"
                />
              </button>}
              <button
                className="md:hidden mt-10"
                onClick={() => toggleWinter(BENEFACTOR)}
              >
                <Image
                  src={'/images/mintCard.png'}
                  width="149"
                  height="40"
                  alt="Mint benefator"
                />
              </button>
            </div>
            <p>using credit card or ETH</p>
          </div>
          <Container>
            <div className="mx-auto hidden md:flex">
              <Image
                src="/images/Preview.png"
                alt="Preview"
                width="1362"
                height="318"
              />
            </div>
            <div className="mx-auto md:hidden">
              <Image
                src="/images/PreviewMobile.png"
                alt="Preview"
                width="350"
                height="230"
              />
            </div>
          </Container>
        </div>

        <div
          className="mb-20 flex flex-col gap-y-6  text-center
      font-['Caveat'] text-white md:my-10"
        >
          <h1 className="text-5xl">Patron</h1>
          <span className="text-2xl md:text-4xl">
            {data.patronSupply} / {config.MAX_SUPPLY_PATRONS} minted
          </span>
          <div className="text-1xl font-sans">
            <p>Community Membership * Patron Role in Community</p>
            <p>* $30 to mint *</p>{' '}
            <p>Only $35 in USD or ETH when using a mint pass</p>
            <div className="mt-2">
              <label>Discount code : </label>
              <input
                type="text"
                onChange={(e) => setDiscount(e.target.value)}
                className="text-black"
              />
            </div>
            <button
              className="my-10 mx-auto hidden md:flex"
              onClick={() => toggleWinter(PATRON)}
            >
              <Image
                src={'/images/mintCard.png'}
                width="270"
                height="70"
                alt="Mint benefator"
              />
            </button>
            {blockchain.account != undefined && blockchain.account != null ? (
              <button
                className="my-10 mx-auto hidden md:flex"
                onClick={() => publicMint(PATRON)}
              >
                <Image
                  src={'/images/mintButton.png'}
                  width="270"
                  height="70"
                  alt="Mint benefator"
                />
              </button>
            ) : <button
              className="my-10 mx-auto hidden md:flex"
              onClick={() => onConnectMetamask()}
            >
              <Image
                src={'/images/connectButton.png'}
                width="270"
                height="70"
                alt="Mint benefator"
              />
            </button>}

            <div className="md:hidden">
              {blockchain.account != undefined && blockchain.account != null ? <button className="mt-10" onClick={() => publicMint(PATRON)}>
                <Image
                  src={'/images/mintButton.png'}
                  width="149"
                  height="40"
                  alt="Mint benefator"
                />
              </button> : <button
                className="my-10 mx-auto hidden md:flex"
                onClick={() => onConnectMetamask()}
              >
                <Image
                  src={'/images/connectButton.png'}
                  width="149"
                  height="40"
                  alt="Mint benefator"
                />
              </button>}

              <button
                className="md:hidden mt-10"
                onClick={() => toggleWinter(PATRON)}
              >
                <Image
                  src={'/images/mintCard.png'}
                  width="149"
                  height="40"
                  alt="Mint benefator"
                />
              </button>
            </div>
            <p>using credit card or ETH</p>
          </div>
          <Container>
            <div className="mx-auto hidden md:flex">
              <Image
                src="/images/Preview2.png"
                alt="Preview"
                width="1362"
                height="318"
              />
            </div>
            <div className="mx-auto md:hidden">
              <Image
                src="/images/PreviewMobile2.png"
                alt="Preview"
                width="350"
                height="165"
              />
            </div>
          </Container>
        </div>
        <div className="bg-white">
          <p className="text-center text-black">copyright@Notsoquiet</p>
        </div>
      </div>
      <WinterCheckout
        projectId={useWinterProjectId}
        production={false}
        showModal={showWinter}
      // Extra mint params are params besides 'address, amount, proof'
      // The key needs to exactly match the name of the param provided to Winter
      // The value will be passed in as the param
      // extraMintParams={{ _coupon: discount, _proof: proof }}
      />

      {/* <WinterCheckout
        projectId={useWinterProjectId}
        production={false}
        showModal={showWinterWithDiscount}
        // Extra mint params are params besides 'address, amount, proof'
        // The key needs to exactly match the name of the param provided to Winter
        // The value will be passed in as the param
        extraMintParams={{ _coupon: discount, _proof: proof }}
      /> */}
      <WinterCheckout
        projectId={useWinterProjectId}
        showModal={showWinterWithDiscount}
        production={false}
        extraMintParams={{ _coupon: discount, _proof: proof }} />

      {/* </Container> */}
    </>
  )
}

export default MintingCard
