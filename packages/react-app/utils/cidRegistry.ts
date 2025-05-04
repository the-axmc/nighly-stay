const LOCAL_STORAGE_KEY = 'cidRegistry';

type Registry = Record<string, string>;

export const setCidForHash = (hash: string, cid: string) => {
  const registry: Registry = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
  );
  registry[hash] = cid;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(registry));
};

export const getCidForHash = (hash: string): string | undefined => {
  const registry: Registry = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
  );
  return registry[hash];
};
