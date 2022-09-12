import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  color: white;
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping</Container>;
};

export default Announcement;
