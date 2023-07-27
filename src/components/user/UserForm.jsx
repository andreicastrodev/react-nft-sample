import {
  Container,
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Image,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsStars, BsFillTrashFill } from "react-icons/bs";
import { GiAbstract006 } from "react-icons/gi";

const UserForm = () => {
  const [imgFile, setImg] = useState("");
  //refs
  const creatorRef = useRef("");
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const licenseRef = useRef("");
  const royaltyPercentageRef = useRef("");
  const blockchainChargeRef = useRef("");
  const imageRef = useRef("");

  const initialMetadata = {
    format: 'CHIP-0007',
    minting_tool: 'mintgarden-studio',
    sensitive_content: false,
    name: '',
    description: '',
    attributes: [],
  };

  const metadata = JSON.parse(JSON.stringify(initialMetadata));


  const submitHandler = (e) => {
    e.preventDefault();
    const creatorValue = creatorRef.current.value;
    const nameRefValue = nameRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    const licenseValue = licenseRef.current.value;
    const royaltyPercentageValue = royaltyPercentageRef.current.value;
    const blockchainChargeValue = blockchainChargeRef.current.value;
    const imageValue = imageRef.current.value;

    const data ={
        creatorValue,
        nameRefValue,
        descriptionValue,
        licenseValue,
        royaltyPercentageValue,
        blockchainChargeValue,
        imageValue
    }

    console.log(data);

  };

  const handleImage = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const removeImage = () => {
    setImg("");
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl  gap="2rem" display={"flex"}>
        <Flex gap="1.5rem" flexBasis={"50%"} flexDirection={"column"}>
          <Box>
            <FormLabel>Creator</FormLabel>
            <Input ref={creatorRef} placeholder="creator" />
          </Box>
          <Box>
            <FormLabel>Collection</FormLabel>
            <Select placeholder="collection" />
          </Box>
          <Box>
            <FormLabel>Name</FormLabel>
            <Input ref={nameRef} placeholder="name" />
          </Box>
          <Box>
            <FormLabel>Description</FormLabel>
            <Textarea ref={descriptionRef} placeholder="description" />
          </Box>
          <Flex gap={"1rem"} flexDirection={"column"}>
            <Box>
              <FormLabel>License</FormLabel>
              <InputGroup>
                <InputLeftAddon children="URL" />
                <Input ref={licenseRef} type="url" />
              </InputGroup>
              <InputGroup mt="1rem">
                <InputLeftAddon children="Hash" />
                <Input
                  disabled
                  type="text"
                  placeholder="will automatically be calculated"
                />
              </InputGroup>
            </Box>
          </Flex>
          <Box>
            <FormLabel>Royalty Percentage</FormLabel>
            <InputGroup mt="1rem">
              <InputLeftAddon children="%" />
              <Input ref={royaltyPercentageRef} type="number" />
            </InputGroup>
          </Box>
          <Box>
            <FormLabel>Blockchain Charge</FormLabel>
            <Input ref={blockchainChargeRef} type="number" />
          </Box>
        </Flex>
        <Flex gap={"1rem"} flexDirection={"column"} flexBasis={"50%"}>
          <FormLabel>Image</FormLabel>
          <Box>
            <Input
              ref={imageRef}
              onChange={handleImage}
              border={"none"}
              type="file"
            />
          </Box>
          <Box height={"60vh"} border={"1px solid black"}>
            <Image h="100%" w="100%" src={imgFile} />
          </Box>
          {imgFile.length > 1 ? (
            <Button onClick={removeImage} leftIcon={<BsFillTrashFill />}>
              Remove
            </Button>
          ) : (
            ""
          )}
          <Box mt="7rem">
            <Button type="submit" w="100%">
              Mint
            </Button>
          </Box>
        </Flex>
      </FormControl>
    </form>
  );
};

export default UserForm;
