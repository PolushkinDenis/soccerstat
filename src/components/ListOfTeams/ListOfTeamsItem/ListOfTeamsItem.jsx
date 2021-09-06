import React from 'react'
import { Link } from 'react-router-dom'

const ListOfTeamsItem = ({ teams }) => {

    return (
        <tr className="tr">
        <td><img style={{ width: '50px' }} src={teams.crestUrl ? teams.crestUrl : ''}></img></td>
        <td>  <Link to={`/teams/${teams.id}/matches`}>{teams.name}</Link></td>
        <td>{teams.area.name}</td>
        <td><a href={teams.website} target="_blank">{teams.website}</a></td>
    </tr>
    )
}

export default ListOfTeamsItem;