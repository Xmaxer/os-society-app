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
import {API_OFFLINE_ERROR, HOME_ROUTE, LOGIN_ROUTE} from "./assets/routes";
import ProtectedRoute from "./ProtectedRoute";
import ApiDownPage from "./pages/ApiDownPage";

const client = new GraphQLClient({
    url: 'http://' + process.env.REACT_APP_SERVER_HOST_NAME + ":" + process.env.REACT_APP_SERVER_PORT + '/api',
    onError: ({operation, result}) => {
        console.log(result)
    }
});

function App() {
    return (
        <ClientContext.Provider value={client}>
            <StateProvider initialState={initialState} reducer={rootReducer}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <>
                            <Switch>
                                <ProtectedRoute path={HOME_ROUTE} component={HomePage} exact/>
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
