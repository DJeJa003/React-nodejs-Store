import { AppBar, Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';


interface Props {
    children: JSX.Element;
}
//perus header
const Header: FC<Props> = ( { children } ) => {
    return (
        <>
            <Stack sx={{ marginTop: 2 }} alignItems="center">
                <AppBar position="static">
                    <Box
                    sx={{
                        backgroundColor: "white",
                        padding: "5px",
                        color: "black",
                        position: "static",
                    }}
                    textAlign="center">
                        <Typography variant='h2'><img src="./logo.png" height="90px"/>Verkkokauppa.net</Typography>
                    </Box>
                </AppBar>
            </Stack>
            { children } 
        </>
    );
}

export default Header;