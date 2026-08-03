import { getFloorPlan } from "@/lib/floor-plan/service";

export async function GET() {
  const floorPlan = await getFloorPlan().catch(() => null);
  if (!floorPlan) return new Response("Floor plan unavailable", { status: 404 });
  const source = await fetch(floorPlan.publicUrl, { cache: "no-store" }).catch(() => null);
  if (!source?.ok || !source.body) return new Response("Floor plan unavailable", { status: 502 });
  const safeName = floorPlan.originalName.replaceAll(/[^a-zA-Z0-9._-]/g, "-");
  return new Response(source.body, {
    headers: {
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Content-Type": floorPlan.contentType,
      "Cache-Control": "private, no-store",
    },
  });
}
