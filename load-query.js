let GET = {};
let query = window.location.search.substring(1).split("&");

for (let i = 0; i < query.length; i++) {
    if (query[i] === "") // check for trailing & with no param
        continue;
    var param = query[i].split("=");
    GET[param[0]] = param[1];
}

let currentScene;