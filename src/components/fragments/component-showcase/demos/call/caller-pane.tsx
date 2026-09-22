import { Badge } from "@/components/ui/badge";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CallerPane: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-muted">
      <div className="relative flex items-center justify-center">
        <Badge variant="default">B</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {t("componentShowcase.cells.call.caller")}
      </p>
    </div>
  );
};
