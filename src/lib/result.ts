export type Result<T, E = Error> = readonly [T, null] | readonly [null, E];

export async function parseResult<T, E = Error>(
  fn: () => T | Promise<T>,
): Promise<Result<Awaited<T>, E>> {
  try {
    const result = await fn();
    return [result, null] as const;
  } catch (err) {
    if (err instanceof Error) {
      return [null, err as E] as const;
    }
    return [null, new Error("Unknown error") as E] as const;
  }
}
