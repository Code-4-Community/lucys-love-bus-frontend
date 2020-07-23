import React from 'react';
import { Helmet } from 'react-helmet';

import { Container, Box, Typography } from '@material-ui/core';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>
      <Box my={4}>
        <Typography variant="h3">404 Error: Page not found.</Typography>

        <Typography variant="h4">
          Oops! Sorry, we couldn't find the page you're looking for.
        </Typography>

        <Typography variant="body1">
          Double check your URL, or click on one of the links above to navigate
          to a different page.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
