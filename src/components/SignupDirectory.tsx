import { Card, Col, Image, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../App';
import { DARK_GREY, ORANGE } from '../utils/colors';
import { participatingFamilySearchQuery } from '../utils/signupFlow';
const { Text, Link } = Typography;

const SignupDirectoryCard = styled(Card)`
  margin: 24px;
  width: 400px;
  height: 424px;
  transition: all 0.2s ease-in-out;
  transform: translateY(3px);

  :hover {
    transform: translateY(0px);
  }
`;

const SignupDirectoryCardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RoundImage = styled(Image)`
  border-radius: 50%;
  width: 160px;
  height: 160px;
  object-fit: cover;

  img {
    border-radius: 50%;
    width: 160px;
    height: 160px;
  }

  margin-bottom: 1em;
`;
const CardTitle = styled(Text)`
  //Size from Figma, using Title will require overriding styles :(
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
`;

const CardText = styled(Text)`
  //Size from Figma, using Title will require overriding styles :(
  font-size: 18px;
  font-weight: 300;
  line-height: 26px;
  text-align: center;
  margin-bottom: 1rem;
`;
const CardTextSmall = styled(Text)`
  //Size from Figma, using Title will require overriding styles :(
  font-size: 14px;
  font-weight: 300;
  line-height: 26px;
  text-align: center;
  margin-bottom: 1rem;
  display: block;
`;

const CardLink = styled(Link)`
  font-weight: 500;
`;
const DirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredTitle = styled(Text)`
  text-align: center;
  color: ${DARK_GREY};
  font-weight: 700;
  font-size: 18px;
`;

const PageTitle = styled(Text)`
  text-align: center;
  font-weight: 800;
  font-size: 30px;
  max-width: 22ch;
  color: ${ORANGE};
  line-height: 36px;
  margin: 8px;
`;

const SignupDirectory: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();

  return (
    <DirectoryContainer>
      <CenteredTitle>SIGN UP</CenteredTitle>
      <PageTitle>Choose an Account Type {'&'} Register Your Family</PageTitle>
      <Row justify="center" align="middle">
        <Col>
          <SignupDirectoryCard
            hoverable
            onClick={() => {
              history.push({
                pathname: Routes.SIGNUP_FORM,
                search: participatingFamilySearchQuery,
              });
            }}
          >
            <SignupDirectoryCardBody>
              <RoundImage
                preview={false}
                src={`https://lucys-love-bus-site-images.s3.us-east-2.amazonaws.com/pf.jpg`}
              />
              <CardTitle>Participating Family</CardTitle>
              <CardText>
                If you have or had a child with a life-threatening illness or
                are an adult referred by TWP or NBCR, register as a
                Participating Family to sign up for programs at any time, free
                of cost.
              </CardText>
            </SignupDirectoryCardBody>
          </SignupDirectoryCard>
        </Col>
        <Col>
          <SignupDirectoryCard
            hoverable
            onClick={() => {
              history.push(Routes.SIGNUP_FORM);
            }}
          >
            <SignupDirectoryCardBody>
              <RoundImage
                preview={false}
                src={`https://lucys-love-bus-site-images.s3.us-east-2.amazonaws.com/gm.jpg`}
              />
              <CardTitle>General Member</CardTitle>
              <CardText>
                General Members may navigate the event calendar and purchase
                tickets once registration is open{' '}
              </CardText>
            </SignupDirectoryCardBody>
          </SignupDirectoryCard>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardTextSmall>
            <CardLink
              href="https://lucyslovebus.org/file_download/inline/78915040-40e5-4b62-899d-6207f83b7635"
              target="_blank"
              underline
            >
              Click here
            </CardLink>{' '}
            for a list of 200+ eligible childhood illnesses or{' '}
            <CardLink href="mailto:jackie@lucyslovebus.org" underline>
              contact us
            </CardLink>{' '}
            with questions about eligibility.
          </CardTextSmall>
        </Col>
      </Row>
    </DirectoryContainer>
  );
};

export default SignupDirectory;
