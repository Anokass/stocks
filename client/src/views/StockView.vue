<script setup>
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
    stock: {}
});

axios
    .get(
        `${import.meta.env.VITE_API_ENDPOINT}/api/stock/${localStorage
            .getItem("showStock")
            .toString()}`
    )
    .then((res) => {
        state.stock = res.data;
    })
    .catch((e) => console.error(e));

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const buyStock = (id) => {
    if (
        localStorage.getItem("login") &&
        localStorage.getItem("token") &&
        localStorage.getItem("token")
    ) {
        axios
            .post(
                `${apiEndpoint}/api/portfolio/`,
                {
                    id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            .then(() => {
                router.push("/profile");
            })
            .catch((e) => {
                console.error(e);
            });
    } else {
        router.push("/auth");
    }
};
</script>

<template>
    <main>
        <header-component />
        <div class="cards-wrapper">
            <div class="info">
                <div class="info__content">
                    <h1>
                        {{ state.stock.fullName }} <span>{{ state.stock.shortName }}</span>
                    </h1>
                    <div class="info__content-wrap">
                        <div>
                            <p>Доходность за полгода</p>
                            <h2>{{ state.stock.yieldOverSixMonth }}%</h2>
                        </div>
                        <div>
                            <p>Сектор</p>
                            <h2>{{ state.stock.sector }}</h2>
                        </div>
                    </div>
                </div>
                <div class="info__logo">
                    <img :src="apiEndpoint + '/' + state.stock.icon" alt="icon" />
                </div>
            </div>

            <div class="trade">
                <div>
                    <p>Цена акции</p>
                    <h1>{{ state.stock.price }} ₽</h1>
                </div>
                <button @click="buyStock(state.stock.id)">Купить</button>
            </div>
        </div>

        <div class="about">
            <h2>О компании {{ state.stock.fullName }}</h2>
            <p>{{ state.stock.description }}</p>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: 100vh;
}

.cards-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
    background: #3b4252;
    border-radius: 10px;
    gap: 32px;
}

.info__content {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.info__content > h1 {
    font-weight: 600;
}

.info__content > h1 > span {
    opacity: 0.5;
}

.info__content-wrap {
    display: flex;
    gap: 32px;
}

.info__content-wrap > div > p {
    font-size: 14px;
    color: #d8dee9;
}

.info__content-wrap > div > h2 {
    font-weight: 600;
    font-size: 20px;
}

.info__logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.info__logo > img {
    width: 96px;
}

.trade {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;
    border: 1px solid #3b4252;
    border-radius: 10px;
    height: 100%;
    width: 27.5%;
}

.trade > div > p {
    font-size: 14px;
    color: #d8dee9;
}

.trade > div > h1 {
    font-weight: 600;
}

.trade > button {
    justify-self: flex-end;
    width: 100%;
    padding: 16px 0;
    background: #eceff4;
    color: #2e3440;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: filter 0.25s ease-in-out;
}

.trade > button:hover {
    filter: brightness(80%);
}

.about {
    margin-top: 32px;
    width: 75%;
}

.about > h2 {
    font-weight: 600;
}
</style>