import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import SignUp from "./features/AccountManagement/SignUp";
import { theme } from "@chakra-ui/react";
import SignIn from "./features/AccountManagement/SignIn";
import TeamSummary from "./features/TeamSummary/TeamSummary";
import NavigationBar from "./shared/components/NavigationBar";
import { ProvideAuth, useAuth } from "./shared/utils/auth/UseAuth";

type PrivateRouteProps = {
  children: any;
  path: string;
};

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth?.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
};

function App() {
  return (
    <ProvideAuth>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact component={SignIn} path="/login" />
            <Route exact component={SignUp} path="/register" />
            <PrivateRoute path="/">
              <NavigationBar />
              <TeamSummary />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </ProvideAuth>
  );
}

export default App;
