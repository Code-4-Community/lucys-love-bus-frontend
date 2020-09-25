import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Paper } from '@material-ui/core';

/*
Template for future page components.
Use MUI's CSS-in-JS makeStyles() as shown below for more complex CSS/
Otherwise, use <Box> components where possible for inline styling.
Every page must have a Helmet tag for SEO purposes.
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    example: {
      color: 'red',
    },
  })
);

const Template: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Write Title Here</title>
        <meta name="description" content="Write a description for SEO here" />
      </Helmet>
      <Box my={4}>
        <Paper className={classes.example} />
      </Box>
    </Container>
  );
};

export default Template;
