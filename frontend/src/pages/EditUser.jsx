
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => api.getUserById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data) => api.updateUser(id, data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      navigate("/users");
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading user data...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-red-500">
          Error loading user: {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <Button onClick={() => navigate("/users")} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
<>

      <DashboardHeader />
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate("/users")} className="mr-4">
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit User: {user?.user}</h1>
      </div>
      {user && (
        <UserForm 
          initialData={user} 
          onSubmit={handleSubmit} 
          isLoading={mutation.isPending} 
        />
      )}
    </div>
    </>
  );
};

export default EditUser;
