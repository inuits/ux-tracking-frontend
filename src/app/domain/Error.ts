export interface Error {
  id: string;
  client: string;
  session: string;
  error: string;
  position: string;
  source: string;
  stack: string;
  timestamp: number;
}
