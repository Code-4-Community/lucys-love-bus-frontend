import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
// onClick is overwritten

interface LinkButtonProps {
  to: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ to, ...rest }) => {
  const history = useHistory();

  return (
    <Button
      {...rest}
      onClick={() => {
        history.push(to);
      }}
    />
  );
};
