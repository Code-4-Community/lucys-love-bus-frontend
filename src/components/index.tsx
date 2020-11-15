import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Button } from 'antd';

export const ContentContainer = styled.div`
  display: block;
  padding: 24px;
  max-width: 960px;
  margin: auto;
`;

export const LinkButton = withRouter((props: any) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props;
  return (
    <Button
      type="link"
      {...rest}
      onClick={() => {
        history.push(to);
      }}
    />
  );
});
