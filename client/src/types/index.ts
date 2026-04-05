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

export interface Plan {
  id: string;
  planJson: {
    title: string;
    days: WorkoutDay[];
  };
  createdAt: string;
}

export interface PlansResponse {
  plans: Plan[];
}
