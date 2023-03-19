import { Tuotelista } from "../tyypit";
import path from "path";
import { v4 as uuid } from "uuid";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { writeFile } from "fs/promises";

//tuotteille tietokannan luominen ja käsittely
export default class TuotelistaTietokanta {
    private tietokanta?: Database;

    constructor() {
        this.yhdistaTietokantaan();
    }

    public haeTuotteet = async () => {
        const tuotteet = await this.tietokanta?.all("SELECT * FROM tuotelista");
        //console.log(tuotteet);
        return tuotteet;
    }

    private tarkistaOnkoNimiListassa = async (nimi: string) => {
        const loytyykoTuote = await this.tietokanta?.get(`SELECT * FROM tuotelista WHERE nimi = ?`, nimi);
        return Boolean(!loytyykoTuote);
    }

    private tuoteListat: Tuotelista[] = [];
    private tiedostoPolku: string = path.join(path.resolve(__dirname, ".."), "tuotelista.json");

    private async tallennaTiedosto() {
        await writeFile(this.tiedostoPolku, JSON.stringify(this.tuoteListat, null, 2));
    }

    public async luoTuote(nimi: string, hinta: string, kuvaus: string, kuva: string) {
        const uniikkiNimi = await this.tarkistaOnkoNimiListassa(nimi);
        if (!uniikkiNimi) {
            throw {
                statusCode: 409,
                message: `Tuotelista sisältää jo tuotteen nimellä "${nimi}"`
            }
        }

        const id = uuid();

        const lause = await this.tietokanta?.prepare(`
            INSERT INTO tuotelista (
                id, nimi, hinta, kuvaus, kuva
            ) VALUES (
                ?, ?, ?, ?, ?
            )
        `)
        //console.log(id, nimi, hinta, kuvaus, kuva);      
        await lause?.run(id, nimi, hinta, kuvaus, kuva);

        const luotuTuote = await this.etsiTuote(id);
        await this.tallennaTiedosto();
        return luotuTuote;
    }
    

    public async poistaTuote(id: string) {
        await this.etsiTuote(id);
        await this.tietokanta?.exec(`
        DELETE FROM tuotelista WHERE id = '${id}'
        `)
    }

    public etsiTuote = async(id: string) => {
        const loydettyTuote = await this.tietokanta?.get(`SELECT * FROM tuotelista WHERE id = ?`, id);
        if(!loydettyTuote) {
            throw {
                statusCode: 400,
                message: "Tuotetta ei löytynyt"
            }
        }
        return loydettyTuote;
    }

    public async muokkaaTuote(id: string, tuote: Tuotelista) {
        const loydettyTuote = await this.etsiTuote(id);
        const uniikkiNimi = await this.tarkistaOnkoNimiListassa(tuote.nimi);
        if(!uniikkiNimi) {
            if(loydettyTuote.nimi !== tuote.nimi){
                throw {
                    statusCode: 409,
                    message: `Tuotelista sisältää jo tuotteen nimellä "${tuote.nimi}"`
                }
            }
        }

        const lause = await this.tietokanta?.prepare(`
            UPDATE tuotelista 
            SET nimi = ?, hinta = ?, kuvaus = ?, kuva = ? 
            WHERE id = ?
        `)

        await lause?.run(tuote.nimi, tuote.hinta, tuote.kuvaus, tuote.kuva, id);

        const muokattuTuote = this.etsiTuote(id);

        return muokattuTuote;
    }

    private yhdistaTietokantaan = async() => {
        this.tietokanta = await open({
            filename: path.resolve(__dirname, "tuotteet.db"),
            driver: sqlite3.Database
        })

        await this.tietokanta?.run(`
        CREATE TABLE IF NOT EXISTS tuotelista (
            id TEXT PRIMARY KEY NOT NULL,
            nimi TEXT NOT NULL UNIQUE,
            hinta TEXT NOT NULL,
            kuvaus TEXT NOT NULL,
            kuva TEXT NOT NULL
        )
        `)
        this.haeTuotteet();
    }
}