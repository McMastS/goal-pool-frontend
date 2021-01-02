import React, { FormEvent, useState } from 'react';
import {
   Flex,
   Box,
   Heading,
   FormControl, 
   FormLabel,
   Input,
   Button,
   CircularProgress,
   Link
  } from "@chakra-ui/react";
import ErrorMessage from '../../shared/components/ErrorMessage';
import { userLogin } from '../../shared/utils/auth/LoginApi';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const result = await userLogin(email, password);
            console.log(result);
            setIsLoading(false);
        } catch (error) {
            setError('Invalid username or password');
            setIsLoading(false);
            setEmail('');
            setPassword('');
        }
    }
    
    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box mt={8} p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading>Login</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        {error && <ErrorMessage message={error} />}
                        <FormControl>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <Input 
                                type="email" 
                                placeholder="email@domain.com" 
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                                isRequired={true} 
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input 
                                type="password" 
                                placeholder="brAednSux1" 
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                                isRequired={true} 
                            />
                        </FormControl>
                        <Button variantColor="teal" width="full" mt={4} type="submit">
                            {isLoading ? (
                                <CircularProgress isIndeterminate h="24px" w="24px" color="teal" />
                            ) : (
                                'Sign In' 
                            )}
                        </Button>
                        <Link color="teal.500" href="#">
                            Don't have an account? Sign up here.
                        </Link>
                    </form>
                </Box>
            </Box>
        </Flex>
    )
}

export default SignIn;
