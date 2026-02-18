import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { UsersList } from './UsersList';
import { CreateUserModal } from '@/features/user/ui/CreateUserModal';
import { EditUserModal } from '@/features/user/ui/EditUserModal';
import type { User } from '@/shared/types/user';
import styled from 'styled-components';

const Layout = styled.div`
  min-height: 100vh;
  background: #fff;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

const CreateButton = styled(Button)`
  margin-top: 16px;
`;

export const UsersPageLayout: React.FC = () => {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login', { replace: true });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingUser(null);
  };

  return (
    <Layout>
      <Header>
        <Button type="primary" onClick={handleLogout}>
          Выход
        </Button>
      </Header>
      <UsersList onEdit={handleEdit} />
      <CreateButton type="primary" onClick={() => setCreateModalOpen(true)}>
        Создать пользователя
      </CreateButton>
      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <EditUserModal
        open={editModalOpen}
        user={editingUser}
        onClose={closeEditModal}
      />
    </Layout>
  );
};
