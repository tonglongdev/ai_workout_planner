import { usePlans } from "../hooks/usePlans";
import type { Plan } from "../types";

const PlanList = () => {
  const { data, isLoading, error } = usePlans();

  if (isLoading) return <p>Loading plans...</p>;
  if (error) return <p>Error loading plans</p>;

  return (
    <div>
      <h2>Your Plans</h2>

      {data?.plans.map((plan: Plan) => (
        <div key={plan.id}>
          <h3>{plan.planJson.title}</h3>
          <p>{new Date(plan.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanList;
