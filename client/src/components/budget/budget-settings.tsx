import { useState } from "react";
import { Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "@/hooks/use-budget";
import { useToast } from "@/hooks/use-toast";
import { type User } from "@shared/schema";

interface BudgetSettingsProps {
  user: User;
}

export default function BudgetSettings({ user }: BudgetSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [budgetValue, setBudgetValue] = useState(user.budget || "100.00");
  const { updateBudget, isUpdating } = useBudget();
  const { toast } = useToast();

  const handleSave = () => {
    const numValue = parseFloat(budgetValue);
    if (isNaN(numValue) || numValue < 0) {
      toast({
        title: "Invalid Budget",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    updateBudget(budgetValue, {
      onSuccess: () => {
        setIsEditing(false);
        toast({
          title: "Budget Updated",
          description: "Your monthly budget has been updated successfully",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update budget. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const handleCancel = () => {
    setBudgetValue(user.budget || "100.00");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Budget Settings</span>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Monthly Budget
          </label>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={budgetValue}
                  onChange={(e) => setBudgetValue(e.target.value)}
                  className="pl-8"
                  placeholder="Enter your monthly budget"
                />
              </div>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-eco-green hover:bg-green-600"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="p-3 border rounded-lg bg-gray-50 text-lg font-semibold">
              ${parseFloat(user.budget || "0").toFixed(2)}
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Budget Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Set a realistic monthly budget for sustainable shopping</li>
            <li>• Get alerts when you're approaching your limit</li>
            <li>• Track spending across all eco-friendly purchases</li>
            <li>• Adjust your budget anytime based on your needs</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}