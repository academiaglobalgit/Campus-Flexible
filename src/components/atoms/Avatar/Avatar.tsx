import * as React from 'react';
import AvatarMui from '@mui/material/Avatar';
import { Badge, styled } from '@mui/material';

import EditPerfil from '../../../assets/IconsCustomize/Edit.svg';

type AvatarProps = {
    alt?: string;
    src?: string;
    width?: number;
    height?: number;
    isEdit?: boolean;
    onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ alt, src, width, height, isEdit, onClick }) => {
  const [error, setError] = React.useState(false);
  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const SmallAvatar = styled(AvatarMui)(() => ({
    width: 22,
    height: 22,
  }));

  return (
    !isEdit 
      ? (
        <AvatarMui
          alt={alt}
          src={src}
          sx={{ width, height }}
          onError={() => setError(true)}
          onClick={() => onClick && onClick()}
        >
          {error && getInitials(alt || '')}
        </AvatarMui>
      ) : (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <SmallAvatar src={EditPerfil} onClick={() => onClick && onClick()} />
          }
        >
          <AvatarMui
            alt={alt}
            src={src}
            sx={{ width, height }}
            onError={() => setError(true)}
          >
            {error && getInitials(alt || '')}
          </AvatarMui>
        </Badge>
      )
  );
}
