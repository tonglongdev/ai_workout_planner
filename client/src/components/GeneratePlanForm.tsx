import { useGeneratePlan } from "../hooks/useGeneratePlan";
import type { WorkoutDay } from "../types";

const GeneratePlanForm = () => {
  const { mutate, isPending, error, data } = useGeneratePlan();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formData: { goal: string; level: string; days: number },
  ) => {
    e.preventDefault();
    console.log(formData);
    mutate({
      goal: formData.goal,
      level: formData.level,
      days: formData.days,
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(e, {
            goal: formData.get("goal") as string,
            level: formData.get("level") as string,
            days: parseInt(formData.get("days") as string, 10),
          });
        }}
      >
        <p>Goal:</p>
        <input type="text" name="goal" />
        <p>Level:</p>
        <select name="level">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <p>Days:</p>
        <input type="number" name="days" />
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
