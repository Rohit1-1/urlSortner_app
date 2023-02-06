import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import copy from "copy-to-clipboard";
import axios from "axios";

function App() {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [isError, setErro] = useState(false);
  const [urlData, setUrlData] = useState({});
  const [sorturl, setSortUrl] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const copyToClipboard = () => {
    copy(sorturl);
    toast({
      title: "Text copied to clipboard",
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  };
  const postUrl = (data) => {
    setLoading(true);
    return axios
      .post(`https://misty-rose-lizard.cyclic.app/`, data)
      .then((res) => {
        //  res.send({"sortUrl":true,"keyexist":false,urlId:newurl.sort_url})
        setUrlData({
          url: "",
          sort_url: "",
        });
        if (res.data.sortUrl) {
          setLoading(false);
          console.log(res.urlId, res);

          setSortUrl(`https://misty-rose-lizard.cyclic.app/${res.data.urlId}`);
          setShowUrl(true);
        } else if (res.data.keyexist) {
          setLoading(false);
          toast({
            title: "Key Already exist",
            description: "Use different Key",
            status: "error",
            duration: 9000,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((err) => {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrlData({
      ...urlData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    postUrl(urlData).then((res) => {});
  };
  return (
    <Box>
      <Stack
        spacing={4}
        w={{ base: "90%", md: "80%", lg: "50%" }}
        margin="auto"
        marginTop={"1rem"}
        padding={"1.5rem"}
      >
        <Heading>Make Your Url Sort</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="url" isRequired marginBottom={"1rem"}>
            <FormLabel>Url</FormLabel>
            <Input
              type="url"
              name="url"
              value={urlData.url}
              onChange={handleChange}
              placeholder="Enter Url"
            />
          </FormControl>
          <FormControl id="sort_url" marginBottom={"1rem"}>
            <FormLabel>Key Name</FormLabel>
            <Input
              type="text"
              name="sort_url"
              value={urlData.sort_url}
              onChange={handleChange}
              placeholder="Enter unique key name."
            />
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              isLoading={isLoading}
            >
              Get Sort Url
            </Button>
          </Stack>
        </form>
      </Stack>
      {showUrl && (
        <Box
          borderRadius={"10px"}
          padding={"10px"}
          boxSizing="border-box"
          background={`radial-gradient(circle at 100% 100%, #ffffff 0, #ffffff 6px, transparent 6px) 0% 0%/9px 9px no-repeat,
            radial-gradient(circle at 0 100%, #ffffff 0, #ffffff 6px, transparent 6px) 100% 0%/9px 9px no-repeat,
            radial-gradient(circle at 100% 0, #ffffff 0, #ffffff 6px, transparent 6px) 0% 100%/9px 9px no-repeat,
            radial-gradient(circle at 0 0, #ffffff 0, #ffffff 6px, transparent 6px) 100% 100%/9px 9px no-repeat,
            linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 6px) calc(100% - 18px) no-repeat,
            linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 18px) calc(100% - 6px) no-repeat,
            radial-gradient(at 28% 37%, transparent 0%, rgba(253,26,52,0.57) 18.235%, rgba(227,118,12,0.34) 74.823%, rgba(172,3,232,0.76) 100%) 39% 80%/158% 170%,
            radial-gradient(at 92% 67%, #f911f3 0%, #ed0357 30.633%, #d319b6 68.671%, #f19125 72.04%, #edad20 100%) 35% 86%/138% 102%`}
          margin={"auto"}
          width={{ base: "95%", md: "50%", lg: "48%" }}
          border={"1px solid transparent"}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Box width={"70%"} display={'flex'} justifyContent={'center'}>
            <Link
            width={"fit-content"}
             href={sorturl}
             textAlign={'center'}
              fontSize={{ base: "10px", md: "16px", lg: "16px" }}
             color={'blue'}
            >
              {sorturl}
            </Link>
          </Box>
          <Button
            bg={"blue.400"}
            color={"white"}
            padding={"8px"}
            fontSize={{ base: "8px", md: "16px", lg: "16px" }}
            _hover={{
              bg: "blue.500",
            }}
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default App;
