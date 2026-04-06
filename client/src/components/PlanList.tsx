import { useEffect, useRef, useState } from "react";
import { usePlans } from "../hooks/usePlans";
import type { Plan } from "../types";
import PlanDetail from "./PlanDetail";
import PlanItem from "./PlanItem";

const PlanList = () => {
  const { data, isLoading, error } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPlan) {
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPlan]);

  if (isLoading) return <p>Loading plans...</p>;
  if (error) return <p>Error loading plans</p>;
  if (!data?.plans.length) return <p>No plans yet</p>;

  return (
    <div>
      <h2>Your Plans</h2>

      {data?.plans.map((plan: Plan) => (
        <PlanItem
          key={plan.id}
          plan={plan}
          isSelected={selectedPlan?.id === plan.id}
          onClick={() =>
            setSelectedPlan((prev) => (prev?.id === plan.id ? null : plan))
          }
        />
      ))}
      <div ref={detailRef}>
        {selectedPlan ? (
          <PlanDetail plan={selectedPlan} />
        ) : (
          <p>Select a plan to view details</p>
        )}
      </div>
    </div>
  );
};

export default PlanList;
