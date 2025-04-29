
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/UserCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { UsersIcon, PlusCircle, Search, X } from "lucide-react";

const UsersList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setUserToDelete(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.user.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
    navigate(`/users/edit/${user._id}`);
  };

  const confirmDeleteUser = (user) => {
    console.log("Confirming delete for user:", user);
    setUserToDelete(user);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      const userId = userToDelete._id || userToDelete.id;
      console.log("Deleting user with ID:", userId);
      if (userId) {
        deleteMutation.mutate(userId);
      } else {
        console.error("No valid ID found for user:", userToDelete);
        toast.error("Failed to delete user: No valid ID found");
        setUserToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const renderUserTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Interests</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              No users found
            </TableCell>
          </TableRow>
        ) : (
          filteredUsers.map((user) => (
            <TableRow key={user._id || user.id}>
              <TableCell className="font-medium">{user.user}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {user.interest.map((interest, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
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
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => confirmDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  const renderUserCards = () => (
    <div className="grid grid-cols-1 gap-4">
      {filteredUsers.length === 0 ? (
        <div className="text-center py-8">No users found</div>
      ) : (
        filteredUsers.map((user) => (
          <UserCard
            key={user._id || user.id}
            user={user}
            onEdit={handleEditUser}
            onDelete={confirmDeleteUser}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
              <UsersIcon className="h-6 w-6 md:h-7 md:w-7 mr-2 text-primary" />
              Users Management
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage all system users in one place
            </p>
          </div>
          <Button onClick={() => navigate("/users/new")}>
            <PlusCircle className="h-4 w-4 mr-1" /> Add New User
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-4 border-b border-gray-200 flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="p-4">
            {isLoading ? (
              <div className="text-center py-8">Loading users...</div>
            ) : isMobile ? (
              renderUserCards()
            ) : (
              renderUserTable()
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={!!userToDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the user "{userToDelete?.user}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersList;
