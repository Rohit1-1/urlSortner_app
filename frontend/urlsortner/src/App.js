import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text ,useToast} from '@chakra-ui/react';
import { useState } from 'react';
import copy from "copy-to-clipboard";  
import axios from "axios"

function App() {
  const toast = useToast()
  const [isLoading,setLoading]=useState(false);
  const [isError,setErro]=useState(false);
  const [urlData,setUrelData]=useState({})
  const [sorturl,setSortUrl]=useState("")
  const [showUrl,setShowUrl]=useState(false)
  const copyToClipboard = () => {
    copy(sorturl);
    toast({
      title: 'Text copied to clipboard',
      status: 'success',
      duration: 2000,
      position:'top',
      isClosable: true,
    })
 }
  const postUrl=(data)=>{
    setLoading(true);
    return axios.post(`https://misty-rose-lizard.cyclic.app/`,data).then((res)=>{
    //  res.send({"sortUrl":true,"keyexist":false,urlId:newurl.sort_url})
      if(res.data.sortUrl){
        setLoading(false)
        console.log(res.urlId,res)
         setSortUrl(`https://misty-rose-lizard.cyclic.app/${res.data.urlId}`)
         setShowUrl(true)
        
      }
      else if(res.data.keyexist){
        setLoading(false)
        toast({
          title: 'Key Already exist',
          description: "Use different Key",
          status: 'error',
          duration: 9000,
          position:'top',
          isClosable: true,
        })
      }
     
    
    }).catch((err)=>{
         
    })
  }
 
  const handleChange=(e)=>{
     const {name,value}=e.target;
     setUrelData({
      ...urlData,
      [name]:value
     })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
   
      postUrl(urlData).then((res)=>{

      })
    
  }
  return (
    <Box>
      <Stack spacing={4} w={'50%'} margin='auto' marginTop={'1rem'} padding={'1.5rem'} >
    <Heading>Make Your Url Sort</Heading>
              <form onSubmit={handleSubmit}>
                  <FormControl id="url" isRequired marginBottom={'1rem'}>
                    <FormLabel>Url</FormLabel>
                    <Input type="url" name="url" onChange={handleChange} placeholder="Enter Url"/>
                  </FormControl>
                  <FormControl id="sort_url" marginBottom={'1rem'}>
                  <FormLabel>Key Name</FormLabel>
                    <Input type="text" name="sort_url" onChange={handleChange}  placeholder="Enter unique key name."/>
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
              {showUrl&&<Box margin={'auto'} width={'fit-content'} border={'1px solid black'} display={'flex'} alignItems={'center'} gap={2}><Text>{sorturl}</Text><Button  bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }} onClick={copyToClipboard}>Copy to Clipboard</Button></Box>}
    </Box>
  );
}

export default App;
