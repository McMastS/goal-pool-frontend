import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import SignUp from './features/AccountManagement/SignUp';
import { theme } from '@chakra-ui/react';
import SignIn from './features/AccountManagement/SignIn';
import TeamSummary from './features/TeamSummary/TeamSummary';
import NavigationBar from './shared/components/NavigationBar';

type NavRouteProps = {
  exact: boolean,
  path: string,
  component: any,
}

const NavRoute = ({exact, path , component: Component}: NavRouteProps) => (
  <Route exact={exact} path={path} render={(props) => (
    <div>
      <NavigationBar />
      <Component {...props} />
    </div>
  )}>

  </Route>
)


function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact component={SignIn} path="/login" />
          <Route exact component={SignUp} path="/register" />
          <NavRoute exact component={TeamSummary} path="/" />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
