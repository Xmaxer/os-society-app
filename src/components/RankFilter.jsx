import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import StyledCheckBoxWithLabel from "../assets/styledComponents";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    label: {
        color: theme.palette.secondary.light
    },
    checkboxContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        '& > *': {
            marginRight: 10
        }
    }
}));

function RankFilter(props) {
    const classes = useStyles();
    const {handler} = props;

    const [checked, setChecked] = useState({
        unranked: true,
        friend: true,
        recruit: true,
        corporal: true,
        sergeant: true,
        lieutenant: true,
        captain: true,
        general: true,
        owner: true
    });

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked});
    };

    useEffect(() => {
        handler(checked);
    }, [checked]);

    return (
        <div className={classes.container}>
            <Typography className={classes.label}>Rank Filter</Typography>
            <div className={classes.checkboxContainer}>
                <StyledCheckBoxWithLabel name={'unranked'} checkedHandler={handleChange} checked={checked.unranked}
                                         label={'Unranked'}/>
                <StyledCheckBoxWithLabel name={'friend'} checkedHandler={handleChange} checked={checked.friend}
                                         label={'Friend'}/>
                <StyledCheckBoxWithLabel name={'recruit'} checkedHandler={handleChange} checked={checked.recruit}
                                         label={'Recruit'}/>
                <StyledCheckBoxWithLabel name={'corporal'} checkedHandler={handleChange} checked={checked.corporal}
                                         label={'Corporal'}/>
                <StyledCheckBoxWithLabel name={'sergeant'} checkedHandler={handleChange} checked={checked.sergeant}
                                         label={'Sergeant'}/>
                <StyledCheckBoxWithLabel name={'lieutenant'} checkedHandler={handleChange} checked={checked.lieutenant}
                                         label={'Lieutenant'}/>
                <StyledCheckBoxWithLabel name={'captain'} checkedHandler={handleChange} checked={checked.captain}
                                         label={'Captain'}/>
                <StyledCheckBoxWithLabel name={'general'} checkedHandler={handleChange} checked={checked.general}
                                         label={'General'}/>
                <StyledCheckBoxWithLabel name={'owner'} checkedHandler={handleChange} checked={checked.owner}
                                         label={'Owner'}/>
            </div>
        </div>
    );
}

export default RankFilter;
