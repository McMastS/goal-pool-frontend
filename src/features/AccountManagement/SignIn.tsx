import React, { FormEvent, useState } from "react";
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
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../../shared/utils/auth/UseAuth";

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation<LocationState>();

  const auth = useAuth();

  const { from } = location.state || { from: { pathname: "/" }};

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      auth?.signin(email, password);
      console.log(auth?.user);
      history.replace(from);
    } catch (error) {
      setError("Invalid username or password");
      console.log(error);
      setIsLoading(false);
    }
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
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="email@domain.com"
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
            <Button
              bg="teal.500"
              color="white"
              width="full"
              mt={4}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress isIndeterminate color="teal" />
              ) : (
                "Sign In"
              )}
            </Button>
            <Link color="teal.500" href="/register">
              Don't have an account? Sign up here.
            </Link>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignIn;
