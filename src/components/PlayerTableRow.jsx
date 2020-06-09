import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import EditableTextfieldCell from "./EditableTextfieldCell";
import EditableDatePickerCell from "./EditableDatePickerCell";
import EditableAutcompleteCell from "./EditableAutcompleteCell";
import TableCell from "@material-ui/core/TableCell";
import EditableMultiSelectCell from "./EditableMultiSelectCell";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import differenceInDays from "date-fns/differenceInDays";
import useApi from "../hooks/useApi";
import {PLAYER_MUTATION} from "../assets/queries";

const useStyles = makeStyles(theme => ({}));

function formatDateTimeFromString(datetime) {
    return format(parseISO(datetime), "dd/MM/yyyy hh:mm:ss")
}

function computeDays(datetime) {
    return differenceInDays(Date.now(), parseISO(datetime)).toString() + " days"
}

function PlayerTableRow({defaultPlayer}) {

    const [player, setPlayer] = useState(defaultPlayer);
    const {handleCall} = useApi({query: PLAYER_MUTATION});

    const handleChange = (name, value) => {
        handleCall({variables: {id: player.id, [name]: value}, handleSuccess: onEditSuccess})
    }

    const onEditSuccess = (data) => {
        setPlayer(data.player.player)
    }

    return (
        <TableRow key={player.id}>
            <EditableTextfieldCell defaultValue={player.username} id={player.id}
                                   name={'username'} width={'10%'}/>
            <EditableDatePickerCell width={'10%'} defaultValue={player.joinDate}
                                    id={player.id} name={'join_date'} onChange={handleChange}/>
            <EditableAutcompleteCell width={'10%'} defaultValue={player.rank} id={player.id}
                                     name={"rank"}/>
            <TableCell width={'5%'}>
                {computeDays(player.joinDate)}
            </TableCell>
            <TableCell width={'10%'}>
                {formatDateTimeFromString(player.createdAt)}
            </TableCell>
            <TableCell width={'10%'}>
                {formatDateTimeFromString(player.updatedAt)}
            </TableCell>
            <EditableMultiSelectCell width={'20%'} defaultValue={player.previousNames}
                                     id={player.id} name={"previous_names"}/>
            <EditableTextfieldCell width={'25%'} defaultValue={player.comment}
                                   id={player.id} name={"comment"} multiline={true}
                                   maxLength={200}/>
        </TableRow>
    );
}

export default PlayerTableRow;
