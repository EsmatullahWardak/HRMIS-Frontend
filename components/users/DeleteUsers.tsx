import { Button } from "@/components/ui/button";

interface DeleteUsersProps {
  userId: number;
  onDeleteUser: (userId: number) => void;
}

export default function DeleteUsers({ userId, onDeleteUser }: DeleteUsersProps) {
  return (
    <Button 
      onClick={() => onDeleteUser(userId)}
      variant="destructive"
      size="sm"
    >
      Delete
    </Button>
  );
}
