import { api } from '@/shared/api/base';
import { MOCKAPI_USERS_ENDPOINT } from '@/shared/config/mockapi';
import type { User, CreateUserDto, UpdateUserDto } from '@/shared/types/user';

export const usersApi = {
  getList: () => api.get<User[]>(MOCKAPI_USERS_ENDPOINT),

  getById: (id: string) => api.get<User>(`${MOCKAPI_USERS_ENDPOINT}/${id}`),

  create: (data: CreateUserDto) =>
    api.post<User>(MOCKAPI_USERS_ENDPOINT, data),

  update: (id: string, data: UpdateUserDto) =>
    api.put<User>(`${MOCKAPI_USERS_ENDPOINT}/${id}`, data),

  delete: (id: string) =>
    api.delete<void>(`${MOCKAPI_USERS_ENDPOINT}/${id}`),
};
