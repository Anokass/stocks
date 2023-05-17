<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
</script>

<template>
    <main>
        <header-component />
        <div class="about">
            <h1>О нас</h1>
            <p>
                <span>investock.</span> — инвестиционный сервис, который предоставляет возможность
                нашим клиентам покупать и продавать акции крупных компаний. Наша цель - сделать
                инвестирование максимально простым и доступным для всех. Мы предоставляем широкий
                выбор акций, а также помогаем нашим клиентам следить за изменениями в рынке. Наша
                команда состоит из профессиональных экспертов, которые всегда готовы помочь нашим
                клиентам с любыми вопросами по инвестированию.
            </p>
        </div>

        <div class="contact">
            <h1>Контакты</h1>
            <p>
                Если у вас есть какие-либо вопросы или вы хотите связаться с нами, пожалуйста,
                используйте один из следующих способов связи:
            </p>
            <ul>
                <li>Телефон: <span>+X XXX XXX-XX-XX</span></li>
                <li>E-mail: <span>info@investok.com</span></li>
                <li>Адрес: <span>ул. Некрасова, д. 10, офис 301</span></li>
            </ul>
            <p>
                Мы работаем ежедневно с 9:00 до 18:00 (кроме выходных и праздничных дней). Наша
                команда ответит на все ваши вопросы и поможет вам решить любые проблемы, связанные с
                инвестированием в акции крупных компаний.
            </p>
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

.about {
    margin-bottom: 16px;
}

.about > h1 {
    font-size: 32px;
    font-weight: 700;
}

.about > p {
    opacity: 0.7;
    font-size: 20px;
    margin-bottom: 16px;
}

.about > p > span {
    font-weight: 500;
}

.contact > h1 {
    font-size: 32px;
    font-weight: 700;
}

.contact > p {
    opacity: 0.7;
    font-size: 20px;
}

.contact > ul {
    opacity: 0.7;
    list-style-type: none;
    //font-size: 20px;
    margin-bottom: 16px;
}

.contact > ul > li > span {
    font-size: 20px;
    font-weight: 400;
}

.about {
    justify-self: flex-start;
}
</style>
