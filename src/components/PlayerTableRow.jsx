import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import EditableTextfieldCell from "./EditableTextfieldCell";
import EditableDatePickerCell from "./EditableDatePickerCell";
import EditableAutocompleteCell from "./EditableAutocompleteCell";
import TableCell from "@material-ui/core/TableCell";
import EditableMultiSelectCell from "./EditableMultiSelectCell";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import differenceInDays from "date-fns/differenceInDays";
import useApi from "../hooks/useApi";
import {DELETE_PLAYER_MUTATION, UPDATE_PLAYER_MUTATION} from "../assets/queries";
import {StyledIconButton} from "../assets/styledComponents";
import Delete from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({}));

function formatDateTimeFromString(datetime) {
    return format(parseISO(datetime), "dd/MM/yyyy hh:mm:ss")
}

function computeDays(datetime) {
    return differenceInDays(Date.now(), parseISO(datetime)).toString() + " days"
}

function PlayerTableRow({defaultPlayer, onDelete}) {

    const [player, setPlayer] = useState(defaultPlayer);
    const {handleCall: handlePlayerCall} = useApi({query: UPDATE_PLAYER_MUTATION});
    const {handleCall: handleDeletePlayerCall} = useApi({query: DELETE_PLAYER_MUTATION});

    const handleChange = (name, value) => {
        let newValues = {}
        newValues["username"] = player.username
        newValues["join_date"] = player.joinDate
        newValues["rank"] = player.rank
        newValues["previous_names"] = player.previousNames
        newValues["comment"] = player.comment
        newValues["id"] = parseInt(player.id)
        newValues[name] = value
        handlePlayerCall({variables: {...newValues}, handleSuccess: onEditSuccess})
    }

    const onEditSuccess = (data) => {
        setPlayer(data.updatePlayer.player)
    }

    const handleDelete = (event) => {
        handleDeletePlayerCall({variables: {id: player.id}, handleSuccess: onDeleteSuccess})
    }

    const onDeleteSuccess = (data) => {
        onDelete(data)
    }

    return (
        <TableRow key={player.id}>
            <EditableTextfieldCell defaultValue={player.username} id={player.id}
                                   name={'username'} width={'10%'} align={'left'} onChange={handleChange}/>
            <EditableDatePickerCell width={'10%'} defaultValue={player.joinDate}
                                    id={player.id} name={'join_date'} onChange={handleChange} align={'left'}/>
            <EditableAutocompleteCell width={'10%'} defaultValue={player.rank} id={player.id}
                                      name={"rank"} align={'left'} onChange={handleChange}/>
            <TableCell width={'5%'} align={'left'}>
                {computeDays(player.joinDate)}
            </TableCell>
            <TableCell width={'10%'} align={'center'}>
                {formatDateTimeFromString(player.createdAt)}
            </TableCell>
            <TableCell width={'10%'} align={'center'}>
                {formatDateTimeFromString(player.updatedAt)}
            </TableCell>
            <EditableMultiSelectCell width={'20%'} defaultValue={player.previousNames}
                                     id={player.id} name={"previous_names"} align={'center'} onChange={handleChange}/>
            <EditableTextfieldCell width={'18%'} defaultValue={player.comment}
                                   id={player.id} name={"comment"} multiline={true}
                                   maxLength={200} align={'left'} onChange={handleChange}/>
            <TableCell width={'7%'} align={'center'}>
                <Tooltip title={"Delete"}>
                    <StyledIconButton onClick={handleDelete}>
                        <Delete/>
                    </StyledIconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

export default PlayerTableRow;
