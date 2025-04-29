import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, UserData } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import UserCard from "@/components/UserCard";
import { Search, Plus, FilePenLine, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardHeader from "@/components/DashboardHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const UsersList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error instanceof Error ? error.message : "Unknown error"}`);
    },
  });

  const filteredUsers = users.filter((user) =>
    user.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          Error loading users: {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["users"] })} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Users Management</h1>
          <Button onClick={() => navigate("/users/new")} size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-100 animate-pulse rounded-md" />
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          isMobile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={(user) => navigate(`/users/edit/${user.id}`)}
                  onDelete={handleDeleteUser}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Interests</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.user}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>{user.mobile}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.interest.map((interest, index) => (
                            <Badge key={`${user.id}-${index}`} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/users/edit/${user.id}`)}
                          >
                            <FilePenLine className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id as string)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              {searchTerm ? "No users match your search" : "No users found. Add your first user!"}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
