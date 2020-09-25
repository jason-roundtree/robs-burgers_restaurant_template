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
    }

    #main {
        padding: 0 15px;
    }

    .sign_font {
        /* font-family: 'Londrina Shadow', cursive; */
        font-family: 'Bebas Neue', cursive;
        display: inline-block;
        padding: 5px;
        border: 1px solid rgb(255, 205, 41);
    }

    h1.sign_font, h2.sign_font {
        font-size: 1em;
        background-color: rgb(219, 21, 18);
        border-radius: 3px;
        color: rgb(255, 205, 41);
    }

    h2.sign_font {
        font-size: 1.75em;
    }
`