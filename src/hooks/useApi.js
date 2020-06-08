import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {ClientContext, useManualQuery, useMutation} from 'graphql-hooks'
import {useGlobalState} from "../state/state";
import {ADD_ERRORS} from "../state/actions";
import {API_OFFLINE_ERROR} from "../assets/routes";
import {MUTATION_OPERATION} from "../assets/operations";

function useApi({query}) {

    const [{}, dispatch] = useGlobalState();
    const history = useHistory();

    // Include the access token if one exists
    const client = useContext(ClientContext);
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        client.setHeader('Authorization', 'Bearer ' + access_token);
    }

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [mutationCall] = useMutation(query.query);
    const [queryCall] = useManualQuery(query.query);
    const call = query.type === MUTATION_OPERATION ? mutationCall : queryCall;

    const handleCall = ({variables = {}, handleComplete, handleSuccess, handleError} = {}) => {
        setLoading(true);
        call(variables ? {variables: {...variables}} : {}).then((response) => {
            if (!response.error) {
                setData(response.data);
                if (handleSuccess) handleSuccess(response.data);
            } else {
                if (response.error && response.error.fetchError && response.error.fetchError.message === "Failed to fetch") {
                    history.push(API_OFFLINE_ERROR);
                    return;
                } else {
                    dispatch({
                        type: ADD_ERRORS,
                        errors: response.error
                    });
                    setError(response.error);
                    if (handleError) handleError();
                }
            }
            setLoading(false);
            if (handleComplete) handleComplete()
        });
    };

    return {handleCall, call, loading, error, data}
}

export default useApi
