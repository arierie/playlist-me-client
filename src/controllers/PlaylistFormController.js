import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from '../utils/PlaylistMe.json'
import PlaylistFormView from '../views/PlaylistFormView'

const PlaylistFormController = () => {
    const contractAddress = "0xf5542B250744173F5d7907974353d86DaCB34f4b";
    const contractABI = abi.abi;

    const [link, setLink] = useState("");
    const [desc, setDesc] = useState("");
    const [hashMined, setHashMined] = useState("");
    const [etherLink, setEtherLink] = useState("");
    const [error, setError] = useState("");
    const [isInputFormVisible, setInputFormVisible] = useState("block");
    const [isSuccessFormVisible, setSuccessFormVisible] = useState("none");
    const [isErrorFormVisible, setErrorFormVisible] = useState("none");

    const sendPlaylist = async () => {
        if(link == null || link == "") {
            setErrorFormVisible("block");
            setError("Please input link as it is required!");
            return;
        }

        if(desc == null || desc == "") {
            setErrorFormVisible("block");
            setError("Please input description as it is required!");
            return;
        }

        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const playlistMeContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            // let count = await playlistMeContract.getTotalPlaylists();
            // console.log("Retrieved total shared playlist count...", count.toNumber());
            
            // const waveTxn = await playlistMeContract.sendPlaylist(link, desc);
            // console.log("Mining...", waveTxn.hash);
  
            // await waveTxn.wait();
            // console.log("Mined -- ", waveTxn.hash);
  
            // count = await playlistMeContract.getTotalPlaylists();
            // console.log("Retrieved total shared playlist count...", count.toNumber());
            // setEtherLink("https://rinkeby.etherscan.io/tx/" + waveTxn.hash);
            // const minedHash = waveTxn.hash + "".substring(0, 10) + "...";
            // setHashMined(minedHash);
            
            setInputFormVisible("none");
            setErrorFormVisible("none");
            setSuccessFormVisible("block");
          } else {
              setErrorFormVisible("block");
              console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
            setErrorFormVisible("block");
            console.log("Transaction error: " + error)
        }
      }
    
      return (
        <PlaylistFormView>
            <form-input style={{display: isInputFormVisible}}>
                <tf-link onChange={event => setLink(event.target.value) } placeholder="https://.."/>
                <tf-desc onChange={event => setDesc(event.target.value) } placeholder="Eg: This playlist is cool"/>
                <btn-send onClick={sendPlaylist}/>
            </form-input>
            <form-success style={{display: isSuccessFormVisible}}>
                <btn-hash>{etherLink}</btn-hash>
                <btn-dismiss onClick={() => {
                    setSuccessFormVisible("none");
                    setInputFormVisible("block");
                }}/>
            </form-success>
            <form-error style={{display: isErrorFormVisible}}>
                <text-error>{error}</text-error>
            </form-error>
        </PlaylistFormView>
      );
}

export default PlaylistFormController;
