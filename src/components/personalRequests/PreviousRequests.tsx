import Title from 'antd/lib/typography/Title';
import React from 'react';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import { PersonalRequest } from '../../containers/personalRequests/ducks/types';
import { ORANGE } from '../../utils/colors';

export interface PreviousRequestsProps {
    requests: PersonalRequest[]
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const StyledTitle = styled(Title)`
    font-size: 25px !important;
`;

const RequestsContainer = styled.div`
    padding: 30px;
    border: 2px solid black;
    border-radius: 3px;
    width: 50%;
`;

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    text-align: center;
    margin-bottom: 20px;
`;

const GridItem = styled.div`
    font-size: 20px;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const GridItemLeftLabel = styled(GridItem)`
    color: ${ORANGE};
    font-weight: bold;
`;

export const PreviousRequests: React.FC<PreviousRequestsProps> = ({ requests }) => {

    return (
        requests.length > 0 ?
            <Wrapper>
                <RequestsContainer>
                    <StyledTitle>Previous Requests</StyledTitle>
                    {
                        requests.map(request => {
                            return (
                                <StyledGrid>
                                    <GridItemLeftLabel>
                                        Submitted on {dateFormat(request.created, "m/d/yyyy h:MM:ss TT")}
                                    </GridItemLeftLabel>
                                    <GridItem>{<BoldText>Status:</BoldText>} {request.status}</GridItem>
                                </StyledGrid>
                            )
                        })
                    }
                </RequestsContainer>
            </Wrapper> : <></>
    )
}
