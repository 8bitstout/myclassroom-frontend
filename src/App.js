import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Components/Card';
import styled from 'styled-components';

const StyledRoot = styled.div`
  padding: 50px 12px;
`

const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
`

function App() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/api/v1/resource')
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setResources(response);
      })
      .catch(error => console.log(error));
  }, [resources]);

  return (
    <div className="App">
      <div>
        {resources.map(({ name, author, url }) => (
          <StyledRoot>
            <StyledContainer>
              <Card
                title={(<a href={url}>{name}</a>)}
                description={`${author.firstName} ${author.middleName} ${author.lastName}`}
              />
            </StyledContainer>
          </StyledRoot>
        ))}
      </div>
    </div>
  );
}

export default App;
