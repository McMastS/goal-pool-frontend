import React, { SyntheticEvent, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Link,
} from "@chakra-ui/react";
import ErrorMessage from "../../shared/components/ErrorMessage";
import { useAuth } from "../../shared/utils/auth/UseAuth";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);
    try {
      await auth?.signup(email, password);
    } catch (error) {
      setError("Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        mt={8}
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="wiener@wiener.com"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                isRequired={true}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="brAednSux1"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                isRequired={true}
              />
            </FormControl>
            <Button variantColor="teal" width="full" mt={4} type="submit">
              {isLoading ? (
                <CircularProgress
                  isIndeterminate
                  h="24px"
                  w="24px"
                  color="teal"
                />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Link color="teal.500" href="/login">
              Already have an account? Sign in here.
            </Link>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;
