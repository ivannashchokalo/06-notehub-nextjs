import axios from "axios";
import { FormValues, Note } from "../types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params,
  });
  return response.data;
}

export async function fetchNoteById(id: Note["id"]) {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
}

export async function createNote(newTask: FormValues) {
  const response = await api.post<Note>("/notes", newTask);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}
