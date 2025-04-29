
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddUserButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/users/new")}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 p-0"
      size="icon"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add new user</span>
    </Button>
  );
};

export default AddUserButton;
