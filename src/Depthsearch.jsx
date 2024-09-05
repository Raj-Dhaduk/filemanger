export const Depthsearch = (nodes, name, Id, isFolder) => {
  for (const node of nodes) {
    if (node.id === Id && node.isFolder) {
      const newItem = {
        id: crypto.randomUUID(),
        name: name,
        isFolder: isFolder,
        children: isFolder ? [] : undefined,
      };

      node.children.push(newItem);
      return true; // File/Folder added successfully
    }

    if (node.children && node.children.length > 0) {
      const added = Depthsearch(node.children, name, Id, isFolder);
      if (added) return true; // File/Folder added successfully
    }
  }

  return false; // Parent folder not found
};
