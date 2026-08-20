import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  getKnowledgeArticles,
  createKnowledgeArticle,
  updateKnowledgeArticle,
  deleteKnowledgeArticle,
} from "../../services/knowledge";

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

const analyticsTrend = [42, 56, 48, 71, 64, 82, 76];

type KnowledgeArticle = {
  id: string | number;
  _id?: string;
  title: string;
  description?: string;
  category: string;
  content: string;
  updatedAt: string;
  status: "Published";
};

type WorkspaceSettings = {
  workspaceName: string;
  companyName: string;
  supportEmail: string;
  defaultReplyTone: string;
  autoReply: boolean;
  workingHoursStart: string;
  workingHoursEnd: string;
  aiAssistance: boolean;
  suggestedReplies: boolean;
  aiResponseTone: string;
};

const settingsStorageKey = "supportai-workspace-settings";
const defaultWorkspaceSettings: WorkspaceSettings = {
  workspaceName: "Team workspace",
  companyName: "SupportAI",
  supportEmail: "support@supportai.com",
  defaultReplyTone: "Friendly and helpful",
  autoReply: false,
  workingHoursStart: "09:00",
  workingHoursEnd: "17:00",
  aiAssistance: true,
  suggestedReplies: true,
  aiResponseTone: "Professional",
};

function getStoredWorkspaceSettings(): WorkspaceSettings {
  try {
    const stored = window.localStorage.getItem(settingsStorageKey);
    return stored ? { ...defaultWorkspaceSettings, ...JSON.parse(stored) as Partial<WorkspaceSettings> } : defaultWorkspaceSettings;
  } catch {
    return defaultWorkspaceSettings;
  }
}

