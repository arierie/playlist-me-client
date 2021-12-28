import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from '../utils/PlaylistMe.json'
import PlaylistFormView from '../views/PlaylistFormView'

const PlaylistFormController = () => {
    const contractAddress = "0xf5542B250744173F5d7907974353d86DaCB34f4b";
    const contractABI = abi.abi;

    const [link, setLink] = useState("");
    const [desc, setDesc] = useState("");

    const sendPlaylist = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const playlistMeContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            let count = await playlistMeContract.getTotalPlaylists();
            console.log("Retrieved total shared playlist count...", count.toNumber());
            
            // const waveTxn = await playlistMeContract.sendPlaylist(link, desc);
            // console.log("Mining...", waveTxn.hash);
  
            // await waveTxn.wait();
            // console.log("Mined -- ", waveTxn.hash);
  
            // count = await playlistMeContract.getTotalPlaylists();
            // console.log("Retrieved total shared playlist count...", count.toNumber());
  
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      return (
        <PlaylistFormView>
            <tf-link onChange={event => setLink(event.target.value)} placeholder="https://.."/>
            <tf-desc onChange={event => setDesc(event.target.value)} placeholder="Eg: This playlist is cool"/>
            <btn-send onClick={sendPlaylist}/>
        </PlaylistFormView>
      );
}

export default PlaylistFormController;
