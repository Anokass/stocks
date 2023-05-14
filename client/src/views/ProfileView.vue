<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import PortfolioStocks from "../components/PortfolioStocks.vue";
import { ref } from "vue";
import LogoutIcon from "../components/icons/LogoutIcon.vue";
import BackButton from "../components/BackButton.vue";

const totalPrice = ref(0);

const setTotalPrice = (newTotalPrice) => {
    totalPrice.value = newTotalPrice;
};

const logout = () => {
    localStorage.clear();
};
</script>

<template>
    <main>
        <header-component />
        <div class="title">
            <h1>
                Ваш портфель <span>{{ totalPrice }} ₽</span>
            </h1>
            <router-link to="/" @click="logout"
                >Выйти из аккаунта
                <logout-icon />
            </router-link>
        </div>

        <portfolio-stocks :set-total-price="setTotalPrice" />

        <back-button />
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: 100vh;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title > h1 {
    font-size: 32px;
    font-weight: 700;
}

.title > h1 > span {
    opacity: 0.5;
}

.title > a {
    display: flex;
    align-items: center;
    color: #eceff4;
    text-decoration: none;
    font-weight: 500;
    opacity: 0.5;
    transition: opacity, color 0.25s ease-in-out;
}

.title > a:hover {
    color: #e31c1c;
}

.title > a > svg {
    transition: all 0.25s ease-in-out;
    margin-left: 4px;
}

.title > a:hover > svg {
    margin-left: 8px;
    fill: #e31c1c;
}

main > a {
    align-self: center;
    margin-top: 32px;
}
</style>