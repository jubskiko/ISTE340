import React from 'react';
import { Card, Header, Tab } from 'semantic-ui-react';

const Minor = ({ data }) => {
  return (
    <Tab.Pane>
      <Header as="h2" textAlign="center">Minors</Header>
      <Card.Group>
        {data.map((minor) => (
          <Card key={minor.name}>
            <Card.Content>
              <Card.Header>{minor.title}</Card.Header>
              <Card.Description>{minor.description}</Card.Description>
              <Card.Meta>{minor.note}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Header as="h4">Courses</Header>
              <ul>
                {minor.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Tab.Pane>
  );
};

export default Minor;
