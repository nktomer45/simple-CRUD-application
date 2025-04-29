
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserData } from "@/services/api";

// Define validation schema using zod
const userSchema = z.object({
  user: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce.number()
    .int("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age cannot exceed 120"),
  mobile: z.coerce.number()
    .int("Mobile number must be a whole number")
    .positive("Mobile number must be positive"),
  interest: z.array(z.string()).min(1, "At least one interest is required"),
});

interface UserFormProps {
  initialData?: UserData;
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const defaultValues = {
  user: "",
  email: "",
  age: 18,
  mobile: 0,
  interest: [""],
};

const UserForm = ({ initialData, onSubmit, isLoading }: UserFormProps) => {
  const [interests, setInterests] = useState<string[]>(
    initialData?.interest || [""]
  );

  const form = useForm<UserData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || defaultValues,
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setInterests(initialData.interest);
    }
  }, [initialData, form]);

  const handleInterestChange = (index: number, value: string) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
    form.setValue("interest", updatedInterests.filter(Boolean), { 
      shouldValidate: true 
    });
  };

  const addInterestField = () => {
    setInterests([...interests, ""]);
  };

  const removeInterestField = (index: number) => {
    if (interests.length > 1) {
      const updatedInterests = [...interests];
      updatedInterests.splice(index, 1);
      setInterests(updatedInterests);
      form.setValue("interest", updatedInterests.filter(Boolean), {
        shouldValidate: true
      });
    } else {
      toast.error("At least one interest field is required");
    }
  };

  const handleSubmit = (data: UserData) => {
    // Make sure to include the filtered interests
    data.interest = interests.filter(Boolean);
    if (data.interest.length === 0) {
      toast.error("At least one interest is required");
      return;
    }
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="example@mail.com" 
                  type="email" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1} 
                    max={120} 
                    {...field} 
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Interests</Label>
          {interests.map((interest, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                placeholder={`Interest ${index + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeInterestField(index)}
                disabled={interests.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          {form.formState.errors.interest && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.interest.message}
            </p>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={addInterestField}
            className="w-full mt-2"
          >
            Add Interest
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update User" : "Create User"}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
