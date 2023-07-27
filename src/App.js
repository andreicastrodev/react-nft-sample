import { useEffect, useState } from "react";
// import { Web3Auth } from "@web3auth/modal";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";
import LandingPage from "./components/home/LandingPage";
import UserDashboard from "./components/user/UserDashboard";
import NavBar from "./components/ui/NavBar";
import Testimonials from "./components/ui/Testimonials";
const clientId =
  "BDrqTk0B213bGyM0mUeMaTz8mvbuW9bMsGhes4D94y5u3DFZ8Rpy33vcfSCx75f44SeqZQ1awmnZ4b8JXAhbKLM"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [userData, setUserData] = useState({});

  let styles = {
    button: {
      width: "100%",
      maxWidth: 200,
      cursor: "pointer",
      background: "#8347E5",
      border: "1px solid #8347E5",
      boxSizing: "border-box",
      borderRadius: "15px",
      fontSize: 16,
      color: "#000000",
      fontWeight: 700,
      padding: "12px 30px 12px 30px",
      marginTop: 15,
      display: "flex",
      justifyContent: "center",
    },
  };
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x250",
            rpcTarget: "https://evm.astar.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
            displayName: "Aster EVM",
            blockExplorer: "https://astar.subscan.io/",
            ticker: "ASTR",
            tickerName: "ASTAR",
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };
  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.logout();
    setProvider(web3authProvider);
    setBalance("");
    setAddress("");
    setUserData({});
    setChainId("");
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
    console.log(user);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
    setChainId(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };
  const sendContractTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendContractTransaction();
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
  };

  return (
    <div>
      <NavBar logout={logout}/>
      {!provider ? (
        <LandingPage login={login} />
      ) : (
        <UserDashboard
          getUserInfo={getUserInfo}
          getChainId={getChainId}
          getAccounts={getAccounts}
          getBalance={getBalance}
          sendTransaction={sendTransaction}
          sendContractTransaction={sendContractTransaction}
          getPrivateKey={getPrivateKey}
          logout={logout}
          styles={styles}
          address={address}
          chainId={chainId}
          balance={balance}
          userData={userData}
        />
      )}
    </div>
  );
}

export default App;
