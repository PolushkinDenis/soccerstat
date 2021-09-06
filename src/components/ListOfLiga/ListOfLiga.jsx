import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";

import ListOfLigaItem from './ListOFLogaItem/ListOFLigaItem'
import MyInput from '../UI/MyInput'
import './ListOfLiga.css'

const ListOfLiga = ({leagues}) => {

    const [listOfLiga, setListOfLiga] = useState({})
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const filterName = params.get("name");
    const [searchQuery, setSearchQuery] = useState(filterName ? filterName : "");

    const history = useHistory();

   

    const getFilteredLeagues = () => {
        history.push(`/liga?name=${searchQuery}`);
    };

    const searchLiga = useMemo( () => {
        if(filterName && (listOfLiga.length > 0)){

            return listOfLiga.filter(listOfLiga => listOfLiga.name.toLowerCase().includes(filterName.toLowerCase()))
        }
        return listOfLiga

    }, [filterName, listOfLiga])

    useEffect(() => {

        fetch('http://api.football-data.org/v2/competitions', {
            method: "GET",
            headers: { "X-Auth-Token": process.env.REACT_APP_API_KEY }
        })
            .then(response => response.json())
            .then(data => setListOfLiga(data.competitions));
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
                    <h1>Список лиг</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Логотип</td>
                                <td>Название</td>
                                <td>Страна</td>
                                <td>Начало сезона</td>
                                <td>Конец сезона</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchLiga.map((searchLiga) => (
                                    <ListOfLigaItem listOfLiga={searchLiga} key={searchLiga.id} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            ) :
                (<div>
                    Список лиг пуст
                </div>)}
        </div>
    )
}

export default ListOfLiga;