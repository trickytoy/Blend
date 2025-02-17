"use client";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { ReactFlowProvider } from "@xyflow/react";

// Dynamically import LayoutFlow to avoid SSR issues
const LayoutFlow = dynamic(() => import("@/components/graph"), { ssr: false });

const MindMap = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <ReactFlowProvider>
        <div className="flex-grow">
          <LayoutFlow />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default MindMap;
