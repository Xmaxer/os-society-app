import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        '& > *': {
            color: theme.palette.secondary.main,
            marginLeft: 20
        }
    },
    background: {
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        width: '100%'
    }
}));

function ApiDownPage() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <img src={"/svgs/sad_face.svg"} alt={"Sad face"}/>
            <Typography variant={'h3'}>API is offline</Typography>
        </div>
    );
}

export default ApiDownPage;
