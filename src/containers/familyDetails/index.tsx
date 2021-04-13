import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { ChungusContentContainer } from '../../components';
import ContactInfoSummary from '../../components/ContactInfoSummary';
import { C4CState } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { getContactInfo } from '../setContacts/ducks/thunks';
const { Title } = Typography;

const FamilyDetails: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactInfo());
  }, [dispatch]);

  const contacts = useSelector(
    (state: C4CState) => state.contactsState.contacts,
  );

  return (
    <>
      <Helmet>
        <title>View Family Details</title>
        <meta name="Upcoming Events" content="Upcoming events for LLB." />
      </Helmet>
      <ChungusContentContainer>
        {asyncRequestIsComplete(contacts) && (
          <ContactInfoSummary info={contacts.result} />
        )}
      </ChungusContentContainer>
    </>
  );
};

export default FamilyDetails;
