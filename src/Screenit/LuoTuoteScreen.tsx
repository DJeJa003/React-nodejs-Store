import * as React from "react";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'© JJ '}
            <Link color="inherit" href="https://github.com/DJeJa003">
                GitHub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const teema = createTheme();

//tuotteen luontisivun alustus
export default function LuoTuote() {
    const navigoi = useNavigate();
    const naviKoti = () => navigoi("/");
    const naviPoisto = () => navigoi("/poista");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let onkoTyhjiaKenttia = false;
        data.forEach((value, key) => { 
            if(!value) {
                onkoTyhjiaKenttia = true;
            }
        })
        if(onkoTyhjiaKenttia) {
            alert("Täytä kaikki vaaditut kentät.");
            return;
        }

        const res = await fetch("/tuotelista");
        const tuote = await res.json();
        const tuoteExists = tuote.some((tuote: any) => tuote.nimi === data.get("nimi"));
        if(tuoteExists) {
            alert(`Tuote ${data.get("tuote")?.toString()} on jo olemassa.`);
            return;
        }

        try {
            const response = await fetch("/tuotelista", {
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify({
                    nimi: data.get("nimi"),
                    hinta: data.get("hinta"),
                    kuvaus: data.get("kuvaus"),
                    kuva: data.get("kuva"),
                }),
            });

            const result = await response.text();
            if(response.body !== null){
                alert("Tuote luotu onnistuneesti!");
                navigoi("/");
            } else {
                return;
            }
            console.log(result);
        } catch(error) {
            console.error(error);
        };
    };

    //tuotteen luontisivu
    return (
        <ThemeProvider theme={teema}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ margin: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Lisää tuote verkkokauppaan
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ marginTop: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="nimi"
                                    required
                                    fullWidth
                                    id="nimi"
                                    label="Nimi"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="hinta"
                                    label="Hinta"
                                    name="hinta"
                                />
                            </Grid>
                            <Grid container wrap="nowrap" item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="kuvaus"
                                    label="Kuvaus"
                                    name="kuvaus"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="kuva"
                                    label="Kuva"
                                    name="kuva"
                                    helperText="Anna kuvan URL-osoite"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={LuoTuote}
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                            Luo tuote
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={naviKoti}
                            color="error"
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                            Peruuta
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={naviPoisto}
                            color="info"
                        >
                            Poista tuotteita
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ marginTop: 5 }} />
            </Container>
        </ThemeProvider>
    )
}