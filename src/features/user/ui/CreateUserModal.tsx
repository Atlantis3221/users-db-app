import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useCreateUserMutation } from '@/entities/user/model/queries';
import type { CreateUserDto } from '@/shared/types/user';
import styled from 'styled-components';

const FormWrapper = styled.div`
  .ant-form-item {
    margin-bottom: 12px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm<CreateUserDto>();
  const createMutation = useCreateUserMutation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await createMutation.mutateAsync(values);
      form.resetFields();
      onClose();
      onSuccess?.();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      width={480}
    >
      <FormWrapper>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Создать
            </Button>
            <Button type="primary" onClick={handleCancel}>Отмена</Button>
          </Footer>
        </Form.Item>
      </Form>
        </FormWrapper>
    </Modal>
  );
};
