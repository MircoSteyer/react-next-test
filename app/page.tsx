import Todos from "@/components/ui/todo/Todos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Todos />
    </main>
  );
}
