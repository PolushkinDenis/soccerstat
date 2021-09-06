import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TeamCalendarItem = ({matches}) => {

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    return (
            <StyledTableRow key={matches.id}>
                <StyledTableCell align="center" component="th" scope="row">
                    {matches.homeTeam.name}
                </StyledTableCell>
                <StyledTableCell align="center">{matches.awayTeam.name}</StyledTableCell>
                <StyledTableCell align="center">{matches.stage}</StyledTableCell>
                <StyledTableCell align="center">{matches.status}</StyledTableCell>
                <StyledTableCell align="center">{matches.utcDate}</StyledTableCell>
            </StyledTableRow>

    )
}

export default TeamCalendarItem;