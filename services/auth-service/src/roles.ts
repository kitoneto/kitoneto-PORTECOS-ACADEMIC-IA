export type UserRole = 'student' | 'instructor' | 'admin';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  student: [
    'courses:read',
    'lessons:read',
    'progress:read',
    'progress:write',
    'profile:read',
    'profile:write',
  ],
  instructor: [
    'courses:read',
    'courses:write',
    'lessons:read',
    'lessons:write',
    'progress:read',
    'profile:read',
    'profile:write',
  ],
  admin: ['*'], // Full access
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes('*') || permissions.includes(permission);
}
