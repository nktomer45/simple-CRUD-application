
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const UserForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    age: "",
    mobile: "",
    interest: []
  });
  
  const [currentInterest, setCurrentInterest] = useState("");
  const [errors, setErrors] = useState({});

  // Initialize form with data if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        user: initialData.user || "",
        email: initialData.email || "",
        age: initialData.age ? initialData.age.toString() : "",
        mobile: initialData.mobile ? initialData.mobile.toString() : "",
        interest: [...(initialData.interest || [])]
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.user.trim()) {
      newErrors.user = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = "Please enter a valid age";
    }
    
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (isNaN(formData.mobile) || formData.mobile.toString().length < 10) {
      newErrors.mobile = "Please enter a valid mobile number";
    }
    
    if (formData.interest.length === 0) {
      newErrors.interest = "At least one interest is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const addInterest = () => {
    if (!currentInterest.trim()) return;
    
    if (formData.interest.includes(currentInterest.trim())) {
      toast.error("This interest is already added");
      return;
    }
    
    setFormData({
      ...formData,
      interest: [...formData.interest, currentInterest.trim()]
    });
    setCurrentInterest("");
    
    // Clear interest error if it exists
    if (errors.interest) {
      setErrors({
        ...errors,
        interest: undefined
      });
    }
  };

  const removeInterest = (index) => {
    const updatedInterests = [...formData.interest];
    updatedInterests.splice(index, 1);
    setFormData({
      ...formData,
      interest: updatedInterests
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        age: Number(formData.age),
        mobile: Number(formData.mobile),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="user">Name</Label>
          <Input
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className={errors.user ? "border-red-500" : ""}
          />
          {errors.user && <p className="text-red-500 text-sm mt-1">{errors.user}</p>}
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? "border-red-500" : ""}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
          
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? "border-red-500" : ""}
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="interest">Interests</Label>
          <div className="flex">
            <Input
              id="interest"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add an interest and press Enter"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={addInterest} 
              className="ml-2"
              disabled={!currentInterest.trim()}
            >
              Add
            </Button>
          </div>
          {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest}</p>}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.interest.map((item, index) => (
              <Badge key={index} variant="secondary" className="pl-2">
                {item}
                <button
                  type="button"
                  onClick={() => removeInterest(index)}
                  className="ml-1 hover:text-red-500 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 ml-7">
        <Button type="submit" disabled={isLoading} className='mr-4'>
          {isLoading ? "Saving..." : initialData ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
