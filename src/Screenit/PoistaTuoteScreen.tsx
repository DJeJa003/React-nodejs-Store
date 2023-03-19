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

//tuotteen poiston alustusta, ei vielä toimiva
export default function PoistaTuote() {
    const navigoi = useNavigate();
    const naviKoti = () => navigoi("/");
    const naviLisaa = () => navigoi("/luotuote");

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

        try {
            const response = await fetch("/tuotelista", {
                method: "DELETE",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify({
                    nimi: data.get("nimi"),
                }),
            });

            const result = await response.text();
            if(response.body !== null){
                alert("Tuote poistettu onnistuneesti!");
                navigoi("/");
            } else {
                return;
            }
            console.log(result);
        } catch(error) {
            console.error(error);
        };
    };

    //poistolomakkeen luonti
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
                        Poista tuote verkkokaupasta
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={PoistaTuote}
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                            Poista tuote
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
                            onClick={naviLisaa}
                            color="info"
                        >
                            Lisää tuotteita
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ marginTop: 5 }} />
            </Container>
        </ThemeProvider>
    )
}