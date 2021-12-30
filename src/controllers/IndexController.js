import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from '../utils/PlaylistMe.json'
import IndexView from '../views/IndexView'

const IndexController = () => {
  const contractAddress = "0x10A5F1f8D95BBCDe4DB7E01159F6133146676d19";
  const contractABI = abi.abi;

 const [currentAccount, setCurrentAccount] = useState("");
 const [allPlaylist, setAllPlaylist] = useState([]);
 const [totalPlaylist, setTotalPlaylist] = useState("");

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
  
  const listenToWalletConnectionStatus = () => {
    window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
        } else {
            setCurrentAccount("");
        }
      });
    }

  const loadAllPlaylist = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const playlistMeContract = new ethers.Contract(contractAddress, contractABI, signer);
          const playlists = await playlistMeContract.getPlaylists();
          const total = await playlistMeContract.getTotalPlaylists();
          
          setAllPlaylist(playlists);
          setTotalPlaylist(total.toString());
        } else {
          console.log("Ethereum object doesn't exist!")
        }
      } catch (error) {
        console.log(error);
      }
    }

    function getDate(timestamp) {
      var date = new Date(timestamp*1000);

      var day = date.getDate();

      var month = date.getMonth();

      var year = date.getFullYear();

      var formattedTime = day + "/" + month + "/" + year;
      return formattedTime;
    }

  useEffect(() => {
    checkIfWalletIsConnected();
    listenToWalletConnectionStatus();
    loadAllPlaylist();
  }, [])
    
  return (
        <IndexView>
            <btn-connect onClick={connectWallet}>
                { currentAccount !== "" ? currentAccount.substring(0, 10) + "..." : "Connect my wallet" }
            </btn-connect>
            <text-playlist-count>{totalPlaylist}</text-playlist-count>
              {
                allPlaylist.map((item, index) => {
                  return(
                    <item-container key={index}>
                      <text-item-desc>{item.description}</text-item-desc>
                      <text-item-sender>
                        <text-item-sender-name onClick={null}>{item.owner.substring(0, 10) + "..."}</text-item-sender-name>
                        <text-item-sender-date>
                          {
                            getDate(item.timestamp).toString()
                          }
                        </text-item-sender-date>
                      </text-item-sender>
                      <text-item-link onClick={() => {
                          window.open(item.link, "_blank");
                      }}> {item.link} </text-item-link>
                  </item-container>
                  )
                })
              }
        </IndexView>
    );
  }
  
export default IndexController
