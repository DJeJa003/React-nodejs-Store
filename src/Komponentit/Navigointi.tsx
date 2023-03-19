import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";

const Navigointi: FC = () => {

    //navigoinnit eri sivuille ja tyylittelyä
    return (
        <Stack direction="row" justifyContent="space-around">
            <Button variant="contained" color="primary" href="/" sx={{width: "300px"}}>Koti</Button>
            {/* <Button variant="contained" color="primary" href="/haku">Hae</Button> */}
            <Box width="900px" sx={{backgroundColor:"lightskyblue"}}>Ole hyvä ja kirjaudu sisään käyttäjäkokemuksen parantamiseksi</Box>
            <Button variant="contained" color="primary" href="/profiili" sx={{width: "200px"}}>Profiili</Button>
            <Button variant="contained" color="primary" href="/rekisteroidy" sx={{width: "200px"}}>Rekisteröidy</Button>
            <Button variant="contained" color="primary" href="/kirjaudu" sx={{width: "200px"}}>Kirjaudu sisään</Button>
        </Stack>
    );
}

export default Navigointi;