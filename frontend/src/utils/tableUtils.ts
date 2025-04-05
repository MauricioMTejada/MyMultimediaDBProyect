export const getTableHeaders = (pathname: string, isLoggedIn: boolean) => {
    let headers: string[] = [];

    if (pathname === "/") {
        headers = isLoggedIn
            ? ["id", "arte", "títulos", "datos", "otros datos", "asociar"]
            : ["id", "arte", "títulos", "datos", "otros datos"];
    } else if (pathname === "/movies") {
        headers = ["datos de usuario", "arte", "títulos", "datos", "otros datos"];
    }

    return headers;
};