
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";

const AddUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <DashboardHeader />
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Add New User</h1>
      </div>
      <UserForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
    </div>
    </>
  );
};

export default AddUser;
