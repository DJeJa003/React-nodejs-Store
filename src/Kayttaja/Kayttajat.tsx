import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Kayttaja {
    id: string;
    etunimi: string;
    sukunimi: string;
    email: string;
    salasana: string;
}

type Props = {
    kayttajat: Kayttaja[];
}

// käyttäjän tietojen haku tietokannasta
const Kayttajakanta: FC<Props> = ({kayttajat}) => {
    const navigoi = useNavigate();
    const [ userLista, setUserLista ] = useState<Kayttaja[]>([]);

    const Kirjaudu = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await fetch("/kayttajat");
        const users = await res.json();
        const emailExists = users.some((kayt: any) => kayt.email === data.get("email"));
        if(emailExists && data.get("salasana") === users.salasana) {
            try {
            const response = await fetch("/kayttajat", {
                method: "GET",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify({
                    etunimi: data.get("etunimi"),
                    sukunimi: data.get("sukunimi"),
                    email: data.get("email"),
                    salasana: data.get("salasana"),
                }),
            });
            const result = await response.text();
            alert("Sisäänkirjautuminen onnistui");
            navigoi("/");
            console.log(result);
        } catch(error) {
            console.error(error);
        };
        }
    };
    return (
        <></>
    )
}

export default Kayttajakanta;