interface PlanItemProps {
  plan: { planJson: { title: string }; createdAt: string };
  isSelected: boolean;
  onClick: () => void;
}

const PlanItem = ({ plan, isSelected, onClick }: PlanItemProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: isSelected ? "2px solid blue" : "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <h3>{plan.planJson.title}</h3>
      <p>{new Date(plan.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PlanItem;
