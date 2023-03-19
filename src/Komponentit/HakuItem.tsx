import { Button } from "@mui/material";
import { Wrapper } from "../KoriItem/KoriItem-tyylit"

interface Tuote {
    id: string;
    nimi: string;
    hinta: number;
    kuvaus: string;
    kuva: string;
    maara: number;
  }

  type Props = {
    hakuItems: Tuote;
    lisaaKoriin: (clickedItem: Tuote) => void;
}

    
  const HakuItem: React.FC<Props> = ({hakuItems, lisaaKoriin}) => (
    //haun luonti wrapperiin
    <Wrapper>
        <div>
            <h3>{hakuItems.nimi}</h3>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => lisaaKoriin(hakuItems)}
                >
                    Lisää koriin
                </Button>
                <p>{hakuItems.kuvaus.substring(0, 70)}{hakuItems.kuvaus.length >= 70 && "..."} <br/><b>{hakuItems.hinta} €</b></p>
            </div>
        </div>
        <img src={hakuItems.kuva} alt={hakuItems.nimi}></img>
    </Wrapper>
  )


  export default HakuItem;