import { Express } from "express";
import express from "express";
import path from "path";
import { haeSovelluksenPortti } from "./config";
import { reititin as kayttajaReitti } from "./reitit/kayttajareitti"
import { reititin as tuotelistaReitti } from "./reitit/tuotelistareitti";
import { reititin as koriReitti } from "./reitit/korireitti";

//palvelimen alustaminen sekä reittien luonti
const palvelin: Express = express();
palvelin.use(express.json());

palvelin.use("/", express.static(path.join(__dirname, "static")));
palvelin.use('/kuvat', express.static(__dirname + '/kuvat'));
palvelin.use("/tuotelista", tuotelistaReitti);
palvelin.use("/kayttajat", kayttajaReitti);
palvelin.use("/ostoskori", koriReitti);

palvelin.listen(haeSovelluksenPortti(), () => {
    console.log(`Palvelin kuuntelee porttia ${haeSovelluksenPortti()}`);
})