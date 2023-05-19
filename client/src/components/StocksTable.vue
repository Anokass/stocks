<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import SortIcon from "./icons/SortIcon.vue";
import DecIcon from "./icons/DecIcon.vue";
import IncIcon from "./icons/IncIcon.vue";

const router = useRouter();
const state = reactive({
    stocks: [
        {
            id: 1,
            icon: "",
            fullName: "",
            shortName: "",
            price: 0,
            priceChangeForDay: 0,
            priceChangeForYear: 0,
            yieldOverSixMonth: 0,
            sector: "",
            description: ""
        }
    ],
    initStocks: [],
    sort: "",
    sortBy: ""
});

axios
    .get(`${import.meta.env.VITE_API_ENDPOINT}/api/stock`)
    .then((res) => {
        state.stocks = res.data.map(({...stocks}) => ({...stocks}));
        state.initStocks = res.data.map(({...stocks}) => ({...stocks}));
    })
    .catch((e) => console.error(e));

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

const sort = (by) => {
    console.log(state.initStocks)
    if (by === "DAY") {
        state.sortBy = by;

        if (state.sort === "") {
            state.sort = "DEC";
            state.stocks.sort((a, b) => b.priceChangeForDay - a.priceChangeForDay);
        } else if (state.sort === "DEC") {
            state.sort = "INC";
            state.stocks.sort((a, b) => a.priceChangeForDay - b.priceChangeForDay);
        } else if (state.sort === "INC") {
            state.sort = "";
            state.sortBy = "";
            state.stocks = state.initStocks.map(({...stocks}) => ({...stocks}));
        }
    } else if (by === "YEAR") {
        state.sortBy = by;

        if (state.sort === "") {
            state.sort = "DEC";
            state.stocks.sort((a, b) => b.priceChangeForYear - a.priceChangeForYear);
        } else if (state.sort === "DEC") {
            state.sort = "INC";
            state.stocks.sort((a, b) => a.priceChangeForYear - b.priceChangeForYear);
        } else if (state.sort === "INC") {
            state.sort = "";
            state.sortBy = "";
            state.stocks = state.initStocks.map(({...stocks}) => ({...stocks}));
        }
    }
};
</script>

<template>
    <table v-if="state.stocks">
        <thead>
            <tr>
                <th>Название</th>
                <th>Цена акции</th>
                <th class="sort" @click="sort('DAY')">
                    <div>
                        За день
                        <SortIcon v-if="state.sortBy !== 'DAY'" />
                        <DecIcon v-if="state.sort === 'DEC' && state.sortBy === 'DAY'" />
                        <IncIcon v-if="state.sort === 'INC' && state.sortBy === 'DAY'" />
                    </div>
                </th>
                <th @click="sort('YEAR')">
                    <div>
                        За год
                        <SortIcon v-if="state.sortBy !== 'YEAR'" />
                        <DecIcon v-if="state.sort === 'DEC' && state.sortBy === 'YEAR'" />
                        <IncIcon v-if="state.sort === 'INC' && state.sortBy === 'YEAR'" />
                    </div>
                </th>
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
    <p v-else>Загрузка...</p>
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
    cursor: pointer;
}

table > thead > tr > th > div {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
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
    border-radius: 50%;
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
</style>