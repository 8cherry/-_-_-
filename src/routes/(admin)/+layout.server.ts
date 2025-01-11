import authStore from "../../modules/auth/index.svelte.js";
import {redirect} from "@sveltejs/kit";

export const load = async ({ cookies }) => {
	console.log('server admin layout');


	const auth = cookies.get('auth');
	console.log('auth coockie ', auth);
	console.log('type ', typeof auth)

	// load data
	if (typeof auth === 'string') {
		console.log('load coockie ')
		authStore.load(auth);
	}


	//middleware
	console.log('is auth ', authStore.isAuthorized())
	if (!authStore.isAuthorized()) {
		throw redirect(301, `/login`)
	}

	return {
		auth: auth
	};
};

