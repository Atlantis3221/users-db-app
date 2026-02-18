import React from 'react';
import { Avatar } from 'antd';
import type { User } from '@/shared/types/user';

interface UserAvatarProps {
  user: User;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 48 }) => {
  const src = user.avatar?.trim() || undefined;
  const fallback = user.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <Avatar src={src} size={size}>
      {fallback}
    </Avatar>
  );
};
