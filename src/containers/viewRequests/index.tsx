import React from 'react';
import { Helmet } from 'react-helmet';
import PFRequestsTable from '../../components/PFRequestsTable';
import { ChungusContentContainer } from '../../components';

const ViewRequests = () => {
  return (
    <>
      <Helmet>
        <title>View Family Details</title>
        <meta
          name="description"
          content="View all pending participating family requests and current registered families"
        />
      </Helmet>
      <ChungusContentContainer>
        <PFRequestsTable />
      </ChungusContentContainer>
    </>
  );
};

export default ViewRequests;
