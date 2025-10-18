import { queryClient } from "@/integrations/tanstack-query/query-client";
import { fetchBackend } from "@/lib/fetch-backend";

async function validateTeamByNameOnServer(name: string): Promise<boolean> {
  const response = await fetchBackend(`/validate/team/name/${name}`, "GET");
  const data = await response.json();
  return data.data.valid;
}

export function teamExistsWithName(name: string) {
  return queryClient.fetchQuery({
    queryKey: ["validate", "team", "name", name],
    queryFn: () => validateTeamByNameOnServer(name),
  });
}
