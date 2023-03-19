import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "../Tuote/Tuote";
import Kori from "../Kori/Kori";
import { AlertTitle, Box, Drawer, FormControlLabel, Paper, Slide, Switch, Theme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Badge } from "@mui/material";
import { StyledButton2, Wrapper } from "../App-styles";
import { StyledButton } from "../App-styles";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Haku from "../Komponentit/Haku";
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';


interface Tuote {
    id: string;
    nimi: string;
    hinta: number;
    kuvaus: string;
    kuva: string;
    maara: number;
}

type Props = {
    tuoteLista: Tuote[];
}


const KotiScreen: FC<Props> = ({
    tuoteLista
}) => {
    //ensin alustetaan kaikki tarpeellinen
    const navigoi = useNavigate();
    const [ kotiLista, setKotilista ] = useState<Tuote[]>([]);
    const [koriAuki, setKoriAuki] = useState(false);
    const [koriItemit, setKoriItemit] = useState([] as Tuote[]);
    const [hakuAuki, setHakuAuki] = useState(false);
    const [haeTuote, setHaeTuote] = useState("");
    const [naytaAlert, setNaytaAlert] = useState(false);
    const [naytaPoistoAlert, setNaytaPoistoAlert] = useState(false);

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: any) => {
      setChecked((prev) => !prev);
      //kommentoi pois jos uskallat
    //   if(event?.target.checked) {
    //     const audio = new Audio("../sound2.mp3");
    //     audio.play();
    //   }
    };

    const haeLista = async () => {
        try {
            const response = await fetch("/tuotelista");
            const data = await response.json();
            setKotilista(data);
        } catch (error: any) {
            <div>Something went wrong</div>
        }
    }
    
    useEffect(() => {
        haeLista();
    }, [])


    const getTotalItems = (koriItemit: Tuote[]) => {
        return koriItemit.reduce((luku: number, item) => luku + item.maara, 0)
    };

    const lisaaKoriin = (clickedItem: Tuote) => {
        setKoriItemit(prev => {
            const onkoJoKorissa = prev.find(item => item.id === clickedItem.id);
            if (onkoJoKorissa) {
                return prev.map(item => (
                    item.id === clickedItem.id
                    ? { ...item, maara: item.maara + 1 }
                    : item
                ));
            }
            return [...prev, { ...clickedItem, maara: 1 }];
        });
        setNaytaAlert(true);
        setTimeout(() => {
            setNaytaAlert(false);
        }, 3000);
    };

    const poistaKorista = (id: string) => {
        setKoriItemit(prev => (
            prev.reduce((luku, item) => {
                if (item.id === id){
                    if(item.maara === 1) return luku;
                    return [...luku, { ...item, maara: item.maara - 1 }];
                } else {
                    return [...luku, item];
                }
            }, [] as Tuote[])
        ));
        setNaytaPoistoAlert(true);
        setTimeout(() => {
            setNaytaPoistoAlert(false);
        }, 3000);
    };

    function AlertAjastuksella(props: any) {
        const [open, setOpen] = useState(true);
      
        useEffect(() => {
          const timeoutId = setTimeout(() => {
            setOpen(false);
          }, props.timeout || 5000);
      
          return () => {
            clearTimeout(timeoutId);
          };
        }, [props.timeout]);
      
        if (open) {
          return (
            <Alert severity={props.severity}>
              <AlertTitle>{props.title}</AlertTitle>
              {props.children}
            </Alert>
          );
        } else {
          return null;
        }
      }

    const alert = (<AlertAjastuksella timeout={3000} severity="success">
            <AlertTitle>Onnistui</AlertTitle>
            Tuote on lisätty koriin!
            </AlertAjastuksella>
            );
        
    const poistoAlert = (<AlertAjastuksella timeout={3000} severity="info">
    <AlertTitle>Onnistui</AlertTitle>
    Tuote on poistettu korista!
    </AlertAjastuksella>
    );

    //yllätystä varten tämmöinen täällä
    const kuva = "../index.jpg"
    const ikoni = (
        <Paper sx={{ marginLeft: 57 }} elevation={4}>
          <Box
          component="img"
          sx={{
            height: 500
          }}
          src={kuva}
        />
        </Paper>
      );

    const hakuLista = kotiLista.filter(
        (item) => 
        item.nimi.toLowerCase().includes(haeTuote.toLowerCase()) ||
        item.kuvaus.toLowerCase().includes(haeTuote.toLowerCase())
    );

    return (
        //perusnäytön alustus. jostain syystä ostoskorin ikoni sekä hakuikoni elävät omaa elämäänsä täällä, ennen kuin käyttäjä kirjautuu sisään
        <Wrapper>
            {naytaAlert && alert}
            <Drawer anchor="left" open={hakuAuki} onClose={() => setHakuAuki(false)}>
                <Haku hakuItems={hakuLista}
                title={hakuLista.length === 0 ? "Tuotteita ei löytynyt" : "Hae tuotteita..."}
                lisaaKoriin={lisaaKoriin}
                />
            </Drawer>
            <StyledButton2 onClick={() => setHakuAuki(true)}>
                <SearchIcon/>
            </StyledButton2>
                <Box sx={{ width: `calc(100px + 16px)` }}>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} />}
                        label="Yllätys"
                    />
                    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                        {ikoni}
                    </Slide>
                </Box>
            <Drawer anchor='right' open={koriAuki} onClose={() => setKoriAuki(false)}>
                <Kori koriItems={koriItemit}
                lisaaKoriin={lisaaKoriin}
                poistaKorista={poistaKorista}
                />
                {naytaPoistoAlert && poistoAlert}
            </Drawer>
            <StyledButton onClick={() => setKoriAuki(true)}>
                <Badge badgeContent={getTotalItems(koriItemit)} color='error'>
                    <AddShoppingCartIcon/>
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {kotiLista?.map(tuote => (
                    <Grid item key={tuote.id}>
                        <Item item={tuote} lisaaKoriin={lisaaKoriin}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default KotiScreen;