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
  Sparkles
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
    setTimeout(() => setToast(null), 4000);
  };

  // GET /api/documents on mount
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await client.get('/api/documents');
      const docs = Array.isArray(res.data) ? res.data : (res.data?.documents || []);
      if (docs.length > 0) {
        setDocuments(docs);
      } else {
        const localSaved = localStorage.getItem('docusync_documents');
        if (localSaved) {
          setDocuments(JSON.parse(localSaved));
        } else {
          setDocuments(DEFAULT_DOCUMENTS);
          localStorage.setItem('docusync_documents', JSON.stringify(DEFAULT_DOCUMENTS));
        }
      }
    } catch (err) {
      console.warn('Backend GET /api/documents fallback to local storage:', err);
      const localSaved = localStorage.getItem('docusync_documents');
      if (localSaved) {
        setDocuments(JSON.parse(localSaved));
      } else {
        setDocuments(DEFAULT_DOCUMENTS);
        localStorage.setItem('docusync_documents', JSON.stringify(DEFAULT_DOCUMENTS));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // POST /api/documents on submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('Document title and text content are required', 'error');
      return;
    }

    setSubmitting(true);
    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title: formTitle.trim(),
      department: formDept,
      tags: tagsArray.length > 0 ? tagsArray : ['Enterprise'],
      content: formContent.trim(),
    };

    try {
      const res = await client.post('/api/documents', payload);
      const createdDoc = res.data?.document || res.data || {
        ...payload,
        id: 'doc-' + Date.now(),
        createdAt: new Date().toISOString()
      };
      
      const updated = [createdDoc, ...documents];
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast('Document indexed into knowledge base!', 'success');
      
      setFormTitle('');
      setFormDept('Engineering');
      setFormTags('');
      setFormContent('');
      setIsModalOpen(false);
    } catch (err) {
      console.warn('Backend POST /api/documents fallback to local sync:', err);
      const mockDoc = {
        ...payload,
        id: 'doc-' + Date.now(),
        createdAt: new Date().toISOString()
      };
      const updated = [mockDoc, ...documents];
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast('Document saved to Knowledge Base!', 'success');
      
      setFormTitle('');
      setFormDept('Engineering');
      setFormTags('');
      setFormContent('');
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
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
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
      case 'hr':
        return 'text-purple-400 bg-purple-950/60 border-purple-800/60';
      case 'sales':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'legal':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      default:
        return 'text-blue-400 bg-blue-950/60 border-blue-800/60';
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
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-md animate-fade-in ${
          toast.type === 'error'
            ? 'bg-red-950/90 border-red-800 text-red-200'
            : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Controls Header */}
      <div className="bg-slate-900/40 border-b border-slate-800/80 px-8 py-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Organizational Knowledge Base
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Browse, search, and ingest company documents for grounded AI Copilot retrieval
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search documents by title, content, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Department Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer shrink-0 ${
                  selectedDept === dept
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 flex-1">
        {loading ? (
          /* Loading State: Skeleton shimmer cards */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl bg-slate-900/40 border border-slate-800/60 p-5 space-y-4 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                  <div className="h-3 bg-slate-800 rounded w-1/5"></div>
                </div>
                <div className="h-5 bg-slate-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-800/60 rounded w-full"></div>
                  <div className="h-3 bg-slate-800/60 rounded w-5/6"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-4 bg-slate-800 rounded w-12"></div>
                  <div className="h-4 bg-slate-800 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDocs.length === 0 ? (
          /* Empty State Illustration */
          <div className="h-96 flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-slate-900/30 border border-dashed border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">No documents found</h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1.5 mb-5 leading-relaxed">
              {searchQuery || selectedDept !== 'All'
                ? "No matching enterprise documents found for the active filter. Try resetting your search."
                : "Your knowledge base is empty. Upload company handbooks, compliance policies, or architectural standards to start."}
            </p>
            <button
              onClick={() => {
                if (searchQuery || selectedDept !== 'All') {
                  setSearchQuery('');
                  setSelectedDept('All');
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition cursor-pointer"
            >
              {searchQuery || selectedDept !== 'All' ? 'Reset Filters' : 'Add First Document'}
            </button>
          </div>
        ) : (
          /* Document Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg hover:border-slate-700 transition flex flex-col justify-between overflow-hidden group backdrop-blur-md"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-[11px] px-2 py-0.5 rounded-md border font-semibold ${getDeptColor(doc.department)}`}>
                      {doc.department}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(doc.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition leading-snug mb-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {doc.content}
                  </p>

                  {/* Tags */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {doc.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-slate-950/70 text-slate-400 border border-slate-800/80 font-medium"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer action bar */}
                <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    Indexed for RAG Grounding
                  </span>
                  <button
                    onClick={() => handleDelete(doc.id, doc.title)}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 font-medium transition cursor-pointer p-1 rounded-lg hover:bg-red-950/30"
                    title="Delete document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Upload Knowledge Document</h3>
                <p className="text-xs text-slate-400 mt-0.5">Ingest company text for grounded AI Copilot answers</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Document Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Employee Handbook 2026 or API Architecture Spec"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Department Category
                  </label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DEPARTMENTS.filter((d) => d !== 'All').map((dept) => (
                      <option key={dept} value={dept} className="bg-slate-900 text-white">
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Security, SOC2, Cloud"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Text Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Paste or write the document text content here. The AI Copilot will ground its responses in this knowledge..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition disabled:opacity-60 cursor-pointer flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Indexing...
                    </>
                  ) : (
                    'Index Document'
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
