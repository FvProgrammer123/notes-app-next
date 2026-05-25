import { Note } from "@/types/note";

let notes: Note[] = [];

export async function GET() {
  return Response.json(notes);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newNote: Note = {
    id: Date.now(),
    text: body.text,
  };

  notes.push(newNote);

  return Response.json(newNote);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  notes = notes.filter((n) => n.id !== body.id);

  return Response.json({ success: true });
}
