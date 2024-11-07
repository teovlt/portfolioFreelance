import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="h-screen">
      <h1 className="text-primary">{t("home")}</h1>
    </div>
  );
};
