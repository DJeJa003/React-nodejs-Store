import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { v4 as uuid } from "uuid";
import { writeFile } from "fs/promises";
import { Kayttajat } from "../tyypit";

const bcrypt = require('bcrypt');

//käyttäjien tietokannan luominen ja käsittely
export default class KayttajaTietokanta {
    private userDB?: Database;

    constructor() {
        this.yhdistaTietokantaan();
    };

    public haeKayttajat = async () => {
        const kayttajat = await this.userDB?.all("SELECT * FROM kayttajat");
        //console.log(kayttajat);
        return kayttajat;
    };

    private tarkistaOnkoNimiListassa = async (email: string) => {
        const loytyyko = await this.userDB?.get(`SELECT * FROM kayttajat WHERE email = ?`, email);
        return Boolean(!loytyyko);
    }
    private kayttajaListat: Kayttajat[] = [];
    private tiedostoPolku: string = path.join(path.resolve(__dirname, ".."), "kayttajat.json");
    private async tallennaTiedosto() {
        await writeFile(this.tiedostoPolku, JSON.stringify(this.kayttajaListat, null, 2));
    }

    public rekisteroiKayttaja = async (etunimi: string, sukunimi: string, email: string, salasana: string) => {
        const uniikkiNimi = await this.tarkistaOnkoNimiListassa(email);
        if (!uniikkiNimi) {
            throw {
                statusCode: 409,
                message: `Käyttäjä osoitteella "${email}" on jo olemassa`
            }
        }
        const id = uuid();
        // const lause = await this.userDB?.prepare(`INSERT INTO kayttajat (
        //     id, etunimi, sukunimi, email, salasana
        //     ) VALUES (
        //         ?, ?, ?, ?, ?)
        //         `, [email, hash], function(error: any) {
        //     if (error) {
        //         console.log(error.message);
        //         return;
        //     }
        //     console.log(`User ${email} created with password hash ${hash}`);
        //});
        const lause = await this.userDB?.prepare(`
            INSERT INTO kayttajat (
                id, etunimi, sukunimi, email, salasana
            ) VALUES (
                ?, ?, ?, ?, ?
            )
        `)
        //hashays toimii mutta en saanut kirjautumista toimimaan (vielä) hashatylla salasanalla, joten 
        //tämä jää jatkoa varten tänne kummittelemaan
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(salasana, salt);
        await lause?.run(id, etunimi, sukunimi, email, salasana);
        const luotuKayttaja = await this.etsiKayttaja(id);
        await this.tallennaTiedosto();
        return luotuKayttaja;
        
    };


    //tämä pitää pistää vielä oikeasti toimimaan, tällä hetkellä ei suorita ollenkaan
    public kirjauduSisaan = async (email: string, salasana: string) => {
        const kaytt = await this.userDB?.get(`SELECT * FROM kayttajat WHERE email = ? AND salasana = ?`, [email], async function (error:any, kayt: any) {
            if (error) {
                console.log(error.message);
                return;
            }
            if (!kaytt) {
                console.log(`Käyttäjää ${email} ei löytynyt tai väärä salasana`);
                return;
            }

            const onnistui = await bcrypt.compare(salasana, kaytt.salasana);
            if (!onnistui) {
                console.log("Väärät tunnukset");
                return;
            }
            console.log(`Käyttäjä ${email} kirjautui onnistuneesti`);
            return onnistui;
        } )
    };

    public etsiKayttaja = async(id: string) => {
        const loydetty = await this.userDB?.get(`SELECT * FROM kayttajat WHERE id = ?`, id);
        if(!loydetty) {
            throw {
                statusCode: 400,
                message: "Käyttäjää ei löytynyt"
            }
        }
        return loydetty;
    };

    public async poistaKayttaja(id: string) {
        await this.etsiKayttaja(id);
        await this.userDB?.exec(`
        DELETE FROM kayttajat WHERE id = '${id}'
        `)
    };

    private yhdistaTietokantaan = async () => {
        this.userDB = await open({
            filename: path.resolve(__dirname, "kayttajat.db"),
            driver: sqlite3.Database
        })

        await this.userDB.run(`
            CREATE TABLE IF NOT EXISTS kayttajat (
                id TEXT PRIMARY KEY NOT NULL,
                etunimi TEXT NOT NULL,
                sukunimi TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                salasana TEXT NOT NULL
            )
        `)
        this.haeKayttajat();
    };
}