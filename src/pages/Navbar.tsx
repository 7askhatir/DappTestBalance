import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useContractFunction, useEtherBalance,useTokenBalance, useEthers, useLookupAddress } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'

import { AccountButton } from '../components/account/AccountButton'
import { useState } from 'react'
import { useEffect } from 'react'
import { Contract, utils } from 'ethers'

import styled from 'styled-components'
import WethAbi from '../abi/Weth10.json'
const wethInterface = new utils.Interface(WethAbi)
const wethContractAddress = '0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e'
const contract = new Contract(wethContractAddress, wethInterface)
export function Navbar() {
    
  const { account,chainId , deactivate, activateBrowserWallet } = useEthers()
  const ens = useLookupAddress()
  const [showModal, setShowModal] = useState(false)

  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
  const userBalance = useEtherBalance(account)
  const { state, send } = useContractFunction(contract, 'deposit')
  const withdrawEther = (wethAmount: string) => {
    send(utils.parseEther(wethAmount))
  }
   function TokenBalance() {
    const { account, activateBrowserWallet } = useEthers()
    const daiBalance = useTokenBalance(wethContractAddress, wethContractAddress)
    return (daiBalance?._hex);
    
  }
  const SalaryBalance = TokenBalance()
  
  
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
  }
  return (
    
    <header className="topbar-nav">
                
				<nav className="navbar navbar-expand fixed-top">

					<ul className="navbar-nav mr-auto align-items-center">
						<li className="nav-item">
							<a className="nav-link toggle-menu" href="javascript:void();">
								<i className="icon-menu menu-icon"></i>
							</a>
						</li>
						

					</ul>
          <button onClick={activate}>Click Here</button>


             <br/>
              <ContentRow>
                <Label>Salary balance:</Label> <TextInline>{ parseInt(SalaryBalance,16)}</TextInline> <Label>ETH</Label>
              </ContentRow>



					<div className="input-group">

						<div className="right-nav-link ml-auto input-group-append">

							<a className="nav-link dropdown-toggle-nocaret position-relative" href="https://pancakeswap.finance/swap?outputCurrency=0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">
								<button className="btn btn-white " type="button">BUY $SLR 
								</button></a>


							{/* <button  className={true ? 'btn  btn-success btn-connect' : 'btn  btn-dark btn-connect'} type="button">{1 ? 1.substring(0, 6) + '...' + address_local.substring(36, 42) : 'Connect wallet'}
							</button> */}



						




						</div>
					</div>






					<ul className="navbar-nav align-items-center right-nav-link">

					

					</ul>


				</nav>
			</header>
    // <Account>
    //   <ErrorWrapper>{activateError}</ErrorWrapper>
    //   {showModal && <AccountModal setShowModal={setShowModal} />}
    //   {account ? (
    //     <>
    //       <AccountLabel onClick={() => setShowModal(!showModal)}>{ens ?? shortenAddress(account)}</AccountLabel>
    //       <LoginButton onClick={() => deactivate()}>Disconnect</LoginButton>
    //     </>
    //   ) : (
    //     <LoginButton onClick={activate}>Connect</LoginButton>
    //   )}
    // </Account>
  )

}
