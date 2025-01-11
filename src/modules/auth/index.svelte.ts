import { PUBLIC_BACKEND_URL as backendUrl} from "$env/static/public";


type TAuth = {};


let store = $state<null | TAuth>(null);


const isAuthorized = $derived(store !== null)


const doLogin = async (data: {email: string; password: string}) => {
    fetch(backendUrl + "/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.status == 404) {
            return alert("Пользователь не существует");
        }

        if (response.status == 400) {
            return alert("Неверный пароль");
        }

        return response.json();
    })
        .then((json) => {
            if (json != undefined || json != null) {
                localStorage.setItem("token", json.token);

                window.location.href = "/home.html";
            }
        });
};

const load = (jwt: string) => {
    console.log(jwt);

    store = {
        user: 123
    };


    return true;
}

const user = $derived(() => {
    return isAuthorized ? '123' : null;
})



export default {
    user: () => user,
    load,
    isAuthorized: () => {return isAuthorized},
    doLogin
}
