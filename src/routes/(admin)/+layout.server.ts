import authStore from "$modules/auth/index.svelte.js";
import {redirect} from "@sveltejs/kit";

export const load = async ({ cookies }) => {
	console.log('server admin layout');

	//middleware
	if (!authStore.isAuthorized()) {
		throw redirect(301, `/login`)
	}

	return {

	};
};

