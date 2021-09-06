import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListOfTeams from '../ListOfTeams/ListOfTeams';
import ListOfLiga from '../ListOfLiga/ListOfLiga';
import TeamCalendar from '../TeamCalendar';
import LigaCalendar from '../LigaCalendar';

const Main = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={ListOfLiga} />
                <Route exact path='/liga' component={ListOfLiga} />
                <Route path='/teams' exact component={ListOfTeams} />
                <Route path='/teams/:id/matches' exact component={TeamCalendar} />
                <Route exact path='/liga/:id/matches' component={LigaCalendar} />

            </Switch>
        </div>

    )
}

export default Main;