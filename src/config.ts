export interface Config {
  URL_PORT: number;
  OPENAPI_YAML: string;
  OPENAPI_JSON: string;
  FILE_UPLOAD_PATH: string;
}

const config: Config = {
  URL_PORT: parseInt(process.env.PORT || '8080', 10),
  OPENAPI_YAML: './openapi.yaml',
  OPENAPI_JSON: './openapi.json',
  FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH || '/tmp'
};

export default config;