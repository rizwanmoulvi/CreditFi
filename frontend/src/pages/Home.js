import React, { useEffect, useState } from "react";
// import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { networks } from "../utils/networks";

const CONTRACT_ADDRESS = '0x233e89f369ED02fe45C5a73984a674B47E3Ff260';

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [network, setNetwork] = useState("");
  // const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    const networkName = networks[chainId] || "Unknown Network";
    console.log(networkName);
    setNetwork(networkName);

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="w-full bg-darkGray text-center overflow-hidden">
      <header className="flex w-full bg-lightGray fixed justify-between p-[0.75rem] z-50">
        <div className="flex items-center text-left ml-10">
          <Link to="/">
            <p className="text-4xl font-bold text-peach cursor-pointer">
              CreditFi
            </p>
          </Link>
        </div>
        <div className="flex rounded-lg px-5 py-3 mr-10 mt-2 gap-4">
          <Link
            to="/marketplace"
            className="h-12 bg-beige text-textGreen font-bold rounded-lg px-8 py-3 animate-gradient-animation"
          >
            <p>Marketplace</p>
          </Link>
          <Link
            to={`/dashboard/${currentAccount}`}
            className="h-12 bg-beige text-textGreen font-bold rounded-lg px-8 py-3 animate-gradient-animation"
          >
            <p>Dashboard</p>
          </Link>
          <div className="flex flex-col items-center mx-auto max-w-lg">
            <button
              onClick={connectWallet}
              className="h-12 bg-beige text-textGreen font-bold rounded-lg px-8 py-2 animate-gradient-animation"
            >
              {currentAccount ? "Connected" : "Connect Wallet"}
            </button>
          </div>
          <div className="bg-beige text-textGreen font-bold flex p-3 rounded-lg">
            <img
              alt="Network logo"
              className="w-5 h-5 mr-2"
              src={network.includes("AIA") ? Logo : Logo}
            />
            {currentAccount ? (
              <p>
                Wallet: {currentAccount.slice(0, 6)}...
                {currentAccount.slice(-4)}
              </p>
            ) : (
              <p>Not connected</p>
            )}
          </div>
        </div>
      </header>
      <div>
      <div className="flex flex-row h-screen items-center justify-center mt-16 w-full">
  <div className="w-1/2 flex flex-col items-center justify-center">
    <p className="text-10xl font-bold text-peach">CreditFi</p>
  </div>
  <div className="w-1/2 flex flex-col items-center justify-center pt-16">
    <p className="text-peach text-4xl font-bold">A P2P Micro Lending And Borrowing Platform</p>
    <p className="text-peach text-4xl font-bold mt-5">With Closed Clearing Mechanism</p>
  </div>
</div>
      </div>
    </div>
  );
};

export default Home;
