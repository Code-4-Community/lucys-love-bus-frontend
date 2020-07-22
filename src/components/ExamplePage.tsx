import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';

const ExamplePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Examples</title>
        <meta name="description" content="Description for the Example page" />
      </Helmet>
      <Box my={4}>
        <Typography variant="h1">Hey, this is example text size h1.</Typography>
        <Typography variant="h2">Hey, this is example text size h2.</Typography>
        <Typography variant="h3">Hey, this is example text size h3.</Typography>
        <Typography variant="h4">Hey, this is example text size h4.</Typography>
        <Typography variant="h5">Hey, this is example text size h5.</Typography>
        <Typography variant="h6">Hey, this is example text size h6.</Typography>
        <Typography variant="body1">
          Hey, this is example text size body1.
        </Typography>
        <Typography variant="body2">
          Hey, this is example text size body2.
        </Typography>

        <Box my={2}>
          <Paper>
            <Box padding={2}>
              <Typography variant="body1">
                This is on a piece of paper.
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box my={2}>
          <Card>
            <CardContent>
              <Typography variant="body2" gutterBottom>
                This is the content of a card.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Card Button</Button>
            </CardActions>
          </Card>
        </Box>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </Box>
    </Container>
  );
};

export default ExamplePage;
