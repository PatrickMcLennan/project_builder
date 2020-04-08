import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        padding: 0;
        margin: 0;
        box-sizing:inherit;
    }

    html {
        font-size: 62.5%;
    }

    body {
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
`;

export const theme = {
  // Media Queries
  media: (breakpoint, ...args) => css`
    @media screen and (max-width: ${breakpoint}px) {
      ${css(...args)}
    }
  `,
  // Layout
  flexin: (jc = "center", ai = "center", fd = "row", fw = "nowrap") => css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
    flex-direction: ${fd};
    flex-wrap: ${fw};
  `
};
