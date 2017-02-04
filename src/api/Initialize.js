import ApiClient from './ApiClient'
import ApiSocket from './ApiSocket'

/*
	Initializes the base url for the the Api components.

  This can be expanded later for protocol, security, etc.
*/
export default function(baseUrl) {
	return {
		client: new ApiClient(baseUrl),
		socket: new ApiSocket(baseUrl)
	}
}