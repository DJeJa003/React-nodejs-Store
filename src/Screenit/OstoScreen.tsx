import * as React from "react";
import { AppBar, Toolbar, CssBaseline, Paper, Stepper, Step, StepLabel, Button, Link, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tiedot from "../Osto/Tiedot";
import Maksutiedot from "../Osto/Maksutiedot";
import Varmistus from "../Osto/Varmistus";
import { useState } from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'© JJ '}
            <Link color="inherit" href="https://github.com/DJeJa003">
                GitHub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const steps = ["Toimitusosoite", "Maksutiedot", "Varmista tilauksen oikeellisuus"];

let onkoTyhjiaKenttia = false;
        steps.forEach((value, key) => {
            //console.log(key, value);
            if(!value) {
                onkoTyhjiaKenttia = true;
            }
        })

        if(onkoTyhjiaKenttia) {
            alert("Täytä kaikki vaaditut kentät.");
        }

function haeVaihe(step: number) {
    switch (step) {
        case 0:
            return <Tiedot/>;
        case 1:
            return <Maksutiedot/>
        case 2:
            return <Varmistus/>
        default:
            throw new Error("Hups");
    }
}

const teema = createTheme();

export default function Osto() {
    //vaiheiden käsittelyä
    const [activeStep, setActiveStep] = useState(0);
    const seuraava = () => {
        setActiveStep(activeStep + 1);
    };
    const edellinen = () => {
        setActiveStep(activeStep - 1);
    };

    //tilausnumeron luontia jonkunnäköisellä randomilla
    function randomNumero() {
        return Math.floor(Math.random() * 1655443).toFixed(0);
    }

    return (
        //maksusivun luonti ja sivujen läpikäyminen
        <ThemeProvider theme={teema}>
            <CssBaseline/>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: "relative",
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Verkkokauppa.net maksusivu
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ marginBottom: 4}}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3} }}>
                    <Typography component="h1" variant="h4" align="center">
                        Kassa
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Kiitos tilauksestasi!
                            </Typography>
                            <Typography variant="subtitle1">
                                Tilauksesi numero on #{randomNumero()}. Olemme lähettäneet sähköpostiisi tilausvahvistuksen. 
                                Ilmoitamme kun tilaus on käsitelty ja lähetetty.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {haeVaihe(activeStep)}
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                {activeStep !== 0 && (
                                    <Button onClick={edellinen} sx={{ mt:3, ml:1 }}>
                                        Takaisin
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={seuraava}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length -1 ? "Vahvista tilaus" : "Seuraava"}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright/>
            </Container>
        </ThemeProvider>
    )
}