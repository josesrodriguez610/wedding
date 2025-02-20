import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import RSVPEdit from "./component/RSVPEdit";

const Dashboard = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <div className="roboto-font bg-gray-100 p-4 text-left">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session.user?.email}</p>
      </div>
      <RSVPEdit />
      {/* <SignOut /> */}
    </>
  );
};

export default Dashboard;
