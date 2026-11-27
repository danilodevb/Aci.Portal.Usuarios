function ancestorPaths(path: string): Set<string> {
  const segments = path.split("/");
  const ancestors = new Set<string>();
  for (let index = 1; index < segments.length; index += 1) {
    ancestors.add(segments.slice(0, index).join("/"));
  }
  return ancestors;
}

export function toggleExpandedMenuGroup(expanded: Set<string>, path: string): Set<string> {
  const next = ancestorPaths(path);
  if (!expanded.has(path)) next.add(path);
  return next;
}

export function retainMenuAncestors(expanded: Set<string>, path: string): Set<string> {
  const ancestors = ancestorPaths(path);
  return new Set([...expanded].filter((expandedPath) => ancestors.has(expandedPath)));
}
