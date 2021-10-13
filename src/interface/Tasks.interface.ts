interface Tasks {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'working' | 'finished' | 'created';
}

export default Tasks
