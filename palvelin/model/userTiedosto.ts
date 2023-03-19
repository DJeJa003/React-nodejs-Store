import { Kayttajat } from "../tyypit";
import path from "path";
import { readFile, writeFile } from "fs/promises";

//alkuvaiheessa käytössä, jääkööt tänne
export default class KayttajalistaTiedosto {
    private kayttajat: Kayttajat[] = [];
    private tiedostoPolku: string = path.join(path.resolve(__dirname, ".."), "kayttajat.json");

    constructor() {
        this.lataaTiedosto();
    }

    private async lataaTiedosto() {
        const tiedostoBuffer = await readFile(this.tiedostoPolku, { flag: "a+" });

        if(!tiedostoBuffer.toJSON().data.length) {
            this.kayttajat = [];
        } else {
            this.kayttajat = JSON.parse(tiedostoBuffer.toString());
        }
    }

    public etsiKayttaja(email: string) {
        const loydettyKayttaja = this.kayttajat.find(kayt => kayt.email === email);

        if(!loydettyKayttaja) {
            throw {
                statusCode: 400,
                message: `Käyttäjää nimeltä ${email} ei löytynyt`
            }
        }

        return loydettyKayttaja;
    }
}