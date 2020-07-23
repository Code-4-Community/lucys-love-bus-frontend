import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  paper: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    height: '4em',
    width: '16em',
    padding: '1em',
    color: 'white',
  },
});

const ExamplePage: React.FC = () => {
  const classes = useStyles();
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
          <Paper className={classes.paper}>
            <Typography variant="body1">
              This is on a piece of paper.
            </Typography>
            <Typography variant="body1">
              And its styled with MUI's CSS-in-JS!
            </Typography>
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
