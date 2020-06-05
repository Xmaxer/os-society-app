import React, {useContext, useState} from 'react'
import {ClientContext, useMutation} from 'graphql-hooks'
import {useGlobalState} from "../state/state";
import {ADD_ERRORS} from "../state/actions";

function useAuthenticatedMutation({query}) {

    const [{}, dispatch] = useGlobalState();

    // Include the access token if one exists
    const client = useContext(ClientContext);
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        client.setHeader('Authorization', 'Bearer ' + access_token);
    }

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const [mutation] = useMutation(query);

    const handleMutation = (variables, handleComplete, handleSuccess, handleError) => {
        setLoading(true);
        mutation({variables: {...variables}}).then((response) => {
            if (!response.error) {
                setData(response.data);
                if (handleSuccess) handleSuccess(response.data);
            } else {
                dispatch({
                    type: ADD_ERRORS,
                    errors: response.error
                });
                setError(response.error);
                if (handleError) handleError();
            }
            setLoading(false);
            if (handleComplete) handleComplete()
        });
    };

    return {handleMutation, mutation, loading, error, data}
}

export default useAuthenticatedMutation
