import React from 'react';
import { Helmet } from 'react-helmet';
import PFRequestsTable from '../../components/PFRequestsTable';

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
      <PFRequestsTable />
    </>
  );
};

export default ViewRequests;
