import React, { useEffect, useState } from "react";
import IndexView from '../views/IndexView'

const IndexController = () => {

 const [currentAccount, setCurrentAccount] = useState("");
 const [btnConnectText, setBtnConnectText] = useState("");

 const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }

    } catch (error) {
      console.log(error);
    }

  }
  
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const disconnectWallet = async() => {
      // TODO implement disconnect
      //   await web3Modal.clearCachedProvider();
      //   setCurrentAccount("");
  }
  
  const listenToWalletConnectionStatus = () => {
    window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
            setBtnConnectText("Connected");
        } else {
            setCurrentAccount("");
            setBtnConnectText("Connect my wallet");
        }
      });
    }
    
    const onMouseEnter = () => {
        if(currentAccount != "") {
            setBtnConnectText("Disconnect");
        }
    }
    
    const onMouseLeave = () => {
        if(currentAccount != "") {
            setBtnConnectText("Connected");
        }
    }

    const handleCta = () => {
        if (currentAccount != "") {
            // TODO implement disconnect
        } else {
            connectWallet();
        }
    }
  
  useEffect(() => {
    checkIfWalletIsConnected();
    listenToWalletConnectionStatus();
  }, [])
    
  return (
        <IndexView>
            <btn-connect onClick={handleCta} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                {btnConnectText}
            </btn-connect>
        </IndexView>
    );
  }
  
export default IndexController
