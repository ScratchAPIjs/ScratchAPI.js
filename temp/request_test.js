const https = require("https");

class RequestOption {
  match() {
    throw new Error("NOT_IMPLANTED");
  }
}

const RequestOptions = {
  Object: class extends RequestOption {
    match(structure) {
      return typeof structure === "object";
    }
  },
  Number: class extends RequestOption {
    match(structure) {
      return typeof structure === "number";
    }
  },
  Boolean: class extends RequestOption {
    match(structure) {
      return typeof structure === "boolean";
    }
  },
  String: class extends RequestOption {
    match(structure) {
      return typeof structure === "string";
    }
  },
  Function: class extends RequestOption {
    match(structure) {
      return typeof structure === "function";
    }
  },
  Agent: class extends RequestOption {
    match(structure) {
      return structure instanceof http.Agent || structure instanceof https.Agent;
    }
  },
  AbortSignal: class extends RequestOption {
    match(structure) {
      return structure instanceof AbortSignal;
    }
  },
};

class RequestConfig {
  constructor(data = {}) {
    if (typeof data.forEach !== "function") data = new Map(Object.entries(data));
    this.data = {};
    Object.defineProperty(this, "Items", {
      value: {
        agent: new RequestOptions.Agent(),
        auth: new RequestOptions.String(),
        createConnection: new RequestOptions.Function(),
        defaultPort: new RequestOptions.Number(),
        family: new RequestOptions.Number(),
        headers: new RequestOptions.Object(),
        hints: new RequestOptions.Number(),
        host: new RequestOptions.String(),
        hostname: new RequestOptions.String(),
        insecureHTTPParser: new RequestOptions.Boolean(),
        localAddress: new RequestOptions.String(),
        localPort: new RequestOptions.Number(),
        lookup: new RequestOptions.Function(),
        maxHeaderSize: new RequestOptions.Number(),
        method: new RequestOptions.String(),
        path: new RequestOptions.String(),
        port: new RequestOptions.Number(),
        protocol: new RequestOptions.String(),
        setHost: new RequestOptions.Boolean(),
        socketPath: new RequestOptions.String(),
        timeout: new RequestOptions.Number(),
        signal: new RequestOptions.AbortSignal(),
      },
    });
    data.forEach((_value, _name) => {
      if (!(_name in this.Items)) throw Error("INVALID_DATA:" + _name);
      if (!this.Items[_name].match(_value)) throw TypeError("INVALID_TYPE");
      this.data[_name] = _value;
    });
  }
  concat(...additionalData) {
    Object.assign(this.data, ...additionalData.map((_RequestOptions) => _RequestOptions.valueOf()));
    return new RequestConfig(this.data);
  }
  valueOf() {
    return this.data;
  }
}

class HTTPAdapter {
  #transport;
  #defaultConfig;
  constructor(transport, config) {
    this.#transport = transport;
    this.#defaultConfig = new RequestConfig(config);
  }
  /**
   * Create HTTP(s) request.
   * @param {String} method[_method]
   * @param {String} path
   * @param {Object} config
   * @return {Promise<Respons>}
   */
  request(method = "GET", path, config) {
    const body = JSON.stringify(config.body);
    delete config.body;
    config = new RequestConfig(config);
    config = config.concat(this.#defaultConfig).valueOf();
    console.log(config);
    return new Promise((resolve) => {
      var req = this.#transport.request(
        {
          method: method?.toUpperCase(),
          path,
          ...config,
        },
        function (response) {
          var parts = [];
          response.on("data", function (chunk) {
            parts.push(chunk);
          });
          response.on("end", function () {
            //console.log(response);
            resolve(Buffer.concat(parts).toString(), response);
          });
        }
      );
      req.on("error", console.log);
      if (body) req.write(body);
      req.end();
    });
  }
}
