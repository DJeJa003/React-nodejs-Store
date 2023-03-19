import styled from 'styled-components';
import IconButton  from '@mui/material/IconButton';

export const Wrapper = styled.div`
    margin: 0px 150px 50px 150px;

`;
//ostoskori-ikoni
export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100%;
    right: 12px;
    top: 20px;
`;
//hakuikoni
export const StyledButton2 = styled(IconButton)`
    position: fixed;
    z-index: 100%;
    right: 50px;
    top: 20px;
`;