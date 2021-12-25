interface IConfig {
  REQUEST_ID_HEADER_NAME: string;
  REQUEST_COUNTRY_HEADER_NAME: string;
}

const config: IConfig = {
  REQUEST_ID_HEADER_NAME:
    process.env.REQUEST_ID_HEADER_NAME || "X-Finn-Request-Id",
  REQUEST_COUNTRY_HEADER_NAME: "X-Language-Tag",
};

export default config;
