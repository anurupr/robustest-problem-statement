const root = 'http://localhost:3000'

export default {
    defParams: {
        headers: {
            'Content-Type': 'application/json'
        }
    },

    req(uri, params) {
        if (typeof params === 'undefined')
            params = {}
        return fetch(root + uri, params).then(response => {
            if(!response.ok) {
                throw Error(response.errorText)
            }
            return response
        });
    },

    jsonResponse:(response) => response.json(),

    buildParams(method, body) {
        if (typeof body === 'undefined')
            body = {}
        return Object.assign({}, this.defParams, { body: JSON.stringify(body), method });
    },

    buildPostParams(body) {
        return this.buildParams("POST", body);
    },

    buildDeleteParams(body) {
        return this.buildParams("DELETE", body);
    },
    buildPatchParams(body) {
        return this.buildParams("PATCH", body);
    },

    buildPutParams(body) {
        return this.buildParams("PUT", body);
    }
}