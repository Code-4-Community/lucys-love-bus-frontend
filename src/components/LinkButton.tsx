import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { BaseButtonProps } from 'antd/lib/button/button';
// onClick is overwritten

interface LinkButtonProps extends BaseButtonProps {
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
