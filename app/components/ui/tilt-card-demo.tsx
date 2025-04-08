import { TiltCard } from "@/app/components/ui/tilt-card";

function DefaultDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <TiltCard 
        title="Hover Me!" 
        hoverColor="hover:bg-pakistan_green-800 hover:border-pakistan_green-200" 
        className="m-4" 
      />
      <TiltCard 
        title="I'm Tilted!" 
        hoverColor="hover:bg-pakistan_green-900 hover:border-pakistan_green-300" 
        className="m-4" 
      />
    </div>
  );
}

export { DefaultDemo };