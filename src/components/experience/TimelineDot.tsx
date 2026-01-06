"use client";

const TimelineDot: React.FC = () => (
  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
    <div className="relative">
      <div className="w-4 h-4 bg-accent rounded-full border-4 border-primary" />
      <div className="absolute top-0 left-0 w-4 h-4 bg-accent rounded-full animate-ping opacity-75" />
    </div>
  </div>
);

export default TimelineDot;
