import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Loader,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "../ui/toaster";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = async () => {
        setLoading(true)
        if (!email || !password) {
            toast('Please fill out all fields', 'warning');
            setLoading(false)
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast('User Logged In Successfully', "success")
            dispatch(setUser({ email }));
            navigate('/')
        } catch (error) {
            toast(error.message, "error")
        }
        setLoading(false)
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.50" ml={5} mr={5}>
            <Box bg="white" p={8} rounded="lg" shadow="md" width="100%" maxW="400px">
                <Heading mb={3} textAlign="center">
                    LOGIN
                </Heading>
                <VStack spacing={4}>
                    <Box w="100%">
                        <Text mb={1}>Email</Text>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box w="100%">
                        <Text mb={1}>Password</Text>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Button colorPalette="blue" width="100%" mt={3} fontWeight={600} onClick={handleLogin}>
                        {loading ? <Loader /> : 'LOGIN'}
                    </Button>
                    <Text alignSelf={"flex-end"} textStyle="sm">Don't have an account? <Link to="/signup">Sign up</Link></Text>
                </VStack>
            </Box>
        </Flex>
    );
};

export default Login;
