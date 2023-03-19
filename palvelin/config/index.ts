import dotenv from "dotenv";

dotenv.config();

const { PORTTI: portti } = process.env;

export const haeSovelluksenPortti = () => {
    if(!portti) {
        throw new TypeError("Puuttuu env: portti");
    }

    return parseInt(portti);
}