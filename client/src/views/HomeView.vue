<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import StocksTable from "../components/StocksTable.vue";
import AddIcon from "../components/icons/AddIcon.vue";
import AddStockModal from "../components/AddStockModal.vue";
import { store } from "../store/store";

const role = localStorage.getItem("role");
</script>

<template>
    <main>
        <header-component />
        <div class="title">
            <h1>Каталог акций</h1>
            <AddIcon v-if="role === 'ADMIN'" @click="store.commit('toggleShowModal')" />
        </div>
        <stocks-table />
        <add-stock-modal v-if="store.getters.getShowModal" />
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
</style>
