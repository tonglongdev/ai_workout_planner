import GeneratePlanForm from "../components/GeneratePlanForm";
import LogoutButton from "../components/LogoutButton";
import PlanList from "../components/PlanList";
import { useCurrentUser } from "../hooks/useCurrentUser";

const HomePage = () => {
  const { data, isLoading } = useCurrentUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div>Hello {data?.user.email}</div>
      <LogoutButton />
      <GeneratePlanForm />
      <PlanList />
    </>
  );
};

export default HomePage;
