import {PUBLIC_BACKEND_URL as backendUrl} from "$env/static/public";


let users = [
    {
        email: 'ar@gmail.com',
        password: '123',
    }
];

const login = async (data: {email: string; password: string}) => {
    // let user = users.find((user) => {
    //
    // })
    //
    // if () {
    //
    // }else {
    //
    // }

    return fetch(backendUrl + "/login", {
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
}


export {
    login
}
