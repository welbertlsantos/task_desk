import { User } from "./user.model";

export class Task {
    constructor(
        public id: string,
        public codigoTask: number,
        public titulo: string,
        public descricao: string,
        public prioridade: string,
        public dataGravacao: string,
        public user: User
    ){}
}