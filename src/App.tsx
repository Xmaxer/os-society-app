import React from 'react';
import theme from "./assets/theme/theme";
import {ClientContext, GraphQLClient} from 'graphql-hooks'
import {StateProvider} from "./state/state";
import initialState from "./state/initialState";
import rootReducer from "./state/reducers/rootReducer";
import {ThemeProvider} from '@material-ui/core/styles';
import AppRouter from "./AppRouter";

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
                    <AppRouter state={state}/>
                </ThemeProvider>
            </StateProvider>
        </ClientContext.Provider>
    );
}

export default App;
