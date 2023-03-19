import { Tuotelista } from "../tyypit";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

//tämä oli testivaiheessa käytössä ainakin, jääkööt tänne
export default class TuotelistaTiedosto {
    private tuoteListat: Tuotelista[] = [];
    private tiedostoPolku: string = path.join(path.resolve(__dirname, ".."), "tuotelista.json");

    constructor() {
        this.lataaTiedosto();
    }

    private async lataaTiedosto() {
        const tiedostoBuffer = await readFile(this.tiedostoPolku, { flag: "a+" });

        if(!tiedostoBuffer.toJSON().data.length) {
            this.tuoteListat = [];
        } else {
            this.tuoteListat = JSON.parse(tiedostoBuffer.toString());
        }
    }

    public etsiTuote(nimi: string) {
        const loydettyTuote = this.tuoteListat.find(tuote => tuote.nimi === nimi);

        if(!loydettyTuote) {
            throw {
                statusCode: 400,
                message: `Tehtävää id:llä ${nimi} ei löytynyt`
            }
        }

        return loydettyTuote;
    }
}