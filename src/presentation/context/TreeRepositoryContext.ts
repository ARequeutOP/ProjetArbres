import { TreeRepositoryImpl } from "@/src/data/repositories/TreeRepositoryImpl";
import { ITreeRepository } from "@/src/domain/repositories/ITreeRepository";
import { createContext } from "react";

const repository = new TreeRepositoryImpl;
export const TreeRepositoryContext = createContext<ITreeRepository>(repository)