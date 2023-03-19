import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid blue;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    .info, .buttons {
        display: flex;
        justify-content: space-between;
    }

    img {
        max-width: 120px;
        object-fit: cover;
        margin-left: 50px;
    }
`;