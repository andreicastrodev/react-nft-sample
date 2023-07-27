import {
  Box,
  Flex,
  Button,

} from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import { GiAbstract006 } from "react-icons/gi";
import UserForm from "./UserForm";
const UserDashboard = (props) => {

  return (
    <Flex mb="2rem" h="130vh">
      <Flex
        gap="1.5rem"
        padding={"2rem"}
        flexDirection={"column"}
        flexBasis="20%"
      >
        <Button leftIcon={<GiAbstract006 />}>My Collections</Button>
        <Button leftIcon={<BsStars />}>Mint</Button>
      </Flex>
      <Box padding={"2rem"} flexBasis="80%">
        <UserForm />
      </Box>
    </Flex>
    //     <>
    //     <button onClick={props.getUserInfo} className="card" style={props.styles.button}>
    //       Get User Info
    //     </button>
    //     <button onClick={props.getChainId} className="card" style={props.styles.button}>
    //       Get Chain ID
    //     </button>
    //     <button onClick={props.getAccounts} className="card" style={props.styles.button}>
    //       Get Accounts
    //     </button>
    //     <button onClick={props.getBalance} className="card" style={props.styles.button}>
    //       Get Balance
    //     </button>
    //     <button onClick={props.sendTransaction} className="card" style={props.styles.button}>
    //       Send Transaction
    //     </button>
    //     <button
    //       onClick={props.sendContractTransaction}
    //       className="card"
    //       style={props.styles.button}
    //     >
    //       Send Approve Transaction
    //     </button>
    //     <button onClick={props.logout} className="card" style={props.styles.button}>
    //       Logout
    //     </button>

    //     <div id="console" style={{ whiteSpace: "pre-line" }}>
    //       <p style={{ whiteSpace: "pre-line" }}></p>
    //     </div>

    //     <div className="row">
    //     <div className="col-md-9">
    //       <div style={{ marginTop: 20, textAlign: "left" }}>
    //         address: {props.address}
    //         <br />
    //         <br />
    //         chainId: {props.chainId}
    //         <br />
    //         <br />
    //         balance: {props.balance}
    //         <br />
    //         <br />
    //         user:{" "}
    //         <span style={{ fontSize: 12 }}>{JSON.stringify(props.userData)}</span>
    //       </div>
    //     </div>
    //   </div>

    //   </>
  );
};

export default UserDashboard;
