import { useGeneratePlan } from "../hooks/useGeneratePlan";
import type { WorkoutDay } from "../types";

const GeneratePlanForm = () => {
  const { mutate, isPending, error, data, reset } = useGeneratePlan();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    reset(); // Reset previous state before generating a new plan
    mutate({
      goal: formData.get("goal") as string,
      level: formData.get("level") as string,
      days: parseInt(formData.get("days") as string, 10),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isPending}>
          <p>Goal:</p>
          <input type="text" name="goal" defaultValue="muscle gain" />
          <p>Level:</p>
          <select name="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <p>Days:</p>
          <input type="number" name="days" defaultValue={3} />
          <button type="submit" disabled={isPending}>
            {isPending ? "Generating..." : "Generate Plan"}
          </button>
        </fieldset>
      </form>
      {isPending && <p>Generating...</p>}
      {error && <p>{(error as Error).message}</p>}
      {data && (
        <div>
          <h2>{data.planJson.title}</h2>

          {data.planJson.days.map((day: WorkoutDay) => (
            <div key={day.day}>
              <h3>
                Day {day.day} - {day.focus}
              </h3>

              <ul>
                {day.exercises.map((ex) => (
                  <li key={ex.name}>
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
