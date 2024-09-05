import React, { useState } from "react";
import { Depthsearch } from "./Depthsearch";
import "./App.css";

const initialState = [
  {
    id: 1,
    name: "src",
    isFolder: true,
    children: [
      {
        id: 21,
        name: "Components",
        isFolder: true,
        children: [
          {
            id: 22,
            name: "Button.js",
            isFolder: false,
          },
          {
            id: 23,
            name: "Navbar.js",
            isFolder: false,
          },
        ],
      },
      {
        id: 2,
        name: "App.js",
        isFolder: false,
      },
      {
        id: 3,
        name: "styles.css",
        isFolder: false,
      },
    ],
  },
  {
    id: 4,
    name: "package.json",
    isFolder: false,
  },
  {
    id: 5,
    name: "package-lock.json",
    isFolder: false,
  },
];

const App = () => {
  const [nodes, setNodes] = useState(initialState);

  const createFile = (Id) => {
    const fileName = prompt("Enter file name:") || "New File";
    const fileAdded = Depthsearch(nodes, fileName, Id, false);
    if (fileAdded) {
      setNodes([...nodes]);
    } else {
      console.log("Parent folder not found!");
    }
  };

  const createFolder = (Id) => {
    const folderName = prompt("Enter folder name:") || "New Folder";
    const fileAdded = Depthsearch(nodes, folderName, Id, true);
    if (fileAdded) {
      setNodes([...nodes]);
    } else {
      console.log("Parent folder not found!");
    }
  };

  return (
    <div>
      <h2>File Explorer</h2>
      {nodes.map((c) => (
        <Node
          key={c.id}
          id={c.id}
          name={c.name}
          isFolder={c.isFolder}
          children={c.children}
          createFile={createFile}
          createFolder={createFolder}
        />
      ))}
    </div>
  );
};

const Node = ({ id, name, isFolder, children, createFile, createFolder }) => {
  const [showChildren, setShowChildren] = useState(true);

  return (
    <div className="nodes">
      <span onClick={() => setShowChildren((prev) => !prev)}>
        {isFolder ? "📁" : "📄"}
        <span>{name}</span>
      </span>
      {isFolder && (
        <span className="action">
          <button onClick={() => createFile(id)}>+ File</button>
          <button onClick={() => createFolder(id)}>+ Folder</button>
        </span>
      )}
      {isFolder &&
        showChildren &&
        children.map((c) => (
          <Node
            key={c.id}
            id={c.id}
            name={c.name}
            isFolder={c.isFolder}
            children={c.children}
            createFile={createFile}
            createFolder={createFolder}
          />
        ))}
    </div>
  );
};

export default App;
