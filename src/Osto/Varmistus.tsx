import * as React from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import Tuote from "../Tuote/Tuote";
import getTotalItems from "../Screenit/KotiScreen";
import { useState } from "react";
import  newKori  from "../Kori/Kori";
import Kayttajakanta from "../Kayttaja/Kayttajat";

type Props = {
  koriItems: newKori[];
}
interface Kayttaja {
  id: string;
  etunimi: string;
  sukunimi: string;
  email: string;
  salasana: string;
}


//tällä hetkellä kun ostoskori ei vielä toimi, nämä on vain esimerkin vuoksi täällä alustettu
const tuotteet = [
  {
    nimi: 'Televisio',
    hinta: '2299 €',
    kuvaus: 'Samsungin huippulaadukas putkitelevisio'
  },
  {
    nimi: 'Kenkä',
    hinta: '99 €',
    kuvaus: 'Oikein hieno kenkä'
  },
    
    { nimi: 'Kuljetus', hinta: 'Ilmainen', kuvaus: ''},
  ];
  //jatkossa osoite haettaisiin Tiedot-kohdassa saaduista tiedoista
  const osoite = ['Umpikuja 1', 'Mikkeli', '50100', 'Suomi'];

  //jatkossa maksun tiedot haettaisiin Maksutiedot-kohdassa saaduista tiedoista
  const maksu = [
    { nimi: 'Kortin tyyppi', tieto: 'Visa' },
    { nimi: 'Kortin omistaja', tieto: 'Matti Meikäläinen' },
    { nimi: 'Kortin numero', tieto: '1234-5678-xxxx-xxxx' },
    { nimi: 'Päivämäärä', tieto: '01/2029' },
  ];
  
  //tällä hetkellä tosiaan vain tulostetaan vain ennestään annetut tiedot
  export default function Varmistus() {
    function Tuotteet({koriItems}: Props) {
      return (
        <List disablePadding>
          {koriItems.map((product) => (
            <ListItem key={product.tuotteet} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={product.tuotteet} secondary={product.summa} />
              <Typography variant="body2">{product.summa}</Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Tuotteet" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              
            </Typography>
          </ListItem>
        </List>
      )
      
    }
    const [koriItemit, setKoriItemit] = useState<newKori[]>([]);
    //jatkoa ajatellen nämä tuotteet tullaan hakemaan asiakkaan itse syöttämistä tiedoista
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Tilauksen yhteenveto 
        </Typography>
        <Tuotteet koriItems={koriItemit}/>
        <List disablePadding>
          {tuotteet.map((product) => (
            <ListItem key={product.nimi} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={product.nimi} secondary={product.kuvaus} />
              <Typography variant="body2">{product.hinta}</Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Kokonaissumma" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              59385.52 €
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Toimitus
            </Typography>
            <Typography gutterBottom>Matti Meikäläinen</Typography>
            <Typography gutterBottom>{osoite.join(', ')}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Maksun tiedot
            </Typography>
            <Grid container>
              {maksu.map((maksu) => (
                <React.Fragment key={maksu.nimi}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{maksu.nimi}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{maksu.tieto}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }