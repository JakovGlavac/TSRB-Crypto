import { Box, Button, HStack, Image, Spinner, Text } from "@chakra-ui/react";
import { useERC20Balances, useMoralis } from "react-moralis";
const Navbar = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    const { fetchERC20Balances, data, isLoading, isFetching, error } = useERC20Balances();
    console.log("navvr", data, data?.filter(el => el.token_address === "0x55a633e3c25d678ad3ced12f5c5620e6b0236a4b"))
    return (
        <HStack w="full" color="white" justifyContent="space-between" p="5">
            <HStack fontWeight="bold">
                <Image w="7"
                    src="https://ucarecdn.com/378b87f2-9989-47d2-8076-fa7284e58aa1/-/preview/-/quality/smart/" />
                <Text>T$RB Coin</Text>

            </HStack>

            {!isAuthenticated ?
                <Button onClick={() => authenticate()}>Poveži wallet</Button> :
                <HStack fontWeight="bold">
                    <Text>Stanje Računa: {isLoading || isFetching ?
                        <Spinner size='xs' /> :
                        Number(data?.filter(el => el.token_address.toLowerCase() === "0x55a633e3c25d678ad3ced12f5c5620e6b0236a4b")[0].balance) * 10e-18 || 0}</Text>
                    <Image w="5"
                        src="https://ucarecdn.com/378b87f2-9989-47d2-8076-fa7284e58aa1/-/preview/-/quality/smart/" />
                </HStack>
            }

        </HStack>
    );
}

export default Navbar;