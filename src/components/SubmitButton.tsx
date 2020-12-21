import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'antd';

export const SubmitButton = withRouter((props: any) => {
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
      type="submit"
      {...rest}
      onClick={() => {
        history.push(to);
      }}
    />
  );
});
