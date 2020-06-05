import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/styles';
import theme from "./assets/theme";
import GenericRoute from "./GenericRoute";
import LoginPage from "./pages/LoginPage";
import UnProtectedRoute from "./UnProtectedRoute";
import HomePage from "./pages/HomePage";
import {ClientContext, GraphQLClient} from 'graphql-hooks'
import {StateProvider} from "./state/state";
import initialState from "./state/initialState";
import rootReducer from "./state/reducers/rootReducer";
import ErrorSnackbar from "./components/ErrorSnackbar";
import InformationSnackbar from "./components/InformationSnackbar";
import {HOME_ROUTE, LOGIN_ROUTE} from "./assets/routes";

const client = new GraphQLClient({

    url: 'http://' + process.env.REACT_APP_SERVER_HOST_NAME + ":" + process.env.REACT_APP_SERVER_PORT + '/api'
});

function App() {
    return (
        <ClientContext.Provider value={client}>
            <StateProvider initialState={initialState} reducer={rootReducer}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <>
                            <Switch>
                                <GenericRoute path={HOME_ROUTE} component={HomePage} exact/>
                                <UnProtectedRoute path={LOGIN_ROUTE} component={LoginPage} exact/>
                            </Switch>
                            <ErrorSnackbar/>
                            <InformationSnackbar/>
                        </>
                    </BrowserRouter>
                </ThemeProvider>
            </StateProvider>
        </ClientContext.Provider>
    );
}

export default App;
