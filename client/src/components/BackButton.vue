<script setup>
import ArrowBackIcon from "./icons/ArrowBackIcon.vue";
</script>

<template>
    <router-link to="/">
        <arrow-back-icon />
        Назад
    </router-link>
</template>

<style scoped>
a {
    color: #eceff4;
    text-decoration: none;
    font-size: 14px;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
    display: flex;
    text-transform: uppercase;
    gap: 2px;
    font-weight: 500;
}

a:hover {
    opacity: 1;
}

a > svg {
    transition: margin-right 0.25s ease-in-out;
}

a:hover > svg {
    margin-right: 4px;
}
</style>