import FuzzyText from "@/components/ui/reactBits/textAnimations/FuzzyText/FuzzyText";

export const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FuzzyText baseIntensity={0.2} hoverIntensity={1} enableHover={true}>
        404 - Page not found
      </FuzzyText>
    </div>
  );
};
