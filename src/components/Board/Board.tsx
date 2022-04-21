import { Component, ReactNode, useState, useEffect } from "react";
import { ModuleData, App } from "@formant/data-sdk";
import { BoardContent } from "../BoardContent";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";

interface IBoardState {
  onlineNodes: any | undefined;
  errorMessage: string;
}

interface Bitset {
  keys: string[];
  values: boolean[];
}

export const Board = () => {
  const [onlineNodes, setOnlineNodes] = useState<Bitset>({
    keys: [],
    values: [],
  });

  useEffect(() => {
    App.addModuleDataListener(receiveModuleData);
  });
  const receiveModuleData = async (newValue: ModuleData) => {
    const nodes = getNodes(newValue);
    if (typeof nodes === "string" || nodes === undefined) return;
    setOnlineNodes(nodes);
  };

  return <BoardContent onlineNodes={onlineNodes} />;
};

function getNodes(moduleData: ModuleData): string | undefined | Bitset {
  const streams = Object.values(moduleData.streams);

  if (streams.length === 0) {
    return "No streams.";
  }
  const stream = streams[0];
  if (stream === undefined) {
    return "No stream.";
  }
  if (stream.loading) {
    return undefined;
  }
  if (stream.tooMuchData) {
    return "Too much data.";
  }
  if (stream.data.length === 0) {
    return "No data.";
  }
  const latestPoint = stream.data[0].points.at(-1);

  if (!latestPoint) {
    return "No datapoints.";
  }
  return latestPoint[1];
}
