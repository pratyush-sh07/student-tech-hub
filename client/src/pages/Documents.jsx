import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Search, 
  Trash2, 
  FileText, 
  Calendar, 
  Tag, 
  Filter, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FolderOpen,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Database,
  ExternalLink
} from 'lucide-react';

const DEPARTMENTS = ['All', 'HR', 'Engineering', 'Sales', 'Legal'];

const DEFAULT_DOCUMENTS = [
  {
    id: 'doc-1',
    title: 'Enterprise AI Security & Compliance Policy 2026',
    department: 'Legal',
    tags: ['Security', 'Compliance', 'GDPR', 'AI-Safety'],
    content: 'All enterprise AI tools and copilot sessions must adhere to SOC-2 Type II standards. Data processed through large language models must not be used for external training without explicit data isolation agreements. Internal access controls apply based on role-based access control (RBAC).',
    createdAt: '2026-09-18T10:30:00Z',
  },
  {
    id: 'doc-2',
    title: 'Employee Onboarding & Benefits Guide',
    department: 'HR',
    tags: ['Benefits', 'Health', 'PTO', 'Onboarding'],
    content: 'Full-time employees receive 25 days of annual paid time off (PTO) alongside standard corporate holidays. Comprehensive health, dental, and vision insurance begins on day 1 of employment. Annual wellness stipend is $1,200.',
    createdAt: '2026-09-22T14:15:00Z',
  },
  {
    id: 'doc-3',
    title: 'Microservices Deployment & Cloud Architecture',
    department: 'Engineering',
    tags: ['Kubernetes', 'CI/CD', 'FastAPI', 'Vite'],
    content: 'Services are deployed on AWS EKS using Helm charts. Production deployments require passing automated unit and integration tests with at least 80% coverage. All API endpoints must authenticate via JWT bearer tokens.',
    createdAt: '2026-09-28T09:00:00Z',
  },
  {
    id: 'doc-4',
    title: 'Q4 Enterprise Sales Playbook & Pricing Tiers',
    department: 'Sales',
    tags: ['Sales', 'Pricing', 'B2B', 'Contracts'],
    content: 'DocuSync AI enterprise tier is priced at $45 per user/month billed annually. Custom deployment and on-prem vector databases require an enterprise agreement signed by a VP or C-level executive.',
    createdAt: '2026-09-30T16:45:00Z',
  }
];

