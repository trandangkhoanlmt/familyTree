export interface CreateGenealogyTree {
  nameGenealogyTree?: string;
  nameBranch?: string;
  address?: string;
  id_use?: number;
}

//========================================> type post thông số node egde
export interface GenealogyTreePayload {
  userId: number; // Hoặc string, tùy vào loại id bạn sử dụng
  nodes: [
    {
      id_node: number; // Hoặc string, tùy vào loại id bạn sử dụng
      name_node: string;
      day_node: string; // Hoặc Date, tùy thuộc vào định dạng bạn sử dụng
      nameWife_node: string;
      positionX: number;
      positionY: number;
    },
  ];
  edges: [
    {
      id_edge: number; // Hoặc string
      source_edge: number; // Hoặc string
      target_edge: number; // Hoặc string
    },
  ];
}
