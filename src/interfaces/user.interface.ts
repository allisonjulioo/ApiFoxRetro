export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  team_id: string;
  // timestamps!
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
