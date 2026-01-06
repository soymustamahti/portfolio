"use client";

import React from "react";
import AnimatedArrow from "../AnimatedArrow";

interface TimelineProps {
  timelineLineRef: React.RefObject<HTMLDivElement | null>;
  progressLineRef: React.RefObject<HTMLDivElement | null>;
  arrowRef: React.RefObject<HTMLDivElement | null>;
}

const Timeline: React.FC<TimelineProps> = ({
  timelineLineRef,
  progressLineRef,
  arrowRef,
}) => (
  <>
    <div
      ref={timelineLineRef}
      className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-accent/20"
    />

    <div
      ref={progressLineRef}
      className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-accent to-purple-500 h-0 z-10"
      style={{ top: 0 }}
    >
      <div
        ref={arrowRef}
        className="absolute left-1/2 transform -translate-x-1/2 z-20"
        style={{ top: "100%", marginTop: "-16px" }}
      >
        <AnimatedArrow />
      </div>
    </div>
  </>
);

export default Timeline;
