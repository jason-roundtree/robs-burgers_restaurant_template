import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        font-family: 'M PLUS Rounded 1c', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: 100%;
    }

    body {
        display: grid;
        grid-template-rows: 1fr auto;
    }

    #content {
        min-height: calc(100vh - 70px);
    }

    .page_container {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        @media (max-width: 1000px) {
            font-size: .9em;
            width: 80%;
        }
        @media (max-width: 750px) {
            font-size: .75em;  
            width: 90%;
        }
    }

    button {
        padding: 3px 4px;
        border-radius: 3px;
        border: none;
        background-color: rgb(255, 112, 110);
        color: white;
    }

    button:hover {
        cursor: pointer;
        background: rgb(227, 70, 68);
    }

    li {
        list-style: none;
    }

    fieldset {
        border: none;
    }

    footer {
        background-color: rgb(255, 112, 110);
        padding: 15px;
        grid-row-start: 2;
        grid-row-end: 3;
        width: 100%;
        height: 50px;
        /* This and 70px in #content min-height rule give some room to content that exceeds browser window height. */
        margin-top: 20px;
        background: rgb(245, 245, 245);
    }

    #main {
        padding: 0 15px;
    }

    /* TODO: still need these since i took out h2 tags and removed this style for menu titles on order page? */
    .sign_font {
        /* font-family: 'Londrina Shadow', sans-serif; */
        font-family: 'Bebas Neue', sans-serif;
        display: inline-block;
        padding: 5px;
        border: 1px solid rgb(255, 205, 41);
    }

    h1.sign_font, h2.sign_font {
        font-size: 1em;
        background-color: rgb(219, 21, 18);
        color: rgb(255, 205, 41);
        border-radius: 3px;
        box-shadow: 0 0 10px rgb(255, 205, 41);
    }

    h2.sign_font {
        font-size: 1.75em;
    }

    h2, h3.radial_gradient_text {
        font-size: 3.25em;
        font-family: 'Bebas Neue',sans-serif;
        background: radial-gradient(rgb(255, 147, 145), rgb(255, 233, 161));
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        /* -webkit-text-stroke: .000001em black; */
    }

    div.heading_container {
        background-color: black;
        border: 1px solid rgb(255,205,41);
        /* -webkit-clip-path: polygon(0 0, 1200px 0, 1200px 50%, 0 100%);
        clip-path: polygon(0 0, 1200px 0, 1200px 50%, 0 100%); */
        transform: skewY(-1.5deg);
        width: 65%;
        padding: 5px;
        margin: 0 auto 1em;
        /* @media (max-width: 1000px) {
            width: 70%;
        } */
        @media (max-width: 400px) {
            font-size: .9em;  
            width: 90%;
        }
    }
`