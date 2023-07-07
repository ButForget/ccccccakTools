import { Base64 } from "js-base64";
import { defineStore } from "pinia"
import { computed, ref, Ref } from "vue";
import { Info, Exam } from "./7net";

const bioStore = defineStore("biology", () => {
    const questions: Ref<Array<string[]>> = ref([]);

    return { questions }
});

const SevenNetUser = defineStore("7net", () => {
    const token: Ref<string> = ref("");
    const exams: Ref<Exam[]> = ref([] as Exam[]);
    const info: Ref<Info> = ref({} as Info);
    function loadUserInfo(data: any): void {
        info.value.studentName = data["studentName"];
        info.value.schoolGuid = data["schoolGuid"];
        info.value.grade = data["grade"];
    }
    function clear(): void {
        token.value = "";
        info.value = {} as Info;
        exams.value = [];
    }
    return { token, exams, clear, info, loadUserInfo, };
}, {
    persist: {
        paths: ['token'],
        // serializer: {
        //     // serialize: Base64.encode,
        //     // deserialize: Base64.decode,
        // },
    }
})

export { bioStore, SevenNetUser }