import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

import { StyledH1 } from "./Home.style";

interface IHomeProps extends RouteComponentProps {}

const Home: FC<IHomeProps> = (props: IHomeProps): JSX.Element => (
  <main>
    <StyledH1>Hello World</StyledH1>
  </main>
);

export default Home;
