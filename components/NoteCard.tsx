export default function NoteCard({
  note,
  onDelete,
}: {
  note: { id: number; text: string };
  onDelete: (id: number) => void;
}) {
  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 6,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{note.text}</span>

      <button onClick={() => onDelete(note.id)}>
        delete
      </button>
    </div>
  );
}