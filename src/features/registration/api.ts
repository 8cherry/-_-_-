import {PUBLIC_BACKEND_URL as backendUrl} from "$env/static/public";

export async function registerUser(data: {
    email: string;
    name: string;
    password: string;
}): Promise<{token: string}> {

    const response = await fetch(backendUrl + "/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });


    console.log(response)


    return response.json();

}
