import {redirect} from "@sveltejs/kit";
import authStore from "$modules/auth/index.svelte.ts";

export const load = async () => {

    console.log('is auth ', authStore.isAuthorized());

    if (authStore.isAuthorized()) {
        throw redirect(301, `/`)
    }
}
