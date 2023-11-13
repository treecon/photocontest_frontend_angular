export interface ServerMessage {
    code?: number;
    description: string;
}
  
export interface ServerResponse<R> {
    message: ServerMessage;
    result: R;
    success: boolean;
}
