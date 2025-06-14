import * as React from 'react';
import AvatarMui from '@mui/material/Avatar';

type AvatarProps = {
    alt?: string;
    src?: string;
    width?: number;
    height?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ alt, src, width, height }) => {
  const [error, setError] = React.useState(false);
  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
      <AvatarMui
        alt={alt}
        src={src}
        sx={{ width, height }}
        onError={() => setError(true)}
      >
        {error && getInitials(alt || '')}
      </AvatarMui>
  );
}
