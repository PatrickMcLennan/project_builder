import styled, { css } from "styled-components";

export const StyledH1 = styled.h1`
  font-size: 40px;
  color: red;

  ${({ theme: { media } }) =>
    media(
      500,
      css`
        color: green;
        font-size: 30px;
      `
    )}
`;
