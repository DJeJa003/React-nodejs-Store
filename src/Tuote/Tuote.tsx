import { Button } from "@mui/material";
import { FC } from "react";
import { Wrapper } from "./Tuote-tyylit";

interface Tuote {
    id: string;
    nimi: string;
    hinta: number;
    kuvaus: string;
    kuva: string;
    maara: number;
}

type Props = {
    item: Tuote;
    lisaaKoriin: (clickedItem: Tuote) => void;
}
//tuotteen alustus
const Item: FC<Props> = ({ item, lisaaKoriin }) => {
    return(
        <Wrapper>
        <img src={item.kuva} alt={item.nimi}/>
        <div>
            <h3>{item.nimi}</h3>
            <p>{item.kuvaus}</p>
            <h3>{item.hinta} €</h3>
        </div>
        <Button type="submit" variant="contained" color="primary" onClick={() => lisaaKoriin(item)}>Lisää koriin</Button>
    </Wrapper>
    )
    
}

export default Item;