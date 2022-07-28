import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import abiJSON from "@/public/config/abi.json";
import Gen1ABI from "@/public/config/gen1abi.json";
import configJSON from "@/public/config/config";
import { ethers, Signer } from "ethers";	
// log
import store from "../store";
const { account, library, deactivate } = useEthers;
import {
  useContractFunction,
  useContractCalls,
  useEthers,
} from "@usedapp/core";
const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

async function Gen1Balance() {
    console.log('Fetching Gen 1 Balance...');
     const Gen1Bal = await stakingContract.functions.getNFTBalance(1, account);
     console.log(`DinoPunks: ${Gen1Bal}`);
   };

const contractConfig = {
    abi: (abiJSON),
    address: configJSON.CONTRACT_ADDRESS,
  };

  const Gen1Config = {
    abi: (Gen1ABI),
    address: configJSON.GEN1_ADDRESS,
  };

 // STAKING CONTRACT
 const stakingContract = (() => {
    const signer = library?.getSigner?.(account ?? "")?.connectUnchecked?.();
    const contract = Contract(
      configJSON.CONTRACT_ADDRESS,
      contractConfig.abi,
      signer
    );
    return contract;
  }, [library, account]);
    // STAKING CONTRACT


   // GEN1 CONTRACT
   const gen1Contract = (() => {
    const signer = library?.getSigner?.(account ?? "")?.connectUnchecked?.();
    const contract = Contract(
      configJSON.GEN1_ADDRESS,
      Gen1Config.abi,
      signer
    );
    return contract;
  }, [library, account]);
     // GEN1 CONTRACT

     export const fetchInfo = () => {
        return async (dispatch) => {
          dispatch(fetchDataRequest());
          try {
            let totalSupply = await store
            .getState()
            stakingContract.functions.totalSupply();
            console.log(`DinoPunks: ${totalSupply}`);

            

          } catch (err) {
            console.log(err);
            dispatch(fetchDataFailed("Could not load data from contract."));
          }
        };
      };
      