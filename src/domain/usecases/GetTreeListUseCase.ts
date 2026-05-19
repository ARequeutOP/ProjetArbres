import { Tree } from "../entities/Tree";
import { ITreeRepository } from "../repositories/TreeRepository";
import { GetTreeListParams } from "./types/GetTreeListParams";

export class GetTreeListUseCase {
    constructor(private treeRepository: ITreeRepository) {};
    
    async execute(params: GetTreeListParams): Promise<Tree[]> {
        const data = await this.treeRepository.getTreeList(params);
        return data;
    }
}