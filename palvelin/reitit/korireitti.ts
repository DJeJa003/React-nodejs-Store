import express, { Router, Request, Response }  from "express";
import { Ostoskori } from "../tyypit";
import OstoskoriTietokanta from "../model/kori";
import { Tuotelista } from "../tyypit";


export const reititin: Router = express.Router();

//täällä olis ostoskorille jo valmiiks reittejä, kunhan joskus pistää sen toimimaan kunnolla

const koriTietokanta = new OstoskoriTietokanta();
const korituotteet: Tuotelista[] = [];

reititin.get("/", async (req: Request, res: Response) => {
    try {
        const tuotelistat = await koriTietokanta.haeKori();
        return res.status(200).json(tuotelistat);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
});

reititin.post("/", async (req: Request, res: Response) => {
    try {
        const { tuotteet, summa } = req.body;

        if(!tuotteet) {
            throw {
                statusCode: 400,
                message: "Hups"
            }
        }
        const tehtyHaku = await koriTietokanta.lisaaKoriin(tuotteet, summa);

        return res.status(201).json(tehtyHaku);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
});

reititin.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const kori = await koriTietokanta.etsiKori(id);
        return res.status(200).json(kori);
    } catch (error: any) {
        return res.status(error.statusCode).json(error);
    }
    
});


reititin.delete("/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        await koriTietokanta.poistaKori(id);

        return response.status(204).json();

    } catch (error: any) {
        return response.status(error.statusCode).json(error);
    }
});