function SettingsView() {
  const [savedSettings, setSavedSettings] = useState<WorkspaceSettings>(getStoredWorkspaceSettings);
  const [settings, setSettings] = useState<WorkspaceSettings>(getStoredWorkspaceSettings);
  const [errors, setErrors] = useState<Partial<Record<keyof WorkspaceSettings, string>>>({});
  const [isSaved, setIsSaved] = useState(false);
  const updateSetting = <K extends keyof WorkspaceSettings>(key: K, value: WorkspaceSettings[K]) => { setSettings((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); setIsSaved(false); };
  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);
  const saveSettings = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof WorkspaceSettings, string>> = {};
    if (!settings.workspaceName.trim()) nextErrors.workspaceName = "Workspace name is required.";
    if (!settings.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!settings.supportEmail.trim()) nextErrors.supportEmail = "Support email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(settings.supportEmail)) nextErrors.supportEmail = "Enter a valid support email.";
    if (!settings.workingHoursStart || !settings.workingHoursEnd) nextErrors.workingHoursStart = "Set both working hours.";
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); setIsSaved(false); return; }
    const nextSettings = { ...settings, workspaceName: settings.workspaceName.trim(), companyName: settings.companyName.trim(), supportEmail: settings.supportEmail.trim() };
    window.localStorage.setItem(settingsStorageKey, JSON.stringify(nextSettings));
    setSettings(nextSettings);
    setSavedSettings(nextSettings);
    setIsSaved(true);
  };

  const fieldClass = "mt-2 block w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300";
  const toggle = (label: string, description: string, checked: boolean, onChange: (value: boolean) => void) => <label className="flex cursor-pointer items-start justify-between gap-5 rounded-lg px-1 py-2"><span><span className="block text-sm font-medium text-slate-200">{label}</span><span className="mt-1 block text-sm leading-6 text-slate-500">{description}</span></span><span className="relative mt-1 inline-flex shrink-0"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" /><span className="h-6 w-11 rounded-full bg-slate-700 transition-colors peer-checked:bg-cyan-400 peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-cyan-300" /><span className="pointer-events-none absolute left-1 top-1 size-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" /></span></label>;

  return <div className="flex-1 overflow-y-auto bg-slate-950/30 p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-4xl"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Settings</h1><p className="mt-2 text-sm text-slate-400">Configure your workspace and support preferences.</p></div>{isSaved && <p className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-300" role="status">Changes saved</p>}</div><form onSubmit={saveSettings} className="mt-7 space-y-6"><section className="rounded-xl border border-white/10 bg-slate-900/60 p-5 shadow-sm"><div><h2 className="text-base font-semibold text-white">Workspace Information</h2><p className="mt-1 text-sm text-slate-500">Details your team uses across SupportAI.</p></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><div><label htmlFor="workspace-name" className="text-sm font-medium text-slate-200">Workspace name</label><input id="workspace-name" value={settings.workspaceName} onChange={(event) => updateSetting("workspaceName", event.target.value)} className={fieldClass} aria-invalid={Boolean(errors.workspaceName)} />{errors.workspaceName && <p className="mt-1.5 text-xs text-rose-300">{errors.workspaceName}</p>}</div><div><label htmlFor="company-name" className="text-sm font-medium text-slate-200">Company / business name</label><input id="company-name" value={settings.companyName} onChange={(event) => updateSetting("companyName", event.target.value)} className={fieldClass} aria-invalid={Boolean(errors.companyName)} />{errors.companyName && <p className="mt-1.5 text-xs text-rose-300">{errors.companyName}</p>}</div><div className="sm:col-span-2"><label htmlFor="support-email" className="text-sm font-medium text-slate-200">Support email</label><input id="support-email" type="email" value={settings.supportEmail} onChange={(event) => updateSetting("supportEmail", event.target.value)} className={fieldClass} aria-invalid={Boolean(errors.supportEmail)} />{errors.supportEmail && <p className="mt-1.5 text-xs text-rose-300">{errors.supportEmail}</p>}</div></div></section><section className="rounded-xl border border-white/10 bg-slate-900/60 p-5 shadow-sm"><div><h2 className="text-base font-semibold text-white">Support Preferences</h2><p className="mt-1 text-sm text-slate-500">Set defaults for how your team supports customers.</p></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><div><label htmlFor="reply-tone" className="text-sm font-medium text-slate-200">Default reply tone</label><select id="reply-tone" value={settings.defaultReplyTone} onChange={(event) => updateSetting("defaultReplyTone", event.target.value)} className={fieldClass}><option>Friendly and helpful</option><option>Professional</option><option>Concise</option><option>Warm and conversational</option></select></div><div className="rounded-lg border border-white/8 bg-slate-950/35 px-4">{toggle("Auto-reply", "Send an automatic acknowledgement to new customer messages.", settings.autoReply, (value) => updateSetting("autoReply", value))}</div><div className="sm:col-span-2"><p className="text-sm font-medium text-slate-200">Working hours</p><p className="mt-1 text-sm text-slate-500">Use your local workspace time for support availability.</p><div className="mt-3 flex max-w-md items-center gap-3"><label className="sr-only" htmlFor="working-hours-start">Start time</label><input id="working-hours-start" type="time" value={settings.workingHoursStart} onChange={(event) => updateSetting("workingHoursStart", event.target.value)} className={fieldClass.replace("mt-2", "mt-0")} /><span className="text-sm text-slate-500">to</span><label className="sr-only" htmlFor="working-hours-end">End time</label><input id="working-hours-end" type="time" value={settings.workingHoursEnd} onChange={(event) => updateSetting("workingHoursEnd", event.target.value)} className={fieldClass.replace("mt-2", "mt-0")} /></div>{errors.workingHoursStart && <p className="mt-1.5 text-xs text-rose-300">{errors.workingHoursStart}</p>}</div></div></section><section className="rounded-xl border border-white/10 bg-slate-900/60 p-5 shadow-sm"><div><h2 className="text-base font-semibold text-white">AI Assistance</h2><p className="mt-1 text-sm text-slate-500">Control how SupportAI helps your team respond.</p></div><div className="mt-5 divide-y divide-white/10"><div>{toggle("AI assistance", "Use your workspace knowledge to help support conversations.", settings.aiAssistance, (value) => updateSetting("aiAssistance", value))}</div><div>{toggle("Suggested replies", "Show draft responses for your team to review before sending.", settings.suggestedReplies, (value) => updateSetting("suggestedReplies", value))}</div><div className="pt-5 sm:max-w-sm"><label htmlFor="ai-tone" className="text-sm font-medium text-slate-200">AI response tone</label><select id="ai-tone" value={settings.aiResponseTone} onChange={(event) => updateSetting("aiResponseTone", event.target.value)} className={fieldClass}><option>Professional</option><option>Friendly and helpful</option><option>Concise</option><option>Warm and conversational</option></select></div></div></section><div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between"><button type="button" disabled={!isDirty} onClick={() => { setSettings(savedSettings); setErrors({}); setIsSaved(false); }} className="w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto">Discard changes</button><button type="submit" className="w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 sm:w-auto">Save changes</button></div></form></div></div>;
}

const initialKnowledgeArticles: KnowledgeArticle[] = [
  { id: 1, title: "Shipping & Delivery", description: "Delivery timeframes, tracking updates, and shipping options for customer orders.", category: "Orders", updatedAt: "Updated Aug 10, 2026", status: "Published", content: "We process orders within one business day. Standard delivery usually takes 3–5 business days after dispatch, while express delivery takes 1–2 business days.\n\nOnce an order leaves our warehouse, customers receive a shipping confirmation email with a tracking link. Tracking can take up to 24 hours to show its first update.\n\nIf an order has not arrived by the end of its estimated delivery window, please ask the customer to confirm their shipping address before opening a carrier investigation." },
  { id: 2, title: "Refund Policy", description: "Eligibility, processing times, and the steps customers should follow to request a refund.", category: "Policies", updatedAt: "Updated Aug 8, 2026", status: "Published", content: "Customers may request a refund within 30 days of delivery for eligible purchases. Items must be returned unused and in their original condition unless the item arrived damaged or incorrect.\n\nAfter a return is received and inspected, approved refunds are issued to the original payment method within 5–10 business days. Shipping fees are non-refundable unless we made an error with the order.\n\nFor refund requests, collect the order number, reason for the request, and any relevant photos when an item is damaged." },
  { id: 3, title: "Billing & Payments", description: "Accepted payment methods, invoice information, and guidance for payment issues.", category: "Billing", updatedAt: "Updated Aug 5, 2026", status: "Published", content: "We accept major credit and debit cards, PayPal, and approved digital wallets. Charges are placed when an order is submitted, and an itemized receipt is emailed after payment is confirmed.\n\nIf a customer sees a duplicate or unfamiliar charge, first verify the order number and payment date. Pending authorization holds normally disappear within 3–5 business days if an order was not completed.\n\nInvoices can be requested by contacting support with the order number and the billing details that should appear on the document." },
  { id: 4, title: "Account & Profile", description: "How customers can update profile details, reset passwords, and manage account access.", category: "Account", updatedAt: "Updated Aug 2, 2026", status: "Published", content: "Customers can update their name, email address, and saved addresses from the Profile section of their account. Changes are saved immediately after selecting Save changes.\n\nFor forgotten passwords, customers should use the Forgot password link on the sign-in page. Password reset links expire after 30 minutes for security.\n\nIf a customer cannot access the email associated with their account, verify their identity before helping them change the account email address." },
  { id: 5, title: "Returns & Exchanges", description: "Return labels, exchange availability, and what to do when an item is not quite right.", category: "Orders", updatedAt: "Updated Jul 29, 2026", status: "Published", content: "Eligible items can be returned within 30 days of delivery. Customers can start a return from their order history to receive a prepaid return label when one is available.\n\nExchanges are offered for the same product in another size or color, subject to stock availability. If the preferred replacement is unavailable, offer a refund instead.\n\nAsk customers to keep their return receipt until the package is delivered to our returns center." },
];

function KnowledgeView() {
  const [articles, setArticles] = useState(initialKnowledgeArticles);
  useEffect(() => {
  const loadKnowledgeArticles = async () => {
    try {
      const data = await getKnowledgeArticles();
      setArticles(data);
    } catch (error) {
      console.error("Failed to load knowledge articles:", error);
    }
  };

  loadKnowledgeArticles();
}, []);
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [editingArticle, setEditingArticle] = useState<KnowledgeArticle | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<KnowledgeArticle | null>(null);
  const [form, setForm] = useState({ title: "", category: "Orders", content: "" });

  const filteredArticles = articles.filter((article) => `${article.title} ${article.description} ${article.category}`.toLowerCase().includes(search.trim().toLowerCase()));
  const closeForm = () => { setIsFormOpen(false); setEditingArticle(null); setForm({ title: "", category: "Orders", content: "" }); };
  const openCreateForm = () => { setEditingArticle(null); setForm({ title: "", category: "Orders", content: "" }); setIsFormOpen(true); };
  const openEditForm = (article: KnowledgeArticle) => { setSelectedArticle(null); setEditingArticle(article); setForm({ title: article.title, category: article.category, content: article.content }); setIsFormOpen(true); };
  const saveArticle = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const title = form.title.trim();
  const content = form.content.trim();

  if (!title || !content) return;

  const description =
    content.replace(/\s+/g, " ").slice(0, 105).trim() +
    (content.length > 105 ? "..." : "");

  try {
    if (editingArticle) {
      const updated = await updateKnowledgeArticle(
        String(editingArticle.id),
        {
          title,
          category: form.category,
          content,
          description,
          status: "Published",
        }
      );

      setArticles((current) =>
        current.map((article) =>
          article.id === editingArticle.id ? updated : article
        )
      );

      setSelectedArticle(updated);
    } else {
      const created = await createKnowledgeArticle({
        title,
        category: form.category,
        content,
        description,
        status: "Published",
      });

      setArticles((current) => [created, ...current]);
    }

    closeForm();
  } catch (error) {
    console.error("Failed to save knowledge article:", error);
  }
};

  const deleteArticle = async () => {
  if (!articleToDelete) return;

  try {
    await deleteKnowledgeArticle(String(articleToDelete._id ?? articleToDelete.id));

    setArticles((current) =>
      current.filter((article) =>
    String(article._id ?? article.id) !==
    String(articleToDelete._id ?? articleToDelete.id))
    );

    setSelectedArticle(null);
    setArticleToDelete(null);
  } catch (error) {
    console.error("Failed to delete knowledge article:", error);
  }
};

  return <div className="flex-1 overflow-y-auto bg-slate-950/30 p-4 sm:p-6 lg:p-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Knowledge</h1><p className="mt-2 text-sm text-slate-400">Manage the information SupportAI uses to help your team.</p></div><button type="button" onClick={openCreateForm} className="inline-flex w-fit items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"><span aria-hidden="true">+</span>Add knowledge</button></div>
      <div className="mt-7"><label htmlFor="knowledge-search" className="sr-only">Search knowledge</label><div className="relative max-w-xl"><span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500" aria-hidden="true">⌕</span><input id="knowledge-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search knowledge..." className="block w-full rounded-xl border border-white/10 bg-slate-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300" /></div></div>
      {filteredArticles.length > 0 ? <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredArticles.map((article) => <button key={article.id} type="button" onClick={() => setSelectedArticle(article)} className="group flex min-h-52 flex-col rounded-xl border border-white/10 bg-slate-900/60 p-5 text-left shadow-sm transition-colors hover:border-cyan-400/35 hover:bg-slate-900"><div className="flex items-start justify-between gap-3"><span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-200">{article.category}</span><span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-400" />{article.status}</span></div><h2 className="mt-5 text-base font-semibold text-white group-hover:text-cyan-100">{article.title}</h2><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{article.description}</p><p className="mt-auto pt-5 text-xs text-slate-500">{article.updatedAt}</p></button>)}</div> : <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-slate-900/40 px-6 py-14 text-center"><p className="text-base font-semibold text-white">No knowledge found</p><p className="mt-2 text-sm text-slate-400">Try a different search term or add a new knowledge article.</p><button type="button" onClick={openCreateForm} className="mt-5 rounded-lg border border-cyan-400/25 px-3.5 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-400/10">Add knowledge</button></div>}
    </div>
    {selectedArticle && <div className="fixed inset-0 z-50 flex items-end bg-slate-950/75 p-0 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="article-title"><div className="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-2xl border border-white/10 bg-slate-900 shadow-2xl sm:rounded-2xl"><div className="flex items-start justify-between gap-4 border-b border-white/10 p-5"><div><span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-200">{selectedArticle.category}</span><h2 id="article-title" className="mt-3 text-xl font-semibold text-white">{selectedArticle.title}</h2><p className="mt-1 text-xs text-slate-500">{selectedArticle.updatedAt}</p></div><button type="button" onClick={() => setSelectedArticle(null)} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close article">×</button></div><div className="overflow-y-auto px-5 py-6"><div className="whitespace-pre-line text-sm leading-7 text-slate-300">{selectedArticle.content}</div></div><div className="flex justify-between gap-3 border-t border-white/10 p-5"><button type="button" onClick={() => setArticleToDelete(selectedArticle)} className="rounded-lg px-3.5 py-2 text-sm font-medium text-rose-300 hover:bg-rose-400/10">Delete</button><div className="flex gap-3"><button type="button" onClick={() => setSelectedArticle(null)} className="rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-slate-300 hover:border-white/25 hover:text-white">Close</button><button type="button" onClick={() => openEditForm(selectedArticle)} className="rounded-lg bg-cyan-400 px-3.5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Edit</button></div></div></div></div>}
    {isFormOpen && <div className="fixed inset-0 z-50 flex items-end bg-slate-950/75 p-0 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="knowledge-form-title"><form onSubmit={saveArticle} className="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-2xl border border-white/10 bg-slate-900 shadow-2xl sm:rounded-2xl"><div className="border-b border-white/10 p-5"><h2 id="knowledge-form-title" className="text-xl font-semibold text-white">{editingArticle ? "Edit knowledge" : "Add knowledge"}</h2><p className="mt-1 text-sm text-slate-400">Create a clear, useful resource for your support team.</p></div><div className="space-y-5 overflow-y-auto p-5"><div><label htmlFor="article-title-input" className="text-sm font-medium text-slate-200">Article title</label><input id="article-title-input" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 block w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300" /></div><div><label htmlFor="article-category" className="text-sm font-medium text-slate-200">Category</label><select id="article-category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-2 block w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300"><option>Orders</option><option>Policies</option><option>Billing</option><option>Account</option><option>General</option></select></div><div><label htmlFor="article-content" className="text-sm font-medium text-slate-200">Content</label><textarea id="article-content" required rows={9} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} className="mt-2 block w-full resize-y rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2.5 text-sm leading-6 text-white focus:border-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300" /></div></div><div className="flex justify-end gap-3 border-t border-white/10 p-5"><button type="button" onClick={closeForm} className="rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-slate-300 hover:border-white/25 hover:text-white">Cancel</button><button type="submit" className="rounded-lg bg-cyan-400 px-3.5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Save knowledge</button></div></form></div>}
    {articleToDelete && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-article-title"><div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900 p-5 shadow-2xl"><h2 id="delete-article-title" className="text-lg font-semibold text-white">Delete knowledge article?</h2><p className="mt-2 text-sm leading-6 text-slate-400">This will permanently remove “{articleToDelete.title}” from the local knowledge list.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setArticleToDelete(null)} className="rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-slate-300 hover:border-white/25 hover:text-white">Cancel</button><button type="button" onClick={deleteArticle} className="rounded-lg bg-rose-400 px-3.5 py-2 text-sm font-semibold text-slate-950 hover:bg-rose-300">Delete</button></div></div></div>}
  </div>;
}

function AnalyticsView() {
  const trendPoints = analyticsTrend.map((value, index) => `${(index / (analyticsTrend.length - 1)) * 100},${100 - ((value - 35) / 55) * 82}`).join(" ");
  const kpis = [
    { label: "Total conversations", value: "1,284", change: "+12.4%", color: "text-cyan-300" },
    { label: "Open conversations", value: "38", change: "-8.1%", color: "text-emerald-300" },
    { label: "Resolved conversations", value: "1,146", change: "+15.2%", color: "text-cyan-300" },
    { label: "Average response time", value: "8m 24s", change: "-1m 12s", color: "text-emerald-300" },
    { label: "Customer satisfaction", value: "94.8%", change: "+2.1%", color: "text-cyan-300" },
  ];

  return <div className="flex-1 overflow-y-auto bg-slate-950/30 p-4 sm:p-6 lg:p-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Local mock data</p><h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Support performance</h1><p className="mt-2 text-sm text-slate-400">A seven-day view of your team&apos;s conversation activity.</p></div><button type="button" className="w-fit rounded-lg border border-white/10 bg-slate-900 px-3.5 py-2 text-sm font-medium text-slate-300 hover:border-white/20 hover:text-white">Last 7 days</button></div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{kpis.map((kpi) => <article key={kpi.label} className="rounded-xl border border-white/10 bg-slate-900/60 p-4 shadow-sm"><p className="text-sm text-slate-400">{kpi.label}</p><div className="mt-3 flex items-end justify-between gap-3"><p className="text-2xl font-semibold tracking-tight text-white">{kpi.value}</p><span className={`text-xs font-medium ${kpi.color}`}>{kpi.change}</span></div><p className="mt-2 text-xs text-slate-500">vs. previous period</p></article>)}</div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(19rem,0.8fr)]">
        <article className="rounded-xl border border-white/10 bg-slate-900/60 p-5"><div className="flex items-start justify-between gap-4"><div><h2 className="text-base font-semibold text-white">Conversation trend</h2><p className="mt-1 text-sm text-slate-500">Incoming customer conversations</p></div><span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-200">439 total</span></div><div className="mt-7 h-56"><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible" role="img" aria-label="Seven-day conversation trend chart"><defs><linearGradient id="analytics-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity="0.28" /><stop offset="100%" stopColor="#22d3ee" stopOpacity="0" /></linearGradient></defs>{[20, 40, 60, 80].map((line) => <line key={line} x1="0" x2="100" y1={line} y2={line} stroke="currentColor" className="text-white/10" vectorEffect="non-scaling-stroke" />)}<polygon points={`0,100 ${trendPoints} 100,100`} fill="url(#analytics-fill)" /><polyline points={trendPoints} fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />{analyticsTrend.map((value, index) => <circle key={value} cx={(index / (analyticsTrend.length - 1)) * 100} cy={100 - ((value - 35) / 55) * 82} r="1.8" fill="#22d3ee" vectorEffect="non-scaling-stroke" />)}</svg></div><div className="mt-3 grid grid-cols-7 text-center text-xs text-slate-500">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day}>{day}</span>)}</div></article>

        <article className="rounded-xl border border-white/10 bg-slate-900/60 p-5"><h2 className="text-base font-semibold text-white">Resolution status</h2><p className="mt-1 text-sm text-slate-500">Current conversation distribution</p><div className="mt-7 flex justify-center"><div className="relative size-40 rounded-full" style={{ background: "conic-gradient(#22d3ee 0 71%, #fbbf24 71% 87%, #64748b 87% 100%)" }}><div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-slate-900"><span className="text-2xl font-semibold text-white">1,284</span><span className="text-xs text-slate-500">total</span></div></div></div><div className="mt-7 space-y-3">{[{ label: "Resolved", value: "71%", dot: "bg-cyan-400" }, { label: "Waiting", value: "16%", dot: "bg-amber-400" }, { label: "Open", value: "13%", dot: "bg-slate-400" }].map((item) => <div key={item.label} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-slate-300"><span className={`size-2 rounded-full ${item.dot}`} />{item.label}</span><span className="font-medium text-white">{item.value}</span></div>)}</div></article>
      </div>

      <article className="mt-6 rounded-xl border border-white/10 bg-slate-900/60 p-5"><div><h2 className="text-base font-semibold text-white">Channel breakdown</h2><p className="mt-1 text-sm text-slate-500">Where customers are reaching your team</p></div><div className="mt-6 grid gap-5 sm:grid-cols-2">{[{ label: "Email", count: "824 conversations", percent: 64, color: "bg-cyan-400" }, { label: "Chat", count: "460 conversations", percent: 36, color: "bg-violet-400" }].map((channel) => <div key={channel.label} className="rounded-lg bg-slate-950/60 p-4"><div className="flex items-center justify-between"><p className="font-medium text-slate-100">{channel.label}</p><span className="text-sm font-semibold text-white">{channel.percent}%</span></div><p className="mt-1 text-sm text-slate-500">{channel.count}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${channel.color}`} style={{ width: `${channel.percent}%` }} /></div></div>)}</div></article>
    </div>
  </div>;
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

          {activeItem === "Analytics" ? <AnalyticsView /> : activeItem === "Knowledge" ? <KnowledgeView /> : activeItem === "Settings" ? <SettingsView /> : activeItem !== "Inbox" ? <div className="flex flex-1 items-center justify-center p-6"><div className="max-w-sm rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center"><p className="text-lg font-semibold text-white">{activeItem}</p><p className="mt-2 text-sm leading-6 text-slate-400">This workspace area is ready for your team&apos;s information.</p><button type="button" onClick={() => setActiveItem("Inbox")} className="mt-5 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Back to Inbox</button></div></div> : <div className="grid min-h-0 flex-1 lg:grid-cols-[20rem_minmax(0,1fr)_minmax(20rem,0.8fr)]">
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
