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
import {API_OFFLINE_ERROR, CHANGE_PASSWORD_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "./assets/routes";
import ProtectedRoute from "./ProtectedRoute";
import ApiDownPage from "./pages/ApiDownPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

const client = new GraphQLClient({
    url: process.env.REACT_APP_API_SERVER_URL
});

function App(state) {
    return (
        <ClientContext.Provider value={client}>
            <StateProvider initialState={initialState} reducer={rootReducer}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <>
                            <Switch>
                                <ProtectedRoute path={HOME_ROUTE} component={HomePage} exact/>
                                <GenericRoute path={CHANGE_PASSWORD_ROUTE} component={ChangePasswordPage}
                                              exact {...state}/>
                                <UnProtectedRoute path={LOGIN_ROUTE} component={LoginPage} exact/>
                                <GenericRoute path={API_OFFLINE_ERROR} component={ApiDownPage} exact/>
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
