import { defineStore } from "pinia"

const bioStore = defineStore("biology", {
    state: () => {
        return {
            names: ["a test string1.", "a test string2"],
            contents: [],
            playTimeout: 1000,
        }
    }
});

export { bioStore }