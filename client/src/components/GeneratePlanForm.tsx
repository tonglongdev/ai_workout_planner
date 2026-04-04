import { useGeneratePlan } from "../hooks/useGeneratePlan";
import type { WorkoutDay } from "../types";

const GeneratePlanForm = () => {
  const { mutate, isPending, error, data } = useGeneratePlan();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      goal: "muscle gain",
      level: "beginner",
      days: 3,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={isPending}>
          {isPending ? "Generating..." : "Generate Plan"}
        </button>

        {error && <p>Error generating plan</p>}
      </form>
      {data && (
        <div>
          <h2>{data.planJson.title}</h2>

          {data.planJson.days.map((day: WorkoutDay) => (
            <div key={day.day}>
              <h3>
                Day {day.day} - {day.focus}
              </h3>

              <ul>
                {day.exercises.map((ex, idx) => (
                  <li key={idx}>
                    {ex.name} - {ex.sets} sets - {ex.reps}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GeneratePlanForm;
