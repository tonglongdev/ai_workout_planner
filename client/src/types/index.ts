export interface WorkoutDay {
  day: number;
  focus: string;
  exercises: [
    {
      name: string;
      sets: number;
      reps: string;
    },
  ];
}
