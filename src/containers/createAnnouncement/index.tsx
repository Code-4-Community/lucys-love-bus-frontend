import { Alert } from 'antd';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import protectedApiClient from '../../api/protectedApiClient';
import { ContentContainer } from '../../components';
import AnnouncementForm, {
  AnnouncementFormData,
} from '../../components/AnnouncementForm';
import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  AsyncRequestLoading,
  AsyncRequestNotStarted,
} from '../../utils/asyncRequest';

const CreateAnnouncement: React.FC = () => {
  const [createAnnouncementRequest, setCreateAnnouncementRequest] = useState<
    AsyncRequest<void, any>
  >(AsyncRequestNotStarted());

  const params = useParams<{ id?: string }>();

  const submitCreateAnnouncement = async (data: AnnouncementFormData) => {
    try {
      setCreateAnnouncementRequest(AsyncRequestLoading());
      await protectedApiClient.createAnnouncement(
        data,
        params.id ? Number(params.id) : undefined,
      );
      setCreateAnnouncementRequest(AsyncRequestCompleted(undefined));
    } catch (err) {
      setCreateAnnouncementRequest(AsyncRequestFailed(err));
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
        {asyncRequestIsFailed(createAnnouncementRequest) && (
          <Alert
            message="Error"
            description={
              'Announcement creation failed: ' +
              createAnnouncementRequest.error.message
            }
            type="error"
            showIcon
            closable
          />
        )}
        {asyncRequestIsComplete(createAnnouncementRequest) && (
          <Alert
            message={"Announcement Created Successfully"}
            description={params.id && <Link to={`/events/${params.id}`}>View Event Announcements</Link>}
            type="success"
            showIcon
            closable
          />
        )}
        <AnnouncementForm onFinish={submitCreateAnnouncement} />
      </ContentContainer>
    </>
  );
};

export default CreateAnnouncement;
