import config from "./config.js";
// export const githubClientSecret = '417d642779d8008ebac460acc095161f3c5c6a3f'

// Esto se modifica para cada aplicación
// Archivo de configuración de la autenticación por github

export const githubAppId = config.githubAppId
export const githubClienteId = config.githubClienteId
export const githubClientSecret = config.githubClientSecret
export const githubCallbackUrl = config.githubCallbackUrl


export const JWT_PRIVATE_KEY = config.JWT_PRIVATE_KEY
export const COOKIE_SECRET = config.COOKIE_SECRET
