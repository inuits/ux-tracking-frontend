export interface Action {
  id: string;
  client: String;
  session: String;
  method: String;
  type: String;
  value: String;
  path: String;
  target: String;
  timestamp: number;
}
