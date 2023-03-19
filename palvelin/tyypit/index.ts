export type Tuotelista = {
    id: string;
    nimi: string;
    hinta: string;
    kuvaus: string;
    kuva: string;
}

export type Kayttajat = {
    id: string;
    etunimi: string;
    sukunimi: string;
    email: string;
    salasana: string;
}
//tämä vaatii vielä enemmän miettimistä
export type Ostoskori = {
    id: string;
    tuoteId: Tuotelista["id"];
    maara: number;
}