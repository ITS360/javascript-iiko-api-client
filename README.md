# IIKO API Client

## Getting Started

### Installation

`npm install -s javascript-iiko-api-client`

### Constructor

```
    /**
     *
     * @param address {String} required address
     * @param login {String} required login
     */

new IikoClient(url, login)
```

More information how to get parameters for constructor can be found here:
https://en.iiko.help/articles/#!api/trn-introduction

### Authorization

```
    /**
     *
     * @returns {Promise<void>}
     */

    connect()
```

### Perform request

```
    /**
     *
     * @param method {String} required http request method iiko API tells you to use for given endpoint
     * @param endpoint {String} required endpoint which you are trying to reach (those can be found in iiko API documentation)
     * @param query {String} optional query string
     * @param options {Object} optional options (request body)
     * @param retry {Boolean} optional property used internally to retry request if token Bearer token expired.
     * @returns {Promise<*>}
     */

    request(method, endpoint, query, options, retry)
```

For more information where to get method, endpoint, query and options parameters visit
https://en.iiko.help/articles/#!api/getting-started-api
    

### Example of usage

```
const IikoClient = require("./index");

demo();

async function demo(){
    let iikoClient = new IikoClient("https://api-ru.iiko.services/", "874af36d");
    try{
        let result = await iikoClient.request("get", "organizations");
        console.log(result);
    }catch (err){
        console.log(err);
    }
}
```

Provided by [ITS360](https://its360.lt/)
