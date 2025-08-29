import { AgentsModel } from "./agents-model";

export interface OrdersModel {
    orderId: string;
    customerName:string;
    item: string;
    status: string;
    total: number;
    assignedAgent: string | null;
    id: string;
    userId: string; 
}