const Documents = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [toast, setToast] = useState(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDept, setFormDept] = useState('Engineering');
  const [formTags, setFormTags] = useState('');
  const [formContent, setFormContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // GET /api/documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const res = await client.get('/api/documents');
        const docs = Array.isArray(res.data) ? res.data : (res.data?.documents || []);
        if (docs.length > 0) {
          setDocuments(docs);
          localStorage.setItem('docusync_documents', JSON.stringify(docs));
        } else {
          loadSavedOrDefaults();
        }
      } catch (err) {
        console.warn('Backend unavailable, loading local documents cache:', err);
        loadSavedOrDefaults();
      } finally {
        setLoading(false);
      }
    };

    const loadSavedOrDefaults = () => {
      const saved = localStorage.getItem('docusync_documents');
      if (saved) {
        setDocuments(JSON.parse(saved));
      } else {
        setDocuments(DEFAULT_DOCUMENTS);
        localStorage.setItem('docusync_documents', JSON.stringify(DEFAULT_DOCUMENTS));
      }
    };

    fetchDocuments();
  }, []);

  // POST /api/documents
  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('Title and content are required', 'error');
      return;
    }

    setSubmitting(true);
    const newDoc = {
      id: 'doc-' + Date.now(),
      title: formTitle.trim(),
      department: formDept,
      tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
      content: formContent.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      const res = await client.post('/api/documents', newDoc);
      const savedDoc = res.data?.document || newDoc;
      const updated = [savedDoc, ...documents];
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast('Document successfully indexed in vector store!', 'success');
      resetModal();
    } catch (err) {
      console.warn('Backend POST fallback to local store:', err);
      const updated = [newDoc, ...documents];
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast('Document stored locally in offline mode', 'success');
      resetModal();
    } finally {
      setSubmitting(false);
    }
  };

  const resetModal = () => {
    setFormTitle('');
    setFormDept('Engineering');
    setFormTags('');
    setFormContent('');
    setIsModalOpen(false);
  };

  // DELETE /api/documents/:id
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to remove "${title}"?`)) return;

    try {
      await client.delete(`/api/documents/${id}`);
      const updated = documents.filter((d) => d.id !== id);
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast(`Document "${title}" removed`, 'success');
    } catch (err) {
      console.warn('Backend DELETE fallback to local sync:', err);
      const updated = documents.filter((d) => d.id !== id);
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast(`Document "${title}" deleted locally`, 'success');
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesDept = selectedDept === 'All' || doc.department?.toLowerCase() === selectedDept.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || 
      doc.title?.toLowerCase().includes(query) ||
      doc.content?.toLowerCase().includes(query) ||
      doc.tags?.some((t) => t.toLowerCase().includes(query));
    return matchesDept && matchesQuery;
  });

  const getDeptColor = (dept) => {
    switch (dept?.toLowerCase()) {
      case 'engineering':
        return 'text-[#38bdf8] bg-sky-950/40 border-sky-800/40';
      case 'hr':
        return 'text-[#c084fc] bg-purple-950/40 border-purple-800/40';
      case 'sales':
        return 'text-[#34d399] bg-emerald-950/40 border-emerald-800/40';
      case 'legal':
        return 'text-[#d9b482] bg-amber-950/40 border-amber-800/40';
      default:
        return 'text-[#d9b482] bg-amber-950/40 border-amber-800/40';
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recently indexed';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recently indexed';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto text-[#f7f2ea]">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-md animate-fade-in ${
          toast.type === 'error'
            ? 'bg-rose-950/90 border-rose-800/80 text-rose-200'
            : 'bg-emerald-950/90 border-emerald-800/80 text-emerald-200'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Controls Header */}
      <div
        className="px-8 py-6 backdrop-blur-md border-b"
        style={{
          background: 'rgba(20, 23, 33, 0.75)',
          borderColor: 'rgba(217, 180, 130, 0.18)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#faf6ef] tracking-tight flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-[#d9b482]" />
              <span>Organizational Knowledge Base</span>
            </h1>
            <p className="text-xs text-[#b8a692] mt-1">
              Browse, search, and ingest company documents for grounded AI Copilot retrieval
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#14110d] rounded-xl shadow-lg transition cursor-pointer self-start sm:self-auto hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, #d9b482, #f5e4cc, #c4975f)',
              boxShadow: '0 0 25px rgba(217, 180, 130, 0.35)',
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Ingest Document</span>
          </button>
        </div>

        {/* Filter bar and search input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-6">
          {/* Department filter tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-[#d9b482]/20 overflow-x-auto">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  selectedDept.toLowerCase() === dept.toLowerCase()
                    ? 'bg-gradient-to-r from-[#d9b482] to-[#c4975f] text-[#14110d] font-bold shadow'
                    : 'text-[#c4b5a3] hover:text-[#fff0dc] hover:bg-white/[0.04]'
                }`}
              >
                {dept === 'All' ? 'All Departments' : dept}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7b69]" />
            <input
              type="text"
              placeholder="Search title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs text-[#faf6ef] placeholder-[#7d6f5e] rounded-xl outline-none transition"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(217, 180, 130, 0.2)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.6)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.2)')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c7b69] hover:text-[#faf6ef]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#d9b482] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#b8a692] font-mono">Synchronizing knowledge vector store...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div
            className="py-16 px-6 text-center rounded-2xl max-w-lg mx-auto"
            style={{
              background: 'rgba(20, 23, 33, 0.75)',
              border: '1px dashed rgba(217, 180, 130, 0.3)',
            }}
          >
            <FolderOpen className="w-12 h-12 text-[#d9b482] mx-auto mb-3 opacity-60" />
            <h3 className="text-sm font-bold text-[#faf6ef] mb-1">No documents matched</h3>
            <p className="text-xs text-[#b8a692] mb-5">
              {searchQuery
                ? `No documents found matching "${searchQuery}". Try changing filters.`
                : 'No documents exist in this department scope yet.'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#14110d] rounded-xl cursor-pointer hover:scale-105 transition"
              style={{ background: 'linear-gradient(90deg, #d9b482, #f5e4cc)' }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Document</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                style={{
                  background: 'rgba(20, 23, 33, 0.85)',
                  border: '1px solid rgba(217, 180, 130, 0.2)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div>
                  {/* Top Bar: Dept + Delete */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${getDeptColor(
                        doc.department
                      )}`}
                    >
                      {doc.department}
                    </span>
                    <button
                      onClick={() => handleDelete(doc.id, doc.title)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-[#8c7b69] hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition cursor-pointer"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-[#faf6ef] group-hover:text-[#ffdca8] transition-colors line-clamp-2 mb-2 leading-snug">
                    {doc.title}
                  </h3>

                  {/* Snippet preview */}
                  <p className="text-xs text-[#b8a692] line-clamp-3 leading-relaxed mb-4">
                    {doc.content}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {doc.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-[#c4b5a3] border border-[#d9b482]/15 font-mono"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Metadata Footer */}
                  <div
                    className="pt-3 border-t flex items-center justify-between text-[11px] text-[#8c7b69]"
                    style={{ borderColor: 'rgba(217, 180, 130, 0.12)' }}
                  >
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(doc.createdAt)}
                    </span>
                    <span className="font-mono text-[10px] text-[#34d399] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                      Vector Ready
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ingest Document Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={resetModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 relative overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(20, 23, 33, 0.95)',
              border: '1px solid rgba(217, 180, 130, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#d9b482]/15 mb-5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#d9b482]" />
                <h3 className="text-base font-bold text-[#faf6ef]">Ingest Enterprise Document</h3>
              </div>
              <button
                onClick={resetModal}
                className="p-1 rounded-lg text-[#8c7b69] hover:text-[#faf6ef] hover:bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-[#cfbda9] mb-1.5">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Security Baseline 2026"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs text-[#faf6ef] placeholder-[#7d6f5e] rounded-xl outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(217, 180, 130, 0.2)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.2)')}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-[#cfbda9] mb-1.5">
                    Department *
                  </label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-[#faf6ef] rounded-xl outline-none"
                    style={{
                      background: 'rgba(16, 18, 25, 0.95)',
                      border: '1px solid rgba(217, 180, 130, 0.2)',
                    }}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-[#cfbda9] mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="EKS, Security, Policy"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#faf6ef] placeholder-[#7d6f5e] rounded-xl outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(217, 180, 130, 0.2)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-[#cfbda9] mb-1.5">
                  Document Content (Vector Text) *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Paste complete policy text, architectural specifications, or operational instructions..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full p-3.5 text-xs text-[#faf6ef] placeholder-[#7d6f5e] rounded-xl outline-none leading-relaxed resize-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(217, 180, 130, 0.2)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(217, 180, 130, 0.2)')}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-4 py-2 text-xs font-semibold text-[#b8a692] hover:text-[#faf6ef] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#14110d] flex items-center gap-2 hover:scale-105 transition shadow-lg disabled:opacity-60 cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #d9b482, #f5e4cc, #c4975f)',
                  }}
                >
                  {submitting ? (
                    <>
                      <span className="w-3 h-3 border-2 border-[#14110d] border-t-transparent rounded-full animate-spin" />
                      Ingesting into Vector Store...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ingest Document</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
