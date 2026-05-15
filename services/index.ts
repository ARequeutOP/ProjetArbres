import { USE_MOCK } from "@/config/mock";
import { mockTreeService } from "@/services/mockTreeService";
import { treeServiceImpl } from "@/services/treeServiceImpl";

export const service = USE_MOCK ? mockTreeService : treeServiceImpl;