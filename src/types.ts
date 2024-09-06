// src/types.ts

export interface Malmobo {
    id: number;
    name: string;
    nickname: string;
    password: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    malmobo_id: number;
  }
  

export interface MalmoboInput {
  name: string;
  nickname: string;
  password: string;
}

export interface UpdateMalmoboInput {
  id: number;
  name?: string;
  nickname?: string;
  password?: string; 
}

export interface PostInput {
  title: string;
  content: string;
  date: string;
  malmoboId: number;
}

export interface UpdatePostInput {
  id: number;
  title?: string;
  content?: string;
  date?: string;
}
