import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardHeader from "@/components/DashboardHeader";
import { Avatar } from "@/components/ui/avatar";
import { UserRoundCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
  });

  // Get the newest 10 users (assuming the latest are at the end of the array)
  const latestUsers = [...users]
    .sort((a, b) => parseInt(b.id || "0") - parseInt(a.id || "0"))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50  mb-12" >
      <DashboardHeader />

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>
                Current number of users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  users.length || 0
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Newest Users</CardTitle>
              <CardDescription>
                Latest registered users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center">
                  <span className="animate-pulse">Loading...</span>
                </div>
              ) : latestUsers.length > 0 ? (
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8 bg-primary">
                    <UserRoundCheck className="h-4 w-4 text-white" />
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{latestUsers[0].user}</p>
                    <p className="text-xs text-muted-foreground">
                      {latestUsers[0].email}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No users found</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common user management tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/users/new")}
                className="justify-start"
              >
                Add New User
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/users")}
                className="justify-start"
              >
                View All Users
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Latest Users</CardTitle>
            <CardDescription>
              Most recently added users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-6">
                <span className="animate-pulse">Loading users...</span>
              </div>
            ) : latestUsers.length > 0 ? (
              <>
                <div className="space-y-4">
                  {latestUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between border-b mb-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10 bg-secondary mt-1 flex justify-center ">
                          <span className="text-xs font-semibold flex items-center">
                            {user.user.substring(0, 2).toUpperCase()}
                          </span>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="bg-secondary px-2 py-1 rounded-md text-xs">
                          {user.interest.length} interests
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex justify-center ">
                  <Button onClick={() => navigate("/users")}>
                    View All Users
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <p>No users found in the system.</p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/users/new")}
                  className="mt-4"
                >
                  Add Your First User
                </Button>
              </div>
            )}
          </CardContent>




        </Card>
      </div>
    </div>
  );
};

export default Index;
