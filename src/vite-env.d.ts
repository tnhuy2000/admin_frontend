/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PORT: string
  readonly VITE_APP_BASENAME_PATH: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_GRAPHQL_URI_GEN: string
  readonly VITE_GRAPHQL_WEBSOCKET_URI: string
  readonly VITE_FILE_PATH_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
