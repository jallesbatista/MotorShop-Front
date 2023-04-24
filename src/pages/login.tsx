import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { NextApiRequest, NextApiResponse } from "next";

const user = {
    name: "Lucas",
    password: "123456"
}

const Login = (req: NextApiRequest, res: NextApiResponse) => {
    // const { name, password } = req.body

    // if(name != user.name || password != user.password) {
    //     return res.status(401).json({message: "invalid credentials"})
    // }

    return (
        <>
            <Header />
            <Flex w={"100vw"} h={"73vh"} bg={"grey.8"} align={"center"} justify={"center"}>
                <Flex w={{base:"320px", sm:"320px", md:"320x"}} marginTop={"10%"} marginLeft={"10px"} marginRight={"10px"} h={"450px"} bg={"white.1"}>
                    <FormControl padding={"30px"}>
                        <Text fontWeight="bold" fontSize="xl" marginBottom={"20px"}>Login</Text>
                        <FormLabel fontWeight="bold" textAlign="start">Email</FormLabel>
                        <Input type='email' marginBottom={"15px"}/>
                        <FormLabel fontWeight="bold" textAlign="start">Password</FormLabel>
                        <Input type="password" marginBottom={"10px"}/>
                        <Text textAlign="end" fontSize="13px" marginBottom={"20px"}>Forgot your password?</Text>
                        <Button width={"100%"} bg={"brand.1"} marginBottom={"15px"}>Login</Button>
                        <Text textAlign="center" fontSize="13px" marginBottom={"15px"}>Don't have an account yet?</Text>
                        <Button width={"100%"}>Register</Button>
                    </FormControl>
                </Flex>
            </Flex>
            <Footer />
        </>
    )
}

export default Login;