import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "sanity";
import config from "../../sanity.config";

export const Route = createFileRoute("/studio/$")({
  ssr: false,
  component: StudioPage,
});

function StudioPage() {
  return (
    <div id="sanity-studio-root" className="h-screen">
      <Studio config={config} />
    </div>
  );
}
