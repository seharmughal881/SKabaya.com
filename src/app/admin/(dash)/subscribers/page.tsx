import { listSubscribers } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminSubscribers() {
  const subscribers = await listSubscribers();

  return (
    <div>
      <p className="eyebrow">Newsletter</p>
      <h1 className="mt-3 font-display text-4xl text-ivory">Subscribers</h1>
      <p className="mt-3 text-muted">{subscribers.length} total</p>

      {subscribers.length === 0 ? (
        <p className="mt-8 text-muted">No subscribers yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line/40 text-left">
                <th className="font-label px-3 py-3 text-[10px] uppercase tracking-[0.2em] text-muted">
                  Email
                </th>
                <th className="font-label px-3 py-3 text-[10px] uppercase tracking-[0.2em] text-muted">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.email} className="border-b border-line/20">
                  <td className="px-3 py-3 text-ivory">{s.email}</td>
                  <td className="px-3 py-3 text-muted">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
