import React from 'react';
import { List, Spin } from 'antd';
import dayjs from 'dayjs';
import { useUsersQuery } from '@/entities/user/model/queries';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import type { User } from '@/shared/types/user';
import styled from 'styled-components';

const ListItem = styled(List.Item)`
  align-items: center;
  .ant-list-item-meta-avatar {
    margin-right: 16px;
  }
  .ant-list-item-meta-title {
    margin-bottom: 4px;
  }
  .ant-list-item-meta-description {
    font-size: 12px;
    color: #888;
  }
`;

interface UsersListProps {
  onEdit: (user: User) => void;
}

export const UsersList: React.FC<UsersListProps> = ({ onEdit }) => {
  const { data: users, isLoading, error } = useUsersQuery();

  if (error) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#ff4d4f' }}>
        Ошибка загрузки
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={users ?? []}
      renderItem={(user) => (
        <ListItem
          onClick={() => onEdit(user)}
          style={{ cursor: 'pointer' }}
        >
          <List.Item.Meta
            avatar={<UserAvatar user={user} />}
            title={user.name}
            description={
              user.createdAt
                ? `Зарегистрирован ${dayjs(user.createdAt).format('DD.MM.YYYY')}`
                : '—'
            }
          />
        </ListItem>
      )}
    />
  );
};
