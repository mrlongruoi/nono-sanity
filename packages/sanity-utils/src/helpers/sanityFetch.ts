// Note: This module uses dynamic import of client.server, which prevents it from being bundled in client code.
// The /server export subpath in package.json provides additional protection.

// Overload signatures
export async function sanityFetch<T>(query: string, params?: Record<string, any>): Promise<T>;
export async function sanityFetch<T>(options: { query: string; params?: Record<string, any> }): Promise<{ data: T }>;

// Implementation
export async function sanityFetch<T>(
  queryOrOptions: string | { query: string; params?: Record<string, any> },
  params: Record<string, any> = {}
): Promise<T | { data: T }> {
  const { getServerClient } = await import("../clients/client.server");
  
  // Handle object syntax (Reddit pattern)
  if (typeof queryOrOptions === "object") {
    const { query, params: queryParams = {} } = queryOrOptions;
    const data = await getServerClient().fetch<T>(query, queryParams);
    return { data };
  }
  
  // Handle separate arguments (LMS pattern)
  return await getServerClient().fetch<T>(queryOrOptions, params);
}
