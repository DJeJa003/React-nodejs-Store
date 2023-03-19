import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { v4 as uuid } from "uuid";
import { writeFile } from "fs/promises";
import { Ostoskori, Tuotelista } from "../tyypit";

//ostoskorin tietokannan rakentamista, tällä hetkellä ei tosiaan vielä toimi ollenkaan, aika loppui nyt kesken
//pitää myöhemmin omalla ajalla pistää toimimaan jotta on tyytyväinen tuotokseen
//jääköt tänne kummittelemaan vielä, vaikka lähes kaikki pitää muuttaa jatkoa ajatellessa
export default class OstoskoriTietokanta {
    private koriDB?: Database;

    constructor() {
        this.yhdistaTietokantaan();
    };

    public haeKori = async () => {
        const kori = await this.koriDB?.all("SELECT * FROM ostoskori");
        console.log(kori);
        return kori;
    };

    private ostosLista: Ostoskori[] = [];
    private tiedostoPolku: string = path.join(path.resolve(__dirname, ".."), "ostoskori.json");
    private async tallennaTiedosto() {
        await writeFile(this.tiedostoPolku, JSON.stringify(this.ostosLista, null, 2));
    };

    public async lisaaKoriin(tuotteet: string, summa: string) {
        const id = uuid();
        const tuotteetStringi = JSON.stringify(tuotteet);
        const lause = await this.koriDB?.prepare(`
            INSERT INTO ostoskori (
                id, tuoteId, maara
            ) VALUES (
                ?, ?, ?
            )
        `)    
        await lause?.run(id, tuotteet, summa);

        const luotuTuote = await this.etsiKori(id);
        await this.tallennaTiedosto();
        return luotuTuote;
    }

    public etsiKori = async(id: string) => {
        const loydetty = await this.koriDB?.get(`SELECT * FROM ostoskori WHERE id = ?`, id);
        if(!loydetty) {
            throw {
                statusCode: 400,
                message: "Tuotetta ei löytynyt"
            }
        }
        return loydetty;
    };

    public async muokkaaKorinSisaltoa(id: string, maara: string) {
        await this.etsiKori(id);
        await this.koriDB?.exec(`
        UPDATE ostoskori
        SET tuoteId = ?, maara = ?
        WHERE id = ?
        `)
    }

    public async poistaKori(id: string) {
        await this.etsiKori(id);
        await this.koriDB?.exec(`
        DELETE FROM ostoskori WHERE id = '${id}'
        `)
    };

    private yhdistaTietokantaan = async () => {
        this.koriDB = await open({
            filename: path.resolve(__dirname, "ostoskori.db"),
            driver: sqlite3.Database
        })

        await this.koriDB.run(`
            CREATE TABLE IF NOT EXISTS ostoskori (
                id TEXT PRIMARY KEY NOT NULL,
                tuoteId TEXT NOT NULL
                REFERENCES Tuotelista(id),
                maara NUMBER NOT NULL
            )
        `)
        this.haeKori();
    };
}