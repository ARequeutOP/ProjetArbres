import { USE_MOCK } from "@/config/mock";
import { mockTreeService } from "@/services/mockTreeService";
import { treeService } from "@/services/treeService";

export const service = USE_MOCK ? mockTreeService : treeService;