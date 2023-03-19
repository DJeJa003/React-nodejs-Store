import express, { Router, Request, Response }  from "express";
import { Kayttajat } from "../tyypit";
import KayttajaTietokanta from "../model/users"
import KayttajalistaTiedosto from "../model/userTiedosto";


export const reititin: Router = express.Router();

//käyttäjille tarvittavat reitit

const kayttajaTietokanta = new KayttajaTietokanta();

reititin.get("/", async (req: Request, res: Response) => {
    try {
        const kayttajalista = await kayttajaTietokanta.haeKayttajat();
        return res.status(200).json(kayttajalista);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
});

reititin.post("/", async (req: Request, res: Response) => {
    try {
        const { etunimi, sukunimi, email, salasana } = req.body;

        if(!email) {
            throw {
                statusCode: 400,
                message: "Eijjole"
            }
        }
        const tehtyHaku = await kayttajaTietokanta.rekisteroiKayttaja(etunimi, sukunimi, email, salasana);
        return res.status(201).json(tehtyHaku);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
});

reititin.get("/", async (req: Request, res: Response) => {
    try {
        const { email, salasana } = req.body;

        if(!email) {
            throw {
                statusCode: 400,
                message: "Eijjole"
            }
        }
        const tehtyHaku = await kayttajaTietokanta.kirjauduSisaan(req.params.email, salasana);

        return res.status(201).json(tehtyHaku);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
});

reititin.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const kayttaja = await kayttajaTietokanta.etsiKayttaja(id);
        return res.status(200).json(kayttaja);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
    
});


reititin.delete("/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        await kayttajaTietokanta.poistaKayttaja(id);

        return response.status(204).json();

    } catch (error: any) {
        return response.status(error.statusCode).json(error);
    }
});