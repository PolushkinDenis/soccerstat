import React from 'react'
import { Link } from 'react-router-dom'

const ListOfLigaItem = ({ listOfLiga }) => {

    return (
        <tr className="tr">
            <td><img style={{ width: '50px' }} src={listOfLiga.emblemUrl ? listOfLiga.emblemUrl : ''}></img></td>
            <td> <Link to={`/liga/${listOfLiga.id}/matches`}>{listOfLiga.name}</Link></td>
            <td>{listOfLiga.area.name}</td>
            <td>{listOfLiga.currentSeason?.startDate ? listOfLiga.currentSeason?.startDate : "Нет данных"}</td>
            <td>{listOfLiga.currentSeason?.endDate ? listOfLiga.currentSeason?.endDate : "Нет данных"}</td>
        </tr>
    )
}

export default ListOfLigaItem;