import React from 'react';
import styled from 'styled-components'

const StyledContainer = styled.div`
  border: 1px solid;
  padding: 25px 12px 18px;
  background-color: black;
`

const Title = styled.h2`
  color: #fff;
  font-weight: 300;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`

const Description = styled.p`
  color: #fff;
  font-weight: 300;
  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`

const Card = ({
  title,
  description
}) => (
  <StyledContainer>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </StyledContainer>
);

export default Card;
