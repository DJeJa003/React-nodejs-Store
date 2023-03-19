import express, { Router, Request, Response }  from "express";
import TuotelistaTiedosto from "../model/tiedosto";
import TuotelistaTietokanta from "../model/tuotetietokanta";

export const reititin: Router = express.Router();

const tuotelistaTiedosto = new TuotelistaTiedosto();
const tuotelistaTietokanta = new TuotelistaTietokanta();

//tuotteille reitit

reititin.get("/", async (req: Request, res: Response) => {
    try {
        const tuotelistat = await tuotelistaTietokanta.haeTuotteet();
        return res.status(200).json(tuotelistat);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
});


reititin.post("/", async (req: Request, res: Response) => {
    try {
        const { nimi, hinta, kuvaus, kuva } = req.body;

        if(!nimi) {
            throw {
                statusCode: 400,
                message: "Eijjole"
            }
        }
        const tehtyHaku = await tuotelistaTietokanta.luoTuote(nimi, hinta, kuvaus, kuva);

        return res.status(201).json(tehtyHaku);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
});

reititin.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tuote = await tuotelistaTietokanta.etsiTuote(id);
        return res.status(200).json(tuote);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
    
});

reititin.put("/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { nimi, hinta, kuvaus, kuva } = request.body;

        if(!nimi || !hinta || !kuvaus || !kuva) {
            throw {
                statusCode: 400,
                message: "Virheellinen sisältö"
            }
        }

        const muokattuTuote = await tuotelistaTietokanta.muokkaaTuote(id, request.body);

        return response.status(200).json(muokattuTuote);

    } catch (error: any) {
        return response.status(error.statusCode).json(error);
    }
});

reititin.delete("/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        await tuotelistaTietokanta.poistaTuote(id);

        return response.status(204).json();

    } catch (error: any) {
        return response.status(error.statusCode).json(error);
    }
});