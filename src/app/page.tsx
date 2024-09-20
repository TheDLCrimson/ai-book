"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Header from "./components/header";
import MainContent from "./components/main-content";
import SideContent from "./components/side-content";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <PanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        <Panel className="flex-1">
          <MainContent />
        </Panel>
        <PanelResizeHandle className="w-2 bg-gray-300 cursor-col-resize" />
        <Panel className="flex-none" defaultSize={20}>
          <div className="h-full flex justify-center items-center">
            <SideContent />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
