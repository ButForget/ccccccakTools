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

export { getUrl }