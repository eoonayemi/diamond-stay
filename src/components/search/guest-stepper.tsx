// src/components/search/GuestStepper.tsx
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface GuestStepperProps {
  label: string;
  description: string;
  value: number;
  onValueChange: (value: number) => void;
}

export const GuestStepper: React.FC<GuestStepperProps> = ({
  label,
  description,
  value,
  onValueChange,
}) => {
  const handleDecrement = () => {
    if (value > 0) {
      // Can be adjusted based on min value
      onValueChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onValueChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold">{label}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleDecrement}
          disabled={value === 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium w-6 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleIncrement}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
