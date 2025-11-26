export async function sanityFetch<T>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  // Dynamically import server-only client to avoid bundling server code into browser builds
  const { getServerClient } = await import("../clients/client.server");
  return await getServerClient().fetch<T>(query, params);
}
