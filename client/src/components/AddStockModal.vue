<script setup>
import { store } from "../store/store";
import { ref } from "vue";
import axios from "axios";

const icon = ref(null);
const fullName = ref("");
const shortName = ref("");
const price = ref(0);
const priceChangeForDay = ref(0);
const priceChangeForYear = ref(0);
const yieldOverSixMonth = ref(0);
const sector = ref("");
const description = ref("");

const onFileChange = (event) => {
    icon.value = event.target.files[0];
};

const submitForm = async () => {
    const formData = new FormData();
    formData.append("fullName", fullName.value);
    formData.append("shortName", shortName.value);
    formData.append("price", price.value);
    formData.append("priceChangeForDay", priceChangeForDay.value);
    formData.append("priceChangeForYear", priceChangeForYear.value);
    formData.append("yieldOverSixMonth", yieldOverSixMonth.value);
    formData.append("sector", sector.value);
    formData.append("description", description.value);
    formData.append("icon", icon.value);

    try {
        await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/stock`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        store.commit("toggleShowModal");
    } catch (e) {
        console.error(e)
    }
}
</script>

<template>
    <div class="overlay" @click.self="store.commit('toggleShowModal')">
        <form @submit.prevent="submitForm">
            <h2>Добавить акцию</h2>
            <div class="inputs">
                <label>
                    icon:
                    <input @change="onFileChange" type="file" required />
                </label>
                <label>
                    full name:
                    <input v-model.trim="fullName" type="text" required />
                </label>
                <label>
                    short name:
                    <input v-model.trim="shortName" type="text" required />
                </label>
                <label>
                    price:
                    <input v-model.number="price" type="number" required />
                </label>
                <label>
                    price change for day:
                    <input v-model.number="priceChangeForDay" type="number" required />
                </label>
                <label>
                    price change for year:
                    <input v-model.number="priceChangeForYear" type="number" required />
                </label>
                <label>
                    yield over six month:
                    <input v-model.number="yieldOverSixMonth" type="number" required />
                </label>
                <label>
                    sector:
                    <input v-model.trim="sector" type="text" required />
                </label>
                <label>
                    description:
                    <textarea v-model.trim="description" required />
                </label>
            </div>
            <div class="buttons">
                <button @click="store.commit('toggleShowModal')">Close</button>
                <button type="submit">SUBMIT</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    background: #000;
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border: 1px dashed #fff;
    width: 320px;
    box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.inputs > label {
    display: flex;
    justify-content: space-between;
}

.inputs > label > input,
textarea {
    width: 128px;
    background: #000;
    color: #fff;
    border: 1px solid #fff;
}

.buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.buttons > button {
    background: inherit;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0;
    font-size: 16px;
    transition: all 0.25s ease-in-out;
}

.buttons > button:hover {
    text-decoration: underline;
}
</style>