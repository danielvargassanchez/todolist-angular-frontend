import { finished } from './finished.enum';

export class Task {
  id: number;
  title: string;
  description: string;
  finished: finished;
}
