
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users } from "lucide-react";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-auto mr-4">
              <svg 
                width="160" 
                height="40" 
                viewBox="0 0 160 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto"
              >
                <rect width="40" height="40" rx="8" fill="#0078D4" />
                <path d="M8 8H32V32H8V8Z" fill="white" />
                <path d="M14 14H26V26H14V14Z" fill="#0078D4" />
                <text x="46" y="25" fontFamily="Arial" fontSize="15" fontWeight="bold" fill="#333">
                  Suzuki Digital
                </text>
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              className="text-gray-700"
              onClick={() => navigate("/")}
            >
              <LayoutDashboard className="h-5 w-5 mr-1" /> Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700"
              onClick={() => navigate("/users")}
            >
              <Users className="h-5 w-5 mr-1" /> Users
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
