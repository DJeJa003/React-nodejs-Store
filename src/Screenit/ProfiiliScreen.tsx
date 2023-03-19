import * as React from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, CardMedia } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, useNavigate } from "react-router-dom";
import RekisteroiScreen from "./RekisteroiScreen";
import SignIn from "./KirjauduScreen";
import { useEffect } from "react";

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

//tästä pitäisi tulla profiilisivu käyttäjälle, kunhan saa kirjautumisen toimimaan oikealla tavalla
//vähän testailin tokeneilla mutta en saanut toimimaan, jääköön odottamaan
export default function Profiili() {
    const navigoi = useNavigate();
    const haeKayttaja = async () => {
        try {
            const res = await fetch("/kayttajat");
            const data = await res.json();
            console.log(data)
        } catch (error:any) {
            <div>Oopsie</div>
        }
    }

    useEffect(() => {
        haeKayttaja();
    }, [])
    
    return (
        <div>Tänne olisi tarkoitus lisätä muokkaustoiminnot käyttäjän tiedoille</div>
    )
}