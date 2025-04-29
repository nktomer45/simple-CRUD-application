
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/services/api";

interface UserCardProps {
  user: UserData;
  onEdit: (user: UserData) => void;
  onDelete: (id: string) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.user}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Age:</span> {user.age}
          </div>
          <div>
            <span className="font-medium">Mobile:</span> {user.mobile}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Interests:</p>
          <div className="flex flex-wrap gap-2">
            {user.interest.map((interest, index) => (
              <Badge key={index} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onEdit(user)}>
          Edit
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => onDelete(user.id as string)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
