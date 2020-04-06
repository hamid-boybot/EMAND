export interface JwtPayload {
  username: string;
  id_user: number;
  roles: [string];
}
