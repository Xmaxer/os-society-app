import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import theme from "./assets/theme/theme";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {ClientContext, GraphQLClient} from 'graphql-hooks'
import {StateProvider} from "./state/state";
import initialState from "./state/initialState";
import rootReducer from "./state/reducers/rootReducer";
import ErrorSnackbar from "./components/ErrorSnackbar";
import InformationSnackbar from "./components/InformationSnackbar";
import {API_OFFLINE_ERROR, CHANGE_PASSWORD_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "./assets/constants/routes";
import ApiDownPage from "./pages/ApiDownPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import {ThemeProvider} from '@material-ui/core/styles';

const client = new GraphQLClient({
    url: process.env.REACT_APP_API_SERVER_URL ? process.env.REACT_APP_API_SERVER_URL : 'http://localhost:3000/api'
});

export interface IUser {
    id: number
    username: string
    resetPassword: boolean
}

export interface IAppProps {
    state?: {
        user: IUser
    }
}

function App({state}: IAppProps) {
    return (
        <ClientContext.Provider value={client}>
            <StateProvider initialState={initialState} reducer={rootReducer}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <>
                            <Switch>
                                <Route path={HOME_ROUTE} component={HomePage} exact/>
                                <Route path={CHANGE_PASSWORD_ROUTE} component={ChangePasswordPage}
                                       exact {...state}/>
                                <Route path={LOGIN_ROUTE} component={LoginPage} exact/>
                                <Route path={API_OFFLINE_ERROR} component={ApiDownPage} exact/>
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
