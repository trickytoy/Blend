"use client";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect, useState } from "react";

// Dynamically import LayoutFlow to avoid SSR issues
const LayoutFlow = dynamic(() => import("@/components/graph"), { ssr: false });

const MindMap = () => {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://blend-451807.ts.r.appspot.com/mindmap/api/graph")
      .then((response) => response.json())
      .then((data) => {
        setGraphData({
          nodes: data.initialNodes || [],
          edges: data.initialEdges || [],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <ReactFlowProvider>
        <div className="flex-grow">
          {loading ? (
            <div className="flex items-center justify-center h-full">Loading...</div>
          ) : (
            <LayoutFlow initialNodes={graphData.nodes} initialEdges={graphData.edges} />
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default MindMap;
