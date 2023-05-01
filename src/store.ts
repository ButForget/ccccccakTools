import { defineStore } from "pinia"
import { ref, Ref } from "vue";


const bioStore = defineStore("biology", () => {
    const questions: Ref<Array<string[]>> = ref([]);

    return { questions }
});

export { bioStore }