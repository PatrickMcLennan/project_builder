import { createGlobalStyle, css, GlobalStyleComponent } from "styled-components";

export const GlobalStyle: GlobalStyleComponent<any, any> = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit; 
    }

    body {
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
`;

export const theme: object = {
  // Media Queries
  media: (breakpoint: number, ...args: css): css => css`
    @media screen and (max-width: ${breakpoint}px) {
      ${css(...args)}
    }
  `,
  // Layout
  flexin: (jc: string = `center`, ai: string = `center`, fd: string = `row`, fw: string = `nowrap`): css => css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
    flex-direction: ${fd};
    flex-wrap: ${fw};
  `
};
