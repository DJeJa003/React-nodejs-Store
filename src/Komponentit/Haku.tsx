import { Wrapper } from "../Kori/Kori-tyylit";
import HakuItem from "./HakuItem";
import { useState } from "react";
import { TextField } from "@mui/material";

interface Tuote {
    id: string;
    nimi: string;
    hinta: number;
    kuvaus: string;
    kuva: string;
    maara: number;
}

type Props = {
    hakuItems: Tuote[];
    title: any;
    lisaaKoriin: (clickedItem: Tuote) => void;
}


const Haku: React.FC<Props> = ({ hakuItems, title, lisaaKoriin }) => {
    const [haku, setHaku] = useState("");
    const hakuItemit = hakuItems.filter((item) => item.nimi.toLowerCase().includes(haku.toLowerCase()));
    //haun alustusta
    return (
        <Wrapper>
            <TextField
                size="small"
                variant="outlined"
                value={haku}
                onChange={(event) => setHaku(event.target.value)}
            ></TextField>
            <h2>{title}</h2>
            {hakuItemit.length > 0 ? (
                hakuItemit.map((item) => (
                <HakuItem
                key={item.id}
                hakuItems={item}
                lisaaKoriin={lisaaKoriin}
                />
                ))
                ) : (
                    <h2>Tuotteita ei löytynyt</h2>
                )
            }
            
        </Wrapper>
    )
}

export default Haku;