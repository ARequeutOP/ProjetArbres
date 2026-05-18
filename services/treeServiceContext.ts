import { createContext } from "react";
import { TreeService } from "./treeService";
import { treeServiceImpl } from "./treeServiceImpl";

const service = treeServiceImpl;
export const TreeServiceContext = createContext<TreeService>(service)