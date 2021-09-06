import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import ListOfTeamsItem from './ListOfTeamsItem/ListOfTeamsItem'
import MyInput from '../UI/MyInput'

const ListOfTeams = () => {

    const [teams, setTeams] = useState('')

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const filterName = params.get("name");
    const [searchQuery, setSearchQuery] = useState(filterName ? filterName : "");

    const history = useHistory();

   

    const getFilteredLeagues = () => {
        history.push(`/teams?name=${searchQuery}`);
    };

    const searchLiga = useMemo( () => {
        if(filterName && (teams.length > 0)){

            return teams.filter(teams => teams.name.toLowerCase().includes(filterName.toLowerCase()))
        }
        return teams

    }, [filterName, teams])

    useEffect(() => {
        
        fetch('http://api.football-data.org/v2/teams', {
            method: "GET",
            headers: { "X-Auth-Token": process.env.REACT_APP_API_KEY }

        })
            .then(response => response.json())
            .then(data => setTeams(data.teams));
    }, []);


    return (
        <div>
              <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Название лиги" />
            <button
                onClick={getFilteredLeagues}
            >
                Найти
            </button>
            {searchLiga.length > 0 ? (
                <div>
                    Список команд
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Логотип</td>
                                <td>Название</td>
                                <td>Страна</td>
                                <td>Сайт</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                searchLiga.map((searchLiga) => (
                                    <ListOfTeamsItem teams={searchLiga} key={searchLiga.id} />
                                ))
                            }
                        </tbody>
                    </table>         
                </div>
            ) : (
                <div>
                     Список команд пуст
                </div>
            )}
        </div>
    )
}

export default ListOfTeams;