import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);



// irreversible!
export function createHash(frase) {
  return bcrypt.hashSync(frase, bcrypt.genSaltSync(10))
}

export function isValidHash(received, stored) {
  // return hashear(recibida) !== almacenada
  return bcrypt.compareSync(received, stored)
}



export default __dirname;