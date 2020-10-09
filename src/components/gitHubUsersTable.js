import React from 'react'

export default props => {		
	const rows = props.gitHubUsers.map( gitHubUsers => {
		
		return (
			<tr key={gitHubUsers.id}>
				<td>{gitHubUsers.id}</td>
				<td>{gitHubUsers.login}</td>										
				<td>{gitHubUsers.url}</td>								
			</tr>
		)
	})

	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th scope="col">Id</th>					
					<th scope="col">Nome</th>					
					<th scope="col">URL</th>					
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	)
}