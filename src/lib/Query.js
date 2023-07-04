const QueryAPI = async (endpoint) => {
	try {
		const promise = await fetch(endpoint)
		if (!promise.ok) {
			throw new Error(
				`Error ${promise.status}: Failed Connection to Server`
			)
		}
		const response = await promise.json()
		return response
	} catch (error) {
		console.error(error)
		return []
	}
}

export default QueryAPI
