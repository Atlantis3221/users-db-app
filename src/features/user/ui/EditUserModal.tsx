import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useUpdateUserMutation, useDeleteUserMutation } from '@/entities/user/model/queries';
import type { User, UpdateUserDto } from '@/shared/types/user';
import styled from 'styled-components';

const FormWrapper = styled.div`
  .ant-form-item {
    margin-bottom: 12px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex; 
  gap: 8px;
`

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  user,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm<UpdateUserDto & { id: string }>();
  const updateMutation = useUpdateUserMutation();
  const deleteMutation = useDeleteUserMutation();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [open, user, form]);

  const handleSave = async () => {
    if (!user) return;
    try {
      const values = await form.validateFields();
      setLoading(true);
      await updateMutation.mutateAsync({
        id: user.id,
        dto: { name: values.name, avatar: values.avatar },
      });
      onClose();
      onSuccess?.();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    try {
      setDeleting(true);
      await deleteMutation.mutateAsync(user.id);
      onClose();
      onSuccess?.();
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Редактирование пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      width={480}
    >
      <FormWrapper>
        <Form form={form} layout="vertical">
        <Form.Item name="id" label="id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Ссылка на аватарку"
          rules={[{ required: true, message: 'Введите ссылку на аватарку' }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item>
          <Footer>
            <Button type="primary" onClick={handleDelete} loading={deleting}>
              Удалить
            </Button>
            <ButtonGroup>
              <Button type="primary" onClick={handleSave} loading={loading}>
                Сохранить
              </Button>
              <Button type="primary" onClick={handleCancel}>Отмена</Button>
            </ButtonGroup>
          </Footer>
        </Form.Item>
      </Form>
        </FormWrapper>
    </Modal>
  );
};
