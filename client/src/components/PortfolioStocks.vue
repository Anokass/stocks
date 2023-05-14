<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
    stocks: [],
    isEmpty: true,
    totalPrice: 0
});

const props = defineProps({
    setTotalPrice: {
        type: Function,
        required: true
    }
});

const combineObjects = (arr) => {
    return Object.values(
        arr.reduce((acc, cur) => {
            if (acc[cur.id]) {
                acc[cur.id].price += cur.price;
                acc[cur.id].priceChangeForDay += cur.priceChangeForDay;
                acc[cur.id].priceChangeForYear += cur.priceChangeForYear;
                acc[cur.id].count++;
            } else {
                acc[cur.id] = { ...cur, count: 1 };
            }

            state.totalPrice += cur.price;

            return acc;
        }, {})
    );
};

axios
    .get(`${import.meta.env.VITE_API_ENDPOINT}/api/portfolio`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        state.stocks = combineObjects(res.data.portfolioArr.filter(Boolean));
        props.setTotalPrice(state.totalPrice)
        console.log(state.stocks)
        state.isEmpty = false;
    })
    .catch((e) => {
        console.error(e);
    });

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const colorHandler = (num) => {
    if (num > 0) {
        return "#00A127";
    }

    if (num < 0) {
        return "#E31C1C";
    }

    return "white";
};

const setId = async (id) => {
    localStorage.setItem("showStock", id);
    await router.push("/stock");
};
</script>

<template>
    <h2 v-if="state.stocks.length === 0" class="nothing">Вы пока ничего не приобрели</h2>
    <table v-if="state.stocks.length > 0">
        <thead>
            <tr>
                <th>Название</th>
                <th>Цена акции</th>
                <th>За день</th>
                <th>За год</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="stock in state.stocks" :key="stock.id" @click="setId(stock.id)">
                <td class="name">
                    <img :src="apiEndpoint + '/' + stock.icon" alt="icon" />
                    <p>
                        {{ stock.fullName }} <span>{{ stock.shortName }}</span>
                    </p>
                </td>
                <td>{{ stock.price }} ₽</td>
                <td :style="{ color: colorHandler(stock.priceChangeForDay) }">
                    {{
                        stock.priceChangeForDay > 0
                            ? `+${stock.priceChangeForDay}`
                            : stock.priceChangeForDay
                    }}
                    ₽
                </td>
                <td :style="{ color: colorHandler(stock.priceChangeForYear) }">
                    {{
                        stock.priceChangeForYear > 0
                            ? `+${stock.priceChangeForYear}`
                            : stock.priceChangeForYear
                    }}
                    ₽
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border-collapse: collapse;
    margin-top: 32px;
    font-size: 16px;
}

table > thead > tr,
table > tbody > tr {
    border-bottom: 1px solid #434c5e;
}

table > thead > tr > th {
    color: #d8dee9;
    text-align: right;
    padding: 16px 0;
}

table > thead > tr > th:first-child {
    text-align: left;
    padding-left: 16px;
}

table > thead > tr > th:last-child {
    padding-right: 16px;
}

table > tbody > tr > td {
    text-align: right;
    padding: 16px 0;
}

table > tbody > tr > td:first-child {
    padding-left: 16px;
}

table > tbody > tr > td:last-child {
    padding-right: 16px;
}

.name {
    text-align: left;
    display: flex;
    align-items: center;
    gap: 8px;
}

.name > p > span {
    opacity: 0.5;
}

.name > img {
    width: 48px;
}

table > thead > tr {
    padding: 0 16px;
}

table > tbody > tr {
    transition: background 0.25s ease-in-out;
    cursor: pointer;
    padding: 0 16px;
}

table > tbody > tr:hover {
    background: #3b4252;
}

.nothing {
    margin-top: 32px;
    justify-self: center;
    align-self: center;
    opacity: 0.5;
}
</style>
