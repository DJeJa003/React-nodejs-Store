import { Button } from "@mui/material";
import { Wrapper } from "./KoriItem-tyylit";

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
    poistaKorista: (id: string) => void;
  }

  
  //koriin menevän tuotteen luontia
  const KoriItem: React.FC<Props> = ({item, lisaaKoriin, poistaKorista}) => (
    <Wrapper>
        <div>
            <h3>{item.nimi}</h3>
            <div className="info">
                <p>Hinta: {item.hinta} €</p>
                <p>Yhteensä: {(item.hinta * item.maara).toFixed(2)} €</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => poistaKorista(item.id)}
                >
                    -
                </Button>
                <p>{item.maara}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => lisaaKoriin(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.kuva} alt={item.nimi}></img>
    </Wrapper>
  )


  export default KoriItem;