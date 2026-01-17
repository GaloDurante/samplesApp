import { useTheme } from "@/lib/theme/use-theme";
import { cn } from "@/lib/utils";

import { Moon, Sun, Monitor, type LucideIcon } from "lucide-react";
import { CustomTooltip } from "@/components/custom-tooltip";

type ThemeValue = "light" | "dark" | "system";

interface ThemeOption {
  value: ThemeValue;
  icon: LucideIcon;
  label: string;
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const options: ThemeOption[] = [
    { value: "system", icon: Monitor, label: "Sistema" },
    { value: "light", icon: Sun, label: "Claro" },
    { value: "dark", icon: Moon, label: "Oscuro" },
  ];

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <span className="text-sm font-medium">Tema</span>
      <div className="flex items-center bg-muted p-1 rounded-full border">
        {options.map((option) => (
          <CustomTooltip key={option.value} helperText={option.label}>
            <button
              onClick={() => setTheme(option.value)}
              className={cn(
                "cursor-pointer flex items-center justify-center rounded-full p-1.5 transition-all",
                theme === option.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <option.icon size={14} />
            </button>
          </CustomTooltip>
        ))}
      </div>
    </div>
  );
}
