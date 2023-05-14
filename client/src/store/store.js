import { createStore } from "vuex";

export const store = createStore({
    state: {
        showModal: false
    },
    mutations: {
        toggleShowModal(state) {
            state.showModal = !state.showModal;
        }
    },
    getters: {
        getShowModal(state) {
            return state.showModal;
        }
    }
});