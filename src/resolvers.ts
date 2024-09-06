import { Malmobo, Post, MalmoboInput, UpdateMalmoboInput, PostInput, UpdatePostInput } from './types.js';
import { pool } from './db.js';

// Resolvers define how to fetch the types defined in your schema.

/*
--------------Resolver Arguments Overview--------------------
parent: The result from the previous resolver in the resolver chain. In most cases, this is the object returned by a parent resolver (or null for root-level queries).
args: The arguments passed to the field.
context: An object shared among all resolvers (e.g., authentication information).
info: Information about the execution state of the query.
*/

//localhost:4000/

export const resolvers = {
    Query: {
      malmobos: async (): Promise<Malmobo[]> => {
        const res = await pool.query('SELECT * FROM malmobos');
        return res.rows;
      },
      
      malmobo: async (_: unknown, { id }: { id: number }): Promise<Malmobo | null> => {
        const res = await pool.query('SELECT * FROM malmobos WHERE id = $1', [id]);
        return res.rows[0] || null;
      },
      
      posts: async (): Promise<Post[]> => {
        const res = await pool.query('SELECT * FROM posts');
        return res.rows;
      },
  
      post: async (_: unknown, { id }: { id: number }): Promise<Post | null> => {
        const res = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return res.rows[0] || null;
      },
    },
    
    Mutation: {
      // hade gärna haft 
      createMalmobo: async (_: unknown, { name, nickname, password }: MalmoboInput): Promise<Malmobo> => {
        const res = await pool.query(
          'INSERT INTO malmobos (name, nickname, password) VALUES ($1, $2, $3) RETURNING *',
          [name, nickname, password]
        );
        return res.rows[0];
      },
  
      updateMalmobo: async (_: unknown, { id, name, nickname, password }: UpdateMalmoboInput): Promise<Malmobo | null> => {
        const updates: string[] = [];
        const values: any[] = [];
        let index = 1;
  
        if (name) {
          updates.push(`name = $${index++}`);
          values.push(name);
        }
        if (nickname) {
          updates.push(`nickname = $${index++}`);
          values.push(nickname);
        }
        if (password) {
          updates.push(`password = $${index++}`);
          values.push(password);
        }
  
        values.push(id);
  
        const res = await pool.query(
          `UPDATE malmobos SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`,
          values
        );
        return res.rows[0] || null;
      },
  
      deleteMalmobo: async (_: unknown, { id }: { id: number }): Promise<Malmobo | null> => {
        const res = await pool.query('DELETE FROM malmobos WHERE id = $1 RETURNING *', [id]);
        return res.rows[0] || null;
      },
  
      createPost: async (_: unknown, { title, content, date, malmoboId }: { title: string; content: string; date: string; malmoboId: number }): Promise<Post> => {
        const res = await pool.query(
          'INSERT INTO posts (title, content, date, malmobo_id) VALUES ($1, $2, $3, $4) RETURNING *',
          [title, content, date, malmoboId]
        );
        return res.rows[0];
      },
  
      updatePost: async (_: unknown, { id, title, content, date }: { id: number; title?: string; content?: string; date?: string }): Promise<Post | null> => {
        const updates: string[] = [];
        const values: unknown[] = [];
        let index = 1;
  
        if (title) {
          updates.push(`title = $${index++}`);
          values.push(title);
        }
        if (content) {
          updates.push(`content = $${index++}`);
          values.push(content);
        }
        if (date) {
          updates.push(`date = $${index++}`);
          values.push(date);
        }
  
        values.push(id);
  
        const res = await pool.query(
          `UPDATE posts SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`,
          values
        );
        return res.rows[0] || null;
      },
  
      deletePost: async (_: unknown, { id }: { id: number }): Promise<Post | null> => {
        const res = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        return res.rows[0] || null;
      },
    },
    
    Malmobo: {
      posts: async (parent: Malmobo): Promise<Post[]> => {
        const res = await pool.query('SELECT * FROM posts WHERE malmobo_id = $1', [parent.id]);
        return res.rows;
      },
    },
    
    Post: {
      malmobo: async (parent: Post): Promise<Malmobo | null> => {
        const res = await pool.query('SELECT * FROM malmobos WHERE id = $1', [parent.malmobo_id]);
        return res.rows[0] || null;
      },
    },
  };