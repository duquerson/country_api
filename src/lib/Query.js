// const QueryAPI = async (endpoint) => {
// 	try {
// 		const promise = await fetch(endpoint);
// 		if (!promise.ok) {
// 			throw new Error(
// 				`Error ${promise.status}: Failed Connection to Server`
// 			);
// 		}
// 		const response = await promise.json();
// 		return response;
// 	} catch (error) {
// 		console.error(error);
// 		return [];
// 	}
// };
//v2 funtion
const QueryAPI = async (endpoint) => {
	const response = await fetch(endpoint);

	if (!response.ok) {
	  throw new Error(`Error ${response.status}: Failed Connection to Server`);
	}

	return await response.json();
  };

export default QueryAPI;
