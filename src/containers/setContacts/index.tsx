import { Alert, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Routes } from '../../App';
import ContactsForm from '../../components/ContactsForm';
import { C4CState } from '../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
} from '../../utils/asyncRequest';
import { encodeProfileFieldFile } from '../../utils/fileEncoding';
import {
  participatingFamilySearchQuery,
  participatingFamilySearchQueryFlag,
} from '../../utils/signupFlow';
import { getContactInfo, setContactInfo } from './ducks/thunks';
import {
  AdditionalContact,
  Child,
  ContactFormFields,
  ContactInfo,
  ContactsReducerState,
} from './ducks/types';

interface SetContactsProps {
  readonly contacts: ContactsReducerState['contacts'];
  readonly setContacts: ContactsReducerState['setContacts'];
}

const SetContacts: React.FC<SetContactsProps> = ({ contacts, setContacts }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    dispatch(getContactInfo());
  }, [dispatch]);
  const registeringAsParticipatingFamily =
    new URLSearchParams(location.search).get(
      participatingFamilySearchQueryFlag,
    ) != null;

  if (asyncRequestIsComplete(setContacts) && registeringAsParticipatingFamily) {
    // TODO: Make PF Request, not implemented as to not duplicate work from the PF Requests ticket
    history.push({
      pathname: Routes.SIGNUP_CONFIRMATION,
      search: participatingFamilySearchQuery,
    });
  }

  function selectProfilePictureOrDefaultToUndefined(
    i: number,
    arr: Child[] | AdditionalContact[],
  ): string | undefined {
    if (asyncRequestIsComplete(contacts) && i < arr.length) {
      return arr[i].profilePicture;
    } else {
      return undefined;
    }
  }

  const onFinish = async (values: ContactFormFields) => {
    if (!asyncRequestIsComplete(contacts)) {
      throw new Error(
        'Setting Form values requires knowing current contact information',
      );
    }

    dispatch(
      setContactInfo({
        mainContact: {
          email: contacts.result.mainContact.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values.dateOfBirth.toDate(),
          pronouns: values.pronouns || contacts.result.mainContact.pronouns,
          allergies: values.allergies || contacts.result.mainContact.allergies,
          diagnosis: values.diagnosis || contacts.result.mainContact.diagnosis,
          medications:
            values.medications || contacts.result.mainContact.medications,
          notes: values.notes || contacts.result.mainContact.notes,
          photoRelease: contacts.result.mainContact.photoRelease,
          referrer: contacts.result.mainContact.referrer,
          profilePicture: values.profilePicture
            ? await encodeProfileFieldFile(values.profilePicture)
            : contacts.result.mainContact.profilePicture,
        },
        additionalContacts: values.additionalContacts
          ? await Promise.all(
              values.additionalContacts.map(async (c, i) => ({
                ...c,
                dateOfBirth: c.dateOfBirth.toDate(),
                profilePicture: c.profilePicture
                  ? await encodeProfileFieldFile(c.profilePicture)
                  : selectProfilePictureOrDefaultToUndefined(
                      i,
                      contacts.result.additionalContacts,
                    ),
              })),
            )
          : [],
        children: values.children
          ? await Promise.all(
              values.children.map(async (c, i) => ({
                ...c,
                dateOfBirth: c.dateOfBirth.toDate(),
                profilePicture: c.profilePicture
                  ? await encodeProfileFieldFile(c.profilePicture)
                  : selectProfilePictureOrDefaultToUndefined(
                      i,
                      contacts.result.children,
                    ),
              })),
            )
          : [],
        location: {
          address: values.address,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
        },
      }),
    );
  };

  const contactsToFormFields = (info: ContactInfo): ContactFormFields => {
    return {
      ...info.location,
      ...info.mainContact,
      dateOfBirth: moment(new Date()),
      profilePicture: undefined,
      additionalContacts:
        info.additionalContacts &&
        info.additionalContacts.map((c) => ({
          ...c,
          dateOfBirth: moment(new Date()),
          profilePicture: undefined,
        })),
      children:
        info.children &&
        info.children.map((c) => ({
          ...c,
          dateOfBirth: moment(new Date()),
          profilePicture: undefined,
        })),
    };
  };

  return (
    <>
      {asyncRequestIsFailed(setContacts) ? (
        <Alert
          type="error"
          message="Error"
          description={`${setContacts.error.message}. Please reload the page and try again.`}
          showIcon
          closable
        />
      ) : (
        asyncRequestIsComplete(setContacts) && (
          <Alert
            type="success"
            message="Success"
            description={'Contact Info Updated Successfully'}
            showIcon
            closable
          />
        )
      )}
      {asyncRequestIsComplete(contacts) ? (
        <ContactsForm
          initialValues={contactsToFormFields(contacts.result)}
          onFinish={onFinish}
          isParticipatingFamily={registeringAsParticipatingFamily}
        />
      ) : (
        <Spin />
      )}
    </>
  );
};

const mapStateToProps = (state: C4CState): SetContactsProps => {
  return {
    contacts: state.contactsState.contacts,
    setContacts: state.contactsState.setContacts,
  };
};

export default connect(mapStateToProps)(SetContacts);
