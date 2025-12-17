import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1 relative">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors shrink-0 z-10",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isCurrent && "border-primary bg-primary text-primary-foreground",
                    !isCompleted && !isCurrent && "border-muted-foreground/30 text-muted-foreground bg-background",
                  )}
                >
                  {isCompleted ? <CheckIcon className="w-5 h-5" /> : <span className="font-semibold">{index + 1}</span>}
                </div>
                <div className="mt-2 text-center w-full px-2">
                  <p className={cn("text-sm font-medium", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block mt-1">{step.description}</p>
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 -mt-5 transition-colors self-center",
                    index < currentStep ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                  style={{ maxWidth: "120px" }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
