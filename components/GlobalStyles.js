import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        font-family: 'Open Sans', sans-serif;
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
        min-height: calc(100vh - 50px);
    }
    footer {
        background-color: rgb(255, 112, 110);
        padding: 15px;
        grid-row-start: 2;
        grid-row-end: 3;
        width: 100%;
        height: 50px;
    }
    #main {
        padding: 0 15px;
    }
    .sign_font {
        display: inline-block;
        font-family: 'Londrina Shadow', cursive;
        color: rgb(255, 205, 41);
        padding: 5px;
        border: 1px solid rgb(255, 205, 41);
        border-radius: 3px;
    }
    h1 span.sign_font {
        font-size: .85em;
        background-color: rgb(219, 21, 18);
    }
`