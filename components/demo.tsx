import { Component } from "@/components/ui/image-auto-slider";
import CircularGallery from "@/components/ui/circular-gallery";

const DemoOne = () => {
  return <Component />;
};

const DemoTwo = () => {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
    </div>
  );
};

export { DemoOne, DemoTwo };

