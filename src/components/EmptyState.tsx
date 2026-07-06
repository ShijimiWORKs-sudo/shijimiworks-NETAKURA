import Link from "next/link";
import { Plus } from "lucide-react";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="empty-state">
      <p>{message}</p>
      <Link className="btn btn-primary" href="/new">
        <Plus size={16} />
        新しいネタを作る
      </Link>
    </div>
  );
}
