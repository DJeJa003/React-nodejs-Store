import * as React from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, CardMedia } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, useNavigate } from "react-router-dom";
import Profiili from "./ProfiiliScreen";

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

export default function SignIn() {
    const navigoi = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let onkoTyhjiaKenttia = false;
        data.forEach((value, key) => {
            //console.log(key, value);
            if(!value) {
                onkoTyhjiaKenttia = true;
            }
        })

        if(onkoTyhjiaKenttia) {
            alert("Täytä kaikki vaaditut kentät.");
            return;
        }
        //navigoi(`/kayttajat/${data.get('email')}`);
        Kirjaudu(event);
        // console.log({
        //     email: data.get('email'),
        //     salasana: data.get('salasana'),
        // });
    };
    
    //palveluun kirjautuminen, jos kirjautuu adminin tunnuksilla, pääsee luomaan uusia tuotteita
    //vielähän tämä ei tee mitään muuta kuin ilmoittaa että onko tunnukset olemassa ja oikein vai ei
    //jatkoa ajatellen tässä on paljon kehitettävää
    const Kirjaudu = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await fetch("/kayttajat");
        const users = await res.json();
        const emailExists = users.some((kayt: any) => kayt.email === data.get("email"));
        if(emailExists) {
            const user = users.find((user: any) => user.email === data.get("email"));
            if(user.salasana === data.get("salasana")) {
                alert("Kirjautuminen onnistui!");
                if(user.email === "admin" && user.salasana === data.get("salasana")) {
                    navigoi("/luotuote");
                } else {
                    navigoi("/");
                };                
            } else {
                alert("Väärä käyttäjätunnus tai salasana!");
            }
        }
        if(!emailExists) {
            alert("Väärä käyttäjätunnus tai salasana!");
        }
    };

    //sisäänkirjautumisen lomake
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
                        Kirjaudu sisään
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ marginTop: 3}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Sähköposti"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="salasana"
                            label="Salasana"
                            name="salasana"
                            type="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Muista minut"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                            Kirjaudu sisään
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0&autoplay=1" target="_blank" rel="noreferrer" variant="body2">
                                    Unohditko salasanasi?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/rekisteroidy" variant="body2">
                                    {"Etkö ole käyttäjä? Rekisteröidy"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ marginTop: 5 }} />
            </Container>
        </ThemeProvider>
    )
}