<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import jwt_decode from "jwt-decode";
import BackButton from "../components/BackButton.vue";

const login = ref("");
const password = ref("");
const isAdmin = ref("");
const state = reactive({
    mode: "login",
    error: false,
    errorMsg: ""
});
const router = useRouter();

const changeMode = () => {
    if (state.mode === "login") {
        state.mode = "reg";
    } else if (state.mode === "reg") {
        state.mode = "login";
    }
};

const auth = () => {
    if (state.mode === "login") {
        axios
            .post(
                `${import.meta.env.VITE_API_ENDPOINT}/api/user/login`,
                {
                    login: login.value,
                    password: password.value
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((res) => {
                if (res.data.token) {
                    state.error = false;
                    const { login, role } = jwt_decode(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("login", login);
                    localStorage.setItem("role", role);
                    return router.push("/profile");
                }

                state.error = true;
                state.errorMsg = "Неверный логин или пароль";
            })
            .catch((e) => {
                console.error(e);
                state.error = true;
                state.errorMsg = "Неверный логин или пароль";
            });
    } else if (state.mode === "reg") {
        axios
            .post(
                `${import.meta.env.VITE_API_ENDPOINT}/api/user/registration`,
                {
                    login: login.value,
                    password: password.value,
                    role: isAdmin.value ? "ADMIN" : "USER"
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((res) => {
                if (res.data.token) {
                    state.error = false;
                    const { login, role } = jwt_decode(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("login", login);
                    localStorage.setItem("role", role);
                    return router.push("/profile");
                }

                state.error = true;
                state.errorMsg = "Неверный логин или пароль";
            })
            .catch((e) => {
                console.error(e);
                state.error = true;
                state.errorMsg = "Неверный логин или пароль";
            });
    }
};

(() => {
    if (
        localStorage.getItem("login") &&
        localStorage.getItem("token") &&
        localStorage.getItem("token")
    ) {
        router.push("/profile");
    }
})();
</script>

<template>
    <main>
        <form @submit.prevent="auth">
            <h1>
                investok. <span>{{ state.mode === "login" ? "вход" : "регистрация" }}</span>
            </h1>
            <p v-if="state.error" class="error">{{ state.errorMsg }}</p>
            <div class="inputs">
                <label>
                    Логин
                    <input v-model="login" type="text" required placeholder="username" />
                </label>
                <label>
                    Пароль
                    <input v-model="password" type="password" required placeholder="password" />
                </label>
                <div class="is-admin" v-if="state.mode === 'reg'">
                    <input v-model="isAdmin" type="checkbox" id="is-admin" />
                    <label for="is-admin">Администратор</label>
                </div>
            </div>
            <div class="buttons">
                <button class="submit" type="submit">
                    {{ state.mode === "login" ? "Войти" : "Создать аккаунт" }}
                </button>
                <button @click="changeMode" class="change" type="reset">
                    {{ state.mode === "login" ? "Регистрация" : "Вход" }}
                </button>
            </div>
            <back-button />
        </form>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60vw;
    height: 100vh;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 375px;
    padding: 32px;
}

h1 {
    font-weight: 600;
}

h1 > span {
    opacity: 0.5;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

.inputs > label {
    display: flex;
    flex-direction: column;
}

.inputs > label > input {
    background: inherit;
    border: none;
    color: #eceff4;
    font-size: 16px;
    border-bottom: 3px solid #eceff4;
    padding: 8px;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
}

.inputs > label > input:focus {
    outline: none;
    opacity: 1;
}

.inputs > label > input:active {
    opacity: 1;
}

.buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

.submit,
.change {
    padding: 8px 0;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: filter 0.25s ease-in-out;
}

.submit {
    background: #eceff4;
    color: #2e3440;
    border: none;
    font-weight: 600;
    text-transform: uppercase;
}

.change {
    background: inherit;
    border: 2px solid #eceff4;
    color: #eceff4;
}

.submit:hover,
.change:hover {
    filter: brightness(80%);
}

.is-admin {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    justify-self: center;
    opacity: 0.7;
    transition: opacity 0.25s ease-in-out;
}

.is-admin:hover {
    opacity: 1;
}

.error {
    color: #e31c1c;
}
</style>
