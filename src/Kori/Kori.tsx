import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KoriItem from "../KoriItem/KoriItem";
import { Wrapper } from "./Kori-tyylit";

interface Tuote {
    id: string;
    nimi: string;
    hinta: number;
    kuvaus: string;
    kuva: string;
    maara: number;
  }

  interface Kori {
    id: string;
    tuotteet: string;
    summa: string;
  }

  type Props = {
    koriItems: Tuote[];
    lisaaKoriin: (clickedItem: Tuote) => void;
    poistaKorista: (id: string) => void;
  }

  const Kori: React.FC<Props> = ({koriItems, lisaaKoriin, poistaKorista}) => {
    const navigoi = useNavigate();
    const kokonaisSumma = (items: Tuote[]) =>(
        items.reduce((luku: number, item) => luku + item.maara * item.hinta, 0)
    );

    const [carts, setCarts] = useState([]);
    const [payload, setPayloader] = useState({});
    const [error, setError] = useState(false);
    async function haeKori() {
      const res = await fetch("/ostoskori");
      res.json().then((res) => {
        console.log(res.data.items);
        setCarts(res.data.items);
        setPayloader(res.data);
      })
      .catch((error) => {
        setError(error);
      })
    }

    async function lisaaMaaraa(id: string) {
      try {
        const res = await fetch("/ostoskori", {
          method: "POST",
          body: JSON.stringify({
            tuoteId: id,
            maara: 1,
          }),
          headers: {
            "Content-type":"application/json; charset=UTF-8",
          },
        });
        console.log(res);
        haeKori();
        alert("Lisääntyi");
      } catch (err) {
        console.log(err);
      }
    }
    useEffect(() => {
      haeKori();
    }, []);


    //ei toimi joten ei käytössä, koska ostoskorin tietokanta ei ole toiminnassa
    const LuoKori = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      try {
          const response = await fetch("/ostoskori", {
              method: "POST",
              headers: { "Content-Type":"application/json"},
              body: JSON.stringify({
                  tuotteet: data.get("Tuote"),
                  summa: data.get("summa"),
              }),
          });

          const result = await response.text();
          if(response.body !== null){
              alert("Tunnus luotu onnistuneesti");
              navigoi("/");
          } else {
              return;
          }
          
          console.log(result);
      } catch(error) {
          console.error(error);
      };
      // console.log({
      //     email: data.get('email'),
      //     salasana: data.get('salasana'),
      // });
  };
    
    const kassalleClick = () => {
      if(koriItems.length > 0){
        const newKori: Tuote[] = [];
        koriItems.forEach(item => {
          newKori.push(item);
        });
        koriItems.forEach(item => {
          lisaaKoriin(item);
        });
        console.log(newKori);
        navigoi("/osto");
      } else {
        return;
      }
      
    };

    //ostoskorin sisällön luominen
    return (
        <Wrapper>
            <h2>Ostoskorisi sisältö</h2>
            {koriItems.length === 0? <p>Tyhjää täynnä.</p> : null}
            {koriItems.map(item => (
                <KoriItem
                key={item.id}
                item={item}
                lisaaKoriin={lisaaKoriin}
                poistaKorista={poistaKorista}
                />
            ))}
            {koriItems.length > 0 ? <h2>Kokonaissumma: { kokonaisSumma(koriItems).toFixed(2) } €</h2> : null}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: 3, marginBottom: 2 }}
                onClick={kassalleClick}
                >
                  Kassalle
                </Button>
        </Wrapper>
    )
  }

  export default Kori;