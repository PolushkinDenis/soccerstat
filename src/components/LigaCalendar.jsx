import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

import LigaCalendarItem from './LigaCalendarItem';

const LigaCalendar = () => {

    const [matches, setMatches] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [error, setError] = useState('')
    const history = useHistory();
    const [changePage] = useState(false);

    const id = useParams()

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    useEffect(() => {
        fetch(`http://api.football-data.org/v2/competitions/${id.id}/matches`, {
            method: "GET",
            headers: { "X-Auth-Token": process.env.REACT_APP_API_KEY }

        })
            .then(response => {
                if (response.status === 403) {
                    setError("Данные не загружены")
                }
                else {
                    response.json()
                    .then(data => setMatches(data.matches));
                }
            })
    }, [changePage]);

    const classes = useStyles();

    const responce = () => {
        if ((dateTo.length > 0) && (dateFrom.length > 0)) {
            fetch(`http://api.football-data.org/v2/competitions/${id.id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
                method: "GET",
                headers: { "X-Auth-Token": process.env.REACT_APP_API_KEY }

            })
                .then(response => response.json())
                .then(data => setMatches(data.matches));
            history.push(history.location.pathname + "?dateFrom=" + dateFrom + "&dateTo=" + dateTo);
        }
    }

    return (
        <div>

            Календарь лиги
            <div>
                <input
                    type="date"
                    value={dateFrom}
                    placeholder="Выберите дату"
                    min="2015-01-01"
                    onChange={(e) => setDateFrom(e.target.value)}
                >
                </input>
                <input
                    type="date"
                    value={dateTo}
                    placeholder="Выберите дату"
                    min="2015-01-01"
                    onChange={(e) => setDateTo(e.target.value)}
                >
                </input>
                <button
                    onClick={responce}
                >
                    Найти
                </button>
            </div>
            {matches.length > 0 ? (
                
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Хозяева</StyledTableCell >
                                <StyledTableCell align="center">Гости</StyledTableCell >
                                <StyledTableCell align="center">Этап</StyledTableCell >
                                <StyledTableCell align="center">Статус</StyledTableCell >
                                <StyledTableCell align="center">Дата</StyledTableCell >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                matches.map((matches) => (
                                    <LigaCalendarItem matches={matches} key={matches.id} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div>
                    Список пуст
                </div>
            )}
        </div>
    )
}

export default LigaCalendar;