import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Assessment from "@/pages/Assessment";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/framework" element={<FrameworkPlaceholder />} />
      <Route path="/members" element={<MembersPlaceholder />} />
    </Routes>
  );
}

function FrameworkPlaceholder() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <h1 className="text-4xl font-serif text-foreground lowercase">
        framework — coming soon
      </h1>
    </div>
  );
}

function MembersPlaceholder() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <h1 className="text-4xl font-serif text-foreground lowercase">
        members — coming soon
      </h1>
    </div>
  );
}
