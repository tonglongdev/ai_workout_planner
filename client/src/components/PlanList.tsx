import { usePlans } from "../hooks/usePlans";
import type { Plan } from "../types";

const PlanList = () => {
  const { data, isLoading, error } = usePlans();

  if (isLoading) return <p>Loading plans...</p>;
  if (error) return <p>Error loading plans</p>;
  if (!data?.plans.length) return <p>No plans yet</p>;

  return (
    <div>
      <h2>Your Plans</h2>

      {data?.plans.map((plan: Plan) => (
        <div
          key={plan.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <h3>{plan.planJson.title}</h3>
          <p>{new Date(plan.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanList;
