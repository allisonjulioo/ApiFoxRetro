export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  teams_ids: string;
  // timestamps!
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
