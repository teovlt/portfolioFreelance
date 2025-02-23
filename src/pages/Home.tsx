import Lanyard from "@/components/ui/reactBits/components/Lanyard/Lanyard";

export const Home = () => {
  return (
    <div className="h-screen p-4" id="home-section">
      <h1>Page accueil</h1>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </div>
  );
};
