import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    height: 100%;
    margin: 0 auto;

    button {
        border-radius: 0 0 20px 20px;
    }

    img {
        max-height: 250px;
        object-fit: contain;
        border-radius: 20px 20px 0 0;
        margin: 10px;
    }

    div {
        font-family: Arial, Helvetixa, sans-serif;
        padding: 1rem;
        height: 100%;
    }
`;