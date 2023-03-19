import * as React from "react";
import { Grid, Typography, TextField, FormControlLabel, Checkbox } from "@mui/material";

interface Asiakas {
    nimi: string;
    osoite: string;
    postinumero: string;
    kaupunki: string;
    maa: string;
}

interface Props {
    asiakas: Asiakas;
    setAsiakas: React.Dispatch<React.SetStateAction<Asiakas>>;
}

//asiakkaan tietojen käsittelyä lomakkeella, ei vielä toimi oikein
//suunnitelmissa laittaa kirjautuminen toimimaan ja hakea sieltä ennestään olevat tiedot
//loput tiedot tallennetaan talteen jotta saadaan myöhemmin käytettyä
//tämmöinen suunnitelma jatkolle
export default function Tiedot() {
    // const {asiakas ,setAsiakas} = props;
    const [asiakas, setAsiakas] = React.useState({
        etunimi: "",
        sukunimi: "",
        osoite: "",
        kaupunki: "",
        alue: "",
        zip: "",
        maa: "",
    });

    const handleChange = (event: any) => {
        setAsiakas({
            ...asiakas,
            [event.target.name]: event.target.value,
        });
        console.log(asiakas);
    };

    //tulevaisuutta odottamassa
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(asiakas);
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Toimitusosoite
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="etunimi"
                        name="etunimi"
                        label="Etunimi"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={asiakas.etunimi}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sukunimi"
                        name="sukunimi"
                        label="Sukunimi"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={asiakas.sukunimi}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="osoite"
                        name="osoite"
                        label="Osoite"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={asiakas.osoite}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="kaupunki"
                        name="kaupunki"
                        label="Kaupunki"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={asiakas.kaupunki}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="alue"
                        name="alue"
                        label="Alue"
                        fullWidth
                        variant="standard"
                        value={asiakas.alue}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Postinumero"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        value={asiakas.zip}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="maa"
                        name="maa"
                        label="Maa"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={asiakas.maa}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes"/>}
                        label="Käytä tätä osoitetta maksun tiedoissa"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}