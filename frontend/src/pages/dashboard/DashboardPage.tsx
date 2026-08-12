import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Conversation = {
  id: number;
  customer: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  status: "Open" | "Waiting" | "Resolved";
  channel: string;
};

const conversations: Conversation[] = [
  { id: 1, customer: "Maya Patel", initials: "MP", subject: "Order status request", preview: "Hi, could you let me know when my order will ship?", time: "2m", status: "Open", channel: "Email" },
  { id: 2, customer: "Noah Williams", initials: "NW", subject: "Billing question", preview: "I noticed an unexpected charge on my latest invoice.", time: "18m", status: "Waiting", channel: "Email" },
  { id: 3, customer: "Olivia Chen", initials: "OC", subject: "Unable to update my profile", preview: "The save button does not seem to keep my changes.", time: "42m", status: "Open", channel: "Chat" },
  { id: 4, customer: "Liam Johnson", initials: "LJ", subject: "Feature request", preview: "Would it be possible to export the monthly report?", time: "1h", status: "Resolved", channel: "Email" },
];

const navigationItems = [
  { label: "Inbox", icon: "⌂" },
  { label: "Analytics", icon: "◔" },
  { label: "Knowledge", icon: "◇" },
  { label: "Settings", icon: "⚙" },
];

function StatusBadge({ status }: { status: Conversation["status"] }) {
  const colors = {
    Open: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
    Waiting: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
    Resolved: "bg-slate-400/10 text-slate-300 ring-slate-400/20",
  };

  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${colors[status]}`}><span className="size-1.5 rounded-full bg-current" />{status}</span>;
}

function DashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Inbox");
  const [selectedId, setSelectedId] = useState(1);
  const [reply, setReply] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const selectedConversation = useMemo(() => conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0], [selectedId]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const selectConversation = (id: number) => {
    setSelectedId(id);
    setIsMobileSidebarOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className={`${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-68 flex-col border-r border-white/10 bg-slate-950 p-4 transition-transform lg:static lg:translate-x-0`} aria-label="Workspace navigation">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white"><span className="flex size-8 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-slate-950">S</span>SupportAI</div>
            <button type="button" onClick={() => setIsMobileSidebarOpen(false)} className="rounded-md p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close navigation">×</button>
          </div>

          <div className="mt-8">
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Workspace</p>
            <nav className="mt-3 space-y-1">
              {navigationItems.map((item) => <button key={item.label} type="button" onClick={() => { setActiveItem(item.label); setIsMobileSidebarOpen(false); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${activeItem === item.label ? "bg-cyan-400/10 text-cyan-200" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`}><span className="w-4 text-center text-base" aria-hidden="true">{item.icon}</span>{item.label}{item.label === "Inbox" && <span className="ml-auto rounded-full bg-cyan-400/15 px-2 py-0.5 text-xs text-cyan-200">3</span>}</button>)}
            </nav>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 px-2 py-3"><span className="flex size-9 items-center justify-center rounded-full bg-violet-400/15 text-sm font-semibold text-violet-200">{user?.fullName?.slice(0, 1).toUpperCase() ?? "U"}</span><div className="min-w-0"><p className="truncate text-sm font-medium text-white">{user?.fullName ?? "SupportAI user"}</p><p className="truncate text-xs text-slate-500">{user?.email}</p></div></div>
            <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"><span aria-hidden="true">↗</span>Log out</button>
          </div>
        </aside>

        {isMobileSidebarOpen && <button type="button" className="fixed inset-0 z-30 bg-slate-950/75 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} aria-label="Close navigation overlay" />}

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur sm:px-6">
            <button type="button" onClick={() => setIsMobileSidebarOpen(true)} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Open navigation">☰</button>
            <div><p className="text-sm font-semibold text-white">{activeItem}</p><p className="text-xs text-slate-500">{activeItem === "Inbox" ? "Manage customer conversations" : "Your SupportAI workspace"}</p></div>
            <div className="ml-auto flex items-center gap-3"><span className="hidden text-sm text-slate-400 sm:block">Team workspace</span><span className="size-2 rounded-full bg-emerald-400" aria-label="System operational" /></div>
          </header>

          {activeItem !== "Inbox" ? <div className="flex flex-1 items-center justify-center p-6"><div className="max-w-sm rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center"><p className="text-lg font-semibold text-white">{activeItem}</p><p className="mt-2 text-sm leading-6 text-slate-400">This workspace area is ready for your team&apos;s information.</p><button type="button" onClick={() => setActiveItem("Inbox")} className="mt-5 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Back to Inbox</button></div></div> : <div className="grid min-h-0 flex-1 lg:grid-cols-[20rem_minmax(0,1fr)_minmax(20rem,0.8fr)]">
            <section className="border-b border-white/10 bg-slate-950/40 lg:border-r lg:border-b-0" aria-label="Conversations">
              <div className="flex items-center justify-between px-4 pb-3 pt-5"><div><h1 className="text-xl font-semibold text-white">Inbox</h1><p className="mt-1 text-sm text-slate-500">3 open conversations</p></div><button type="button" className="rounded-lg border border-white/10 px-2.5 py-1.5 text-sm text-slate-300 hover:border-white/25 hover:text-white" aria-label="Filter conversations">⌘</button></div>
              <div className="max-h-72 overflow-y-auto border-t border-white/10 lg:max-h-none lg:overflow-y-auto">
                {conversations.length === 0 ? <p className="p-6 text-sm text-slate-500">No conversations yet.</p> : conversations.map((conversation) => <button key={conversation.id} type="button" onClick={() => selectConversation(conversation.id)} className={`w-full border-b border-white/7 px-4 py-4 text-left transition-colors ${conversation.id === selectedId ? "bg-cyan-400/8" : "hover:bg-white/4"}`}><div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-cyan-200">{conversation.initials}</span><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="truncate text-sm font-semibold text-slate-100">{conversation.customer}</p><span className="ml-auto text-xs text-slate-500">{conversation.time}</span></div><p className="mt-1 truncate text-sm text-slate-300">{conversation.subject}</p><p className="mt-1 truncate text-xs text-slate-500">{conversation.preview}</p></div></div></button>)}</div>
            </section>

            <section className="flex min-h-[38rem] min-w-0 flex-col border-b border-white/10 bg-slate-900/30 lg:border-r lg:border-b-0" aria-label="Conversation details">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="min-w-0"><p className="text-sm font-semibold text-white">{selectedConversation.subject}</p><p className="mt-1 text-xs text-slate-500">#{String(selectedConversation.id).padStart(4, "0")} · via {selectedConversation.channel}</p></div><StatusBadge status={selectedConversation.status} /></div>
              <div className="flex-1 space-y-6 overflow-y-auto p-5"><div className="flex gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-cyan-200">{selectedConversation.initials}</span><div className="max-w-lg"><div className="flex items-center gap-2"><p className="text-sm font-medium text-white">{selectedConversation.customer}</p><span className="text-xs text-slate-500">Today, 10:24 AM</span></div><div className="mt-2 rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-200">{selectedConversation.preview} I&apos;d appreciate any update you can share.</div></div></div><div className="flex justify-end"><div className="max-w-lg"><p className="text-right text-xs text-slate-500">SupportAI · just now</p><div className="mt-2 rounded-2xl rounded-tr-sm bg-cyan-400 px-4 py-3 text-sm leading-6 text-slate-950">Thanks for reaching out, {selectedConversation.customer.split(" ")[0]}. I&apos;m checking this for you now and will share an update shortly.</div></div></div></div>
              <form className="border-t border-white/10 p-4" onSubmit={(event) => { event.preventDefault(); setReply(""); }}><label htmlFor="reply" className="sr-only">Reply to customer</label><textarea id="reply" value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write a reply…" rows={3} className="block w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-3.5 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300" /><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-500">Replies are sent to {selectedConversation.customer}</span><button type="submit" disabled={!reply.trim()} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-45">Send reply</button></div></form>
            </section>

            <aside className="bg-slate-950/40 p-5" aria-label="AI assistance"><p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">SupportAI assist</p><h2 className="mt-2 text-lg font-semibold text-white">Suggested reply</h2><p className="mt-2 text-sm leading-6 text-slate-400">Based on order fulfilment guidance and this customer&apos;s conversation.</p><div className="mt-5 rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-4"><p className="text-sm leading-6 text-slate-200">Hi {selectedConversation.customer.split(" ")[0]}, thanks for checking in. Your order is being prepared and is expected to leave our warehouse within one business day. We&apos;ll send tracking details as soon as it ships.</p><button type="button" onClick={() => setReply(`Hi ${selectedConversation.customer.split(" ")[0]}, thanks for checking in. Your order is being prepared and is expected to leave our warehouse within one business day. We’ll send tracking details as soon as it ships.`)} className="mt-4 rounded-lg border border-cyan-400/25 px-3 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-400/10">Use suggestion</button></div><div className="mt-6 rounded-xl border border-white/10 bg-slate-900/60 p-4"><p className="text-sm font-medium text-white">Customer context</p><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Plan</dt><dd className="text-slate-200">Growth</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Previous tickets</dt><dd className="text-slate-200">2 resolved</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Satisfaction</dt><dd className="text-emerald-300">Great</dd></div></dl></div></aside>
          </div>}
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
