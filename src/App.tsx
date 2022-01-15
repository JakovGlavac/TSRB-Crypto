import React, { useEffect } from "react";
import { useERC20Balances, useMoralis, useTokenPrice, useWeb3Transfer } from "react-moralis";
import Moralis from "moralis"
import { Box, Button, Center, chakra, HStack, Text, VStack, Image, Heading, Input, FormControl, FormLabel, FormHelperText, InputRightElement, InputGroup, Link, Spinner, IconButton } from "@chakra-ui/react";
import Flip from "./components/Flip";
import millisecondsToSeconds from 'date-fns/millisecondsToSeconds'
import { intervalToDuration, millisecondsToHours } from "date-fns";
import ReactGA from 'react-ga';
import useSWR from 'swr'
import { HiClipboard, HiClipboardCheck, HiClipboardCopy } from "react-icons/hi"
import useClipboard from "react-use-clipboard";

import axios from 'axios'

const fetcher = (url: string) => axios.get(url, {
  headers: {
    'X-API-Key': ""
  }
}).then(res => res.data)

// import { ExternalLinkIcon } from '@chakra-ui/icons'

function App() {
  const { data, error } = useSWR('https://deep-index.moralis.io/api/v2/erc20/0x55A633e3c25d678Ad3CEd12F5c5620E6B0236A4b/price?chain=bsc', fetcher, { refreshInterval: 2000 })
  console.log(data)
  const [isCopied, setCopied] = useClipboard("0x55A633e3c25d678Ad3CEd12F5c5620E6B0236A4b", { successDuration: 1000 });
  const { authenticate, isAuthenticated, user } = useMoralis();
  const getTimerData = () => intervalToDuration({
    start: 0, end:
      new Date("Jan 19, 2022 12:00:00").getTime() - new Date().getTime()
  });
  const [timerData, setSeconds] = React.useState(
    getTimerData()
  );
  // const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    // const windowUrl = window.location.search;
    // const params = new URLSearchParams(windowUrl);
    // console.log(params.get("ref"))
    ReactGA.initialize('G-XRYLEPB7K9', { debug: true, });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  const razlika = new Date("Jan 19, 2022 12:00:00").getTime() - new Date().getTime()
  useEffect(() => {
    if (razlika > 0) {
      setTimeout(() => setSeconds(getTimerData()), 1000);
    }

  });

  // useEffect(() =>{})
  // if number is singe digit add 0 before it
  const pad = (num: number | undefined) => {
    const size = 2
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  return <VStack w="full" h="100vh" color="white" textAlign="center" spacing="6">
    <Center flexDirection="column" fontSize="6xl" fontWeight="extrabold" lineHeight="normal" zIndex="2">
      <Text>Najepic Kriptovaluta na
        Ovoj Strani 16. Meridiana
      </Text>
    </Center>
    <Text color="gray.400">Pokažimo dominaciju i
      <chakra.span bgGradient='linear(to-r, #8A2387, orange.500)' fontWeight="bold"
        bgClip='text'> T$RB Power{" "}
      </chakra.span>
      ostalim školama,<br />
      i dokažimo da je Ruđer zaista najbolja škola (MIOC je za luzere) u Hrvatskoj.</Text>

    {/* <Text>{JSON.stringify(data)}</Text>
    <Text>{Number(data?.usdPrice).toFixed(10)}</Text> */}

    {razlika > 0 ?
      <>
        <Heading>Vrijeme do 🚀</Heading>
        <HStack
          w="full"
          justifyContent="center"
          color="gray.400"
          fontWeight="medium"
          fontSize={{ base: "2xl", md: "5xl" }}>
          <VStack>
            <Flip value={pad(timerData?.days)} />
            <Text fontSize="xl">Dana</Text>
          </VStack>
          <VStack>
            <Flip value={pad(timerData?.hours)} />
            <Text fontSize="xl">Sati</Text>
          </VStack>
          <VStack>
            <Flip value={pad(timerData?.minutes)} />
            <Text fontSize="xl">Minuta</Text>
          </VStack>
          <VStack>
            <Flip value={pad(timerData?.seconds)} />
            <Text fontSize="xl">Sekundi</Text>
          </VStack>
        </HStack>
      </>
      :
      <>
        <Heading>Cijena T$RB-a</Heading>
        <HStack w="full"
          justifyContent="center"
          color="gray.400"
          fontWeight="medium"
          fontSize={{ base: "2xl", md: "5xl" }}
        >
          {data?.usdPrice ? <Flip value={Array.from("$" + Number(data?.usdPrice).toFixed(10))} /> : <Spinner />}
        </HStack>
        <Heading>Market Cap</Heading>
        <HStack w="full"
          justifyContent="center"
          color="gray.400"
          fontWeight="medium"
          fontSize={{ base: "2xl", md: "5xl" }}
        >
          {data?.usdPrice ? <Flip value={Array.from("$" + Number(data?.usdPrice * 69160303).toFixed(2))} /> : <Spinner />}
        </HStack>
        <HStack flexDirection={{ base: "column", md: "row" }}>
          <Heading size="md" p="3" rounded="lg">Token Adresa</Heading>
          <Heading size="sm" bg="gray.900" p="3"
            rounded="md">0x55A633e3c25d678Ad3CEd12F5c5620E6B0236A4b</Heading>
          <IconButton aria-label='Copy to clipboard'
            icon={isCopied ? <HiClipboardCheck /> : <HiClipboardCopy />} onClick={setCopied} />
        </HStack>
        <HStack>
          <Button colorScheme="cyan" variant="ghost"
            onClick={() => window.open("https://pancakeswap.finance/swap?outputCurrency=0x55A633e3c25d678Ad3CEd12F5c5620E6B0236A4b&utm_source=http://thebittimes.com/token-T%2524RB-BSC-0x55A633e3c25d678Ad3CEd12F5c5620E6B0236A4b.html&utm_medium=web&utm_campaign=TheBitTimes.Com", "_blank")}>Swap na pancakeSwap</Button>
          <Button colorScheme="facebook" variant="ghost"
            onClick={() => window.open("https://docs.tsrb.shop", "_blank")}>Idi na Dokumentaciju</Button>
        </HStack>
      </>
    }

    <Box id="grad" minW="full" minH="20" position="absolute" top="-10" zIndex="-1" />

    {/* </Box> */}
    <Image
      // position={{ base: "absolute", md: "relative" }}
      zIndex="1"
      // opacity={{ base: "0.5", md: "1" }}
      blur="lg"
      id="goreDolje" pt="10" w="96" src="https://ucarecdn.com/f282825b-2366-4205-b4aa-da2b9527a6ff/-/preview/-/quality/smart/" />

  </VStack >


  // // return (
  // //   <div>
  // //     <h1>Welcome {user?.get("username")}</h1>
  // //     <div>
  // //       {error && <>{JSON.stringify(error)}</>}
  // //       <button onClick={() => fetchTokenPrice({
  // //         params: {
  // //           address: "0xecc5eE79f56D968b1Ba51Dde588C7693ec0AefC1", chain: "bsc"
  // //         }
  // //       })}>Refetch</button>
  // //       <pre>{JSON.stringify(formattedData)}</pre>
  // //     </div>
  // //     {/* <div>
  // //       {error && <>{JSON.stringify(error)}</>}
  // //       <button onClick={() => fetchERC20Balances()}>Refetch</button>
  // //       <pre>{JSON.stringify(data)}</pre>
  // //     </div> */}
  // //   </div>
  // // );
}
export default App
