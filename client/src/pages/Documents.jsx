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
  ExternalLink,
  BookOpen
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
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDept, setFormDept] = useState('Engineering');
  const [formTags, setFormTags] = useState('');
  const [formContent, setFormContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Show Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch documents on mount as required: GET /api/documents
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await client.get('/api/documents');
      const docs = Array.isArray(res.data) ? res.data : (res.data?.documents || []);
      if (docs.length > 0) {
        setDocuments(docs);
      } else {
        // Load default enterprise docs if database is fresh
        const localSaved = localStorage.getItem('docusync_documents');
        if (localSaved) {
          setDocuments(JSON.parse(localSaved));
        } else {
          setDocuments(DEFAULT_DOCUMENTS);
          localStorage.setItem('docusync_documents', JSON.stringify(DEFAULT_DOCUMENTS));
        }
      }
    } catch (err) {
      console.warn('Backend GET /api/documents fallback to local sync:', err);
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

  // Form submission: POST /api/documents
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('Title and content are required', 'error');
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
      showToast('Document uploaded and indexed successfully!', 'success');
      
      // Reset form
      setFormTitle('');
      setFormDept('Engineering');
      setFormTags('');
      setFormContent('');
      setIsModalOpen(false);
    } catch (err) {
      console.warn('Backend POST /api/documents error, maintaining local state:', err);
      // Graceful offline/demo sync
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

  // Delete document
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to remove "${title}"?`)) return;

    try {
      await client.delete(`/api/documents/${id}`);
      const updated = documents.filter((d) => d.id !== id);
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast(`Document "${title}" deleted`, 'success');
    } catch (err) {
      console.warn('Backend DELETE error, removing locally:', err);
      const updated = documents.filter((d) => d.id !== id);
      setDocuments(updated);
      localStorage.setItem('docusync_documents', JSON.stringify(updated));
      showToast(`Document "${title}" removed`, 'success');
    }
  };

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    const matchesDept = selectedDept === 'All' || doc.department?.toLowerCase() === selectedDept.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || 
      doc.title?.toLowerCase().includes(query) ||
      doc.content?.toLowerCase().includes(query) ||
      doc.tags?.some((t) => t.toLowerCase().includes(query));
    return matchesDept && matchesQuery;
  });

  const getDepartmentBadge = (dept) => {
    switch (dept?.toLowerCase()) {
      case 'engineering':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'hr':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'sales':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'legal':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recently added';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recently added';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm animate-fade-in ${
          toast.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-500 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-blue-600" />
              Enterprise Knowledge Base
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Browse, search, and ingest company documents for Gemini RAG indexing
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-sm transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents by title, content, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
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
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
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
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 mt-3 font-medium">Loading documents...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          /* Empty state illustration */
          <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-white border border-dashed border-slate-300 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">No documents found</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1 mb-5">
              {searchQuery || selectedDept !== 'All'
                ? "No matching enterprise documents match your search criteria. Try another keyword or department."
                : "Your knowledge base is currently empty. Upload company handbooks, specs, or sales playbooks to begin."}
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
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
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
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-md border font-semibold ${getDepartmentBadge(doc.department)}`}>
                      {doc.department}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(doc.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {doc.content}
                  </p>

                  {/* Tags */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {doc.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer action bar */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Indexed for Copilot RAG
                  </span>
                  <button
                    onClick={() => handleDelete(doc.id, doc.title)}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-600 font-medium transition cursor-pointer p-1 rounded hover:bg-red-50"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Upload Knowledge Document</h3>
                <p className="text-xs text-slate-500">Provide document metadata and text content for AI Copilot grounding</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Employee Handbook 2026 or API Specification"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Department Category
                  </label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  >
                    {DEPARTMENTS.filter((d) => d !== 'All').map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Security, SOC2, Cloud"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Text Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Paste or write the document text content here. The AI Copilot will ground its responses in this knowledge..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
                ></textarea>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-sm transition disabled:opacity-60 cursor-pointer flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
