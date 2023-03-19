import * as React from "react";
import { Grid, Typography, TextField, FormControlLabel, Checkbox } from "@mui/material";

export default function Maksutiedot() {
    
    //lomakkeen maksutiedot -kohta
    //ei tällä hetkellä hae tietoja mistään, suunnitelmissa on korjata tämä
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Maksutapa
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="korttiNimi"
                        label="Kortissa oleva nimi"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="korttiNumero"
                        label="Kortin numero"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Vanhenemispäivä"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV-koodi"
                        helperText="Kortin kääntöpuolelta löytyvät kolme numeroa"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes"/>}
                        label="Muista tämä kortti jatkossa"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}