import { Alert, Button, Typography } from 'antd';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import protectedApiClient from '../../api/protectedApiClient';
import { ContentContainer } from '../../components';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';

const { Title } = Typography;

const DeleteAnnouncement: React.FC = () => {
  const [deleteAnnouncementRequest, setDeleteAnnouncementRequest] = useState<
    AsyncRequest<void, any>
  >(AsyncRequestNotStarted());

  const id = Number(useParams<{ id: string }>().id);

  const submitDeleteAnnouncement = async () => {
    try {
      setDeleteAnnouncementRequest(AsyncRequestLoading());
      await protectedApiClient.deleteAnnouncement(id);
      setDeleteAnnouncementRequest(AsyncRequestCompleted(undefined));
    } catch (err) {
      setDeleteAnnouncementRequest(AsyncRequestFailed(err));
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Announcement</title>
        <meta
          name="description"
          content="Create an announcement for Lucy's Love Bus Events."
        />
      </Helmet>
      <ContentContainer>
        {asyncRequestIsFailed(deleteAnnouncementRequest) && (
          <Alert
            message="Error"
            description={
              'Announcement creation failed: ' +
              deleteAnnouncementRequest.error.message
            }
            type="error"
            showIcon
          />
        )}

        {asyncRequestIsComplete(deleteAnnouncementRequest) && (
          <Alert
            message="Announcement Deleted Successfully"
            type="success"
            showIcon
          />
        )}

        <Title level={1}>Delete Announcement {id}</Title>
        <Title level={3}>
          Warning: This action is permanent and cannot be undone
        </Title>
        <Button
          disabled={
            asyncRequestIsLoading(deleteAnnouncementRequest) ||
            asyncRequestIsComplete(deleteAnnouncementRequest)
          }
          size="large"
          type="ghost"
          danger
          onClick={submitDeleteAnnouncement}
        >
          Permanently Delete Announcement
        </Button>
      </ContentContainer>
    </>
  );
};

export default DeleteAnnouncement;
