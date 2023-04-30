import { defineStore } from "pinia"
import { ref, Ref } from "vue";


const bioStore = defineStore("biology", () => {
    const questions: Ref<Array<{name: string, description: string}>> = ref([]);

    return { questions }
});

export { bioStore }