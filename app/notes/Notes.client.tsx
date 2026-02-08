"use client";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import css from "./page.module.css";
import { deleteNote, fetchNotes } from "@/lib/api";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const handleDebouncedSearch = useDebouncedCallback((value) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data } = useQuery({
    queryKey: ["notes", { page }, { search }],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        perPage: 12,
      }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id);
  };
  return (
    <>
      <SearchBox value={search} onChange={handleDebouncedSearch} />
      {data && (
        <Pagination
          page={page}
          totalPage={data.totalPages}
          onPageSelect={setPage}
        />
      )}
      <ul className={css.list}>
        {data?.notes.map(({ title, content, tag, id }) => (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <Link href={`/notes/${id}`}>View details</Link>
              <button
                className={css.button}
                onClick={() => handleDeleteNote(id)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
