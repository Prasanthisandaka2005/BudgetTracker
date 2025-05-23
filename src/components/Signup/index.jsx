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
import { toast } from "../ui/toaster";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase'

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleSignup = async () => {
        setLoading(true);
        if (!email || !password) {
            toast('Please fill out all fields', 'warning');
            setLoading(false);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast('Please enter a valid email address', 'warning');
            setLoading(false);
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            await updateProfile(user, {
                displayName: username,
            });
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    username,
                });
            }
            await signOut(auth);
            toast('Account created successfully', 'success');
            navigate('/login');
        } catch (error) {
            toast(error.message || "Signup Failed", 'success');
        };
        setLoading(false);
    }

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.50" ml={3} mr={3}>
            <Box bg="white" p={8} rounded="lg" shadow="md" width="100%" maxW="400px">
                <Heading mb={6} textAlign="center">
                    Hey👋 Sign Up
                </Heading>
                <VStack spacing={4}>
                    <Box w="100%">
                        <Text mb={1}>Username</Text>
                        <Input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Box>
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
                    <Button colorPalette="blue" width="100%" mt={2} fontWeight={600} onClick={handleSignup}>
                        {loading ? <Loader /> : 'Register'}
                    </Button>
                    <Text alignSelf={"flex-end"} textStyle="sm">Already have an account? <Link to="/login">Login</Link></Text>
                </VStack>
            </Box>
        </Flex>
    );
};

export default Signup;
