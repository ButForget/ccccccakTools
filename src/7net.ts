import axios, { AxiosResponse } from "axios";
import QueryString from 'query-string';
import { Base64 } from "js-base64";
interface Info {
    studentName: string,
    schoolGuid: string,
    grade: string,
};
interface Exam {
    examGuid: string,
    studentCode: string,
    ruCode: string,
    examName: string,
    time: string,
    score: string,
}
function getUrl(host: string, path: string): string {
    switch (host) {
        case "my":
            return "https://szone-my.7net.cc" + path;
        case "score":
            return "https://szone-score.7net.cc" + path;
        default:
            break;
    }
    return "";
}
const getToken = (username: string, password: string) =>
    new Promise((resolve: (token: string) => void, reject: (msg: string) => void) => {
        axios({
            method: "POST",
            url: getUrl("my", "/login"),
            data: QueryString.stringify({
                userCode: username,
                password: Base64.encode(password),
            }),
            headers: {
                Version: "4.2.5",
            },
        }).then((res) => {
            if(res.data.status !== 200)
                reject(res.data.message);
            resolve(res.data.data.token as string);
        });
    });

const getUserInfo = (token: string) => 
    new Promise((resolve: (res: AxiosResponse) => void, reject: (res: AxiosResponse) => void) => {
        axios({
            method: "GET",
            url: getUrl("my", "/userInfo/GetUserInfo"),
            headers: {
                token: token,
                Version: "4.2.5",
            },
        }).then((response) => {
            if (response.data.status !== 200)
                reject(response);
            resolve(response);
        })
    })
const getExams = (info: Info, token: string) =>
    new Promise((resolve: (exams: Exam[]) => void, reject: (res: AxiosResponse) => void) => {
        let startIndex = 0;
        let rows = 114514;
        let exams: Exam[] = [];
        axios({
            method: "GET",
            url: getUrl("score", "/exam/getClaimExams"),
            params: {
                startIndex: startIndex,
                studentName: info.studentName,
                schoolGuid: info.schoolGuid,
                grade: info.grade,
                rows: rows,
            },
            headers: {
                token: token,
                Version: "4.2.5",
            },
        }).then((response) => {
            if (response.data.status !== 200)
                reject(response);
            let list: [] = response.data.data.list;
            for (let i = 0; i < list.length; i++) {
                exams.push({
                    examGuid: list[i]["examGuid"],
                    studentCode: list[i]["studentCode"],
                    ruCode: list[i]["ruCode"],
                    examName: i + 1 + ". " + list[i]["examName"],
                    time: list[i]["time"],
                    score: list[i]["score"]
                });
            }
            resolve(exams);
        });
    });


export { getUserInfo, getToken, getExams }
export type { Info, Exam };