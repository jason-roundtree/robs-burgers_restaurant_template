import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: 100%;
        font-family: 'M PLUS Rounded 1c', sans-serif;
    }

    body {
        display: grid;
        grid-template-rows: 1fr auto;
    }

    /* #content {
        min-height: calc(100vh - 120px);
    } */

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
        font-size: 1.25em;
        font-family: 'Contrail One', sans-serif;
        /* box-shadow: 1px 3px 5px -2px black; */
    }

    button:hover {
        cursor: pointer;
        background: rgb(227, 70, 68);
        /* background-image: linear-gradient(to bottom right, rgb(155, 86, 76), rgb(227, 70, 68), rgb(227, 70, 68), rgb(155, 86, 76)); */
        /* box-shadow: none;
        transition: box-shadow 250ms; */
        /* transition: background 250ms ease-in-out; */
    }

    li {
        list-style: none;
    }

    textarea, input[type=number] {
        font-family: 'M PLUS Rounded 1c', sans-serif;
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
        background: rgb(245, 245, 245);
    }

    /* #main {
        padding: 0 15px;
    } */

    /* TODO: still need these since i took out h2 tags and removed this style for menu titles on order page? */
    .sign_font {
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

    h2, h3:not(.h3-no-global-style) {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 3em;
    }

    .cost {
        color: rgb(33, 117, 252);
        font-weight: 500;
        /* font-family: 'Contrail One', sans-serif; */
    }

    .item-of-day-title {
        font-family: 'Contrail One', sans-serif;
        color: rgb(33, 117, 252);
    }

`