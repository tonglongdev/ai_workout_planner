import type { Plan } from "../types";

const PlanDetail = ({ plan }: { plan: Plan }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{plan.planJson.title}</h2>

      {plan.planJson.days.map((day) => (
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
  );
};

export default PlanDetail;
