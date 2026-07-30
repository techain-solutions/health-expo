import { PublicPageContent } from "@/components/public-pages";
import { PublicShell } from "@/components/public-shell";

export default function Home() {
  return (
    <PublicShell locale="en" page="home">
      <PublicPageContent locale="en" page="home" />
    </PublicShell>
  );
}
