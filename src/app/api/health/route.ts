/** Load balancer health check. Confirms the server is up; deliberately touches no AWS services. */
export function GET() {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
