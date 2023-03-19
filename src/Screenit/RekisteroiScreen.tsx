import * as React from "react";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Alert, AlertTitle, Hidden } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

interface Kayttaja {
    etunimi: string;
    sukunimi: string;
    email: string;
    salasana: string;
}

type Props = {
    kayttajat: Kayttaja[];
}

const teema = createTheme();

export default function SignUp() {
    const navigoi = useNavigate();   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let onkoTyhjiaKenttia = false;
        data.forEach((value, key) => { 
            //console.log(key, value);
            if(!value) {
                onkoTyhjiaKenttia = true;
            }
        });
        if(onkoTyhjiaKenttia) {
            alert("Täytä kaikki vaaditut kentät.");
            return;
        };
        const res = await fetch("/kayttajat");
        const users = await res.json();
        //tarkistetaan onko käyttäjää kyseisellä sähköpostilla
        const emailExists = users.some((kayt: any) => kayt.email === data.get("email"));
        if(emailExists) {
            alert(`Tunnus ${data.get("email")?.toString()} on jo käytössä.`);
            return;
        };
        //salasanalle säännöt, vähintään yksi numero, yksi erikoismerkki, yksi pieni kirjain, yksi iso kirjain ja vähintään 8 merkkiä
        const salasanaRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const password = data.get("salasana")?.toString() ?? "";
        if(!salasanaRegex.test(password)) {
            alert("Salasanan tulee sisältää vähintään yksi pieni kirjain, numero, erikoismerkki ja iso kirjain.");
            return;
        }
        //tunnuksen luominen tietokantaan
        try {
            const response = await fetch("/kayttajat", {
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify({
                    etunimi: data.get("etunimi"),
                    sukunimi: data.get("sukunimi"),
                    email: data.get("email"),
                    salasana: data.get("salasana"),
                }),
            });

            const result = await response.text();
            if(result)
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

    //rekisteröimislomakkeen alustaminen
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
                        Rekisteröidy käyttäjäksi
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ marginTop: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="etunimi"
                                    required
                                    fullWidth
                                    id="etunimi"
                                    label="Etunimi"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="sukunimi"
                                    label="Sukunimi"
                                    name="sukunimi"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Sähköposti"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="salasana"
                                    label="Salasana"
                                    name="salasana"
                                    type="password"
                                    autoComplete="new-password"
                                    inputProps={{
                                        minLength: 8
                                    }}
                                />
                                <Alert severity="info">
                                    <AlertTitle>Info</AlertTitle>
                                    Salasanan tulee sisältää:
                                    <ul>
                                    <li>vähintään yksi kirjain</li>
                                    <li>vähintään yksi iso kirjain</li>
                                    <li>vähintään yksi numero</li>
                                    <li>vähintään yksi erikoismerkki</li>
                                    </ul>
                                    Salasanan tulee olla vähintään 8 merkkiä pitkä
                                </Alert>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                            Rekisteröidy
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/kirjaudu" variant="body2">
                                    Oletko jo käyttäjä? Kirjaudu sisään
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