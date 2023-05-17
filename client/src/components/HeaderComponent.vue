<script setup>
import ProfileIcon from "./icons/ProfileIcon.vue";

const login = localStorage.getItem("login");

const checkAuth = () => {
    return !!(
        localStorage.getItem("login") &&
        localStorage.getItem("token") &&
        localStorage.getItem("token")
    );
};
</script>

<template>
    <header>
        <h1>
            <router-link to="/">investok.</router-link>
        </h1>

        <div>
            <router-link class="about" to="/about">О нас</router-link>
            <router-link :to="checkAuth() ? '/profile' : '/auth'">
                {{ login ? login : "Войти" }}
                <profile-icon />
            </router-link>
        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 0;
    margin-bottom: 64px;
}

header > h1 > a {
    text-decoration: none;
    color: #eceff4;
    font-weight: 600;
}

header > div {
    display: flex;
    gap: 16px;
}

header > div > a {
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
    font-weight: 500;
    color: #eceff4;
    display: flex;
    align-items: center;
    gap: 4px;
}

header > div > a:hover {
    opacity: 1;
}
</style>