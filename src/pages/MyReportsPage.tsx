import { useState } from 'react';
import { FileText, MapPin, Calendar, Check, Trash2, Plus, ArchiveRestore } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import type { Item } from '../types/database';
import './MyReportsPage.css';

// Mock owner items database
const INITIAL_MY_ITEMS: Item[] = [
  {
    id: 'mr1',
    user_id: 'owner_id',
    type: 'lost',
    title: 'Sony WH-1000XM4 Headphones',
    description: 'Silver colored Sony noise-canceling headphones, last seen in the Engineering Block Lab 2A.',
    category: 'Electronics',
    location: 'Engineering Block',
    date: '2026-06-10',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Contact: prof.smith@college.edu room 405',
    status: 'open',
    created_at: '2026-06-10T16:45:00Z',
    updated_at: '2026-06-10T16:45:00Z',
  },
  {
    id: 'mr2',
    user_id: 'owner_id',
    type: 'lost',
    title: 'Blue Hydro Flask (32oz)',
    description: 'Lost in the Sports Complex gym area. Has some scratches on the bottom.',
    category: 'Water Bottles',
    location: 'Sports Complex',
    date: '2026-06-11',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Text: 555-0192',
    status: 'open',
    created_at: '2026-06-11T14:20:00Z',
    updated_at: '2026-06-11T14:20:00Z',
  },
  {
    id: 'mr3',
    user_id: 'owner_id',
    type: 'found',
    title: 'Warm Beige Knit Scarf',
    description: 'Found draped over a chair in the Arts Building Lobby. Soft wool material.',
    category: 'Clothing',
    location: 'Arts Building',
    date: '2026-06-10',
    image_url: 'https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Left at arts building staff box',
    status: 'open',
    created_at: '2026-06-10T12:00:00Z',
    updated_at: '2026-06-10T12:00:00Z',
  },
  {
    id: 'mr4',
    user_id: 'owner_id',
    type: 'found',
    title: 'Calculus Lecture Notebook',
    description: 'Black spiral notebook with handwritten math notes. Found in the Auditorium row F seat 12.',
    category: 'Books & Notes',
    location: 'Auditorium',
    date: '2026-06-12',
    image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Left with the Auditorium supervisor Office 1B',
    status: 'resolved',
    created_at: '2026-06-12T11:30:00Z',
    updated_at: '2026-06-12T17:00:00Z',
  },
];

export function MyReportsPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [items, setItems] = useState<Item[]>(INITIAL_MY_ITEMS);

  const filteredItems = items.filter((item) => item.type === activeTab);

  const handleResolve = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'open' ? 'resolved' : 'open',
            }
          : item
      )
    );
    const item = items.find((i) => i.id === id);
    if (item) {
      const isNowResolved = item.status === 'open';
      addToast(
        `Item status updated to ${isNowResolved ? 'Resolved' : 'Open'}!`,
        'success'
      );
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      addToast('Report deleted successfully.', 'info');
    }
  };

  return (
    <div className="my-reports-page page-container">
      <div className="container">
        {/* Header */}
        <div className="my-reports-page__header">
          <div className="header-text">
            <h1 className="section-title">My Reports</h1>
            <p className="section-subtitle">
              Manage items you have reported lost or found on campus.
            </p>
          </div>
          <div className="header-actions">
            <Link to="/report/lost">
              <Button size="sm" variant="secondary" icon={<Plus size={16} />}>
                Report Lost
              </Button>
            </Link>
            <Link to="/report/found">
              <Button size="sm" variant="primary" icon={<Plus size={16} />}>
                Report Found
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="my-reports-page__tabs glass">
          <button
            className={`tab-btn ${activeTab === 'lost' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('lost')}
          >
            Lost Items
            <span className="tab-badge">
              {items.filter((i) => i.type === 'lost').length}
            </span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'found' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('found')}
          >
            Found Items
            <span className="tab-badge">
              {items.filter((i) => i.type === 'found').length}
            </span>
          </button>
        </div>

        {/* Reports List */}
        {filteredItems.length > 0 ? (
          <div className="my-reports-page__list">
            {filteredItems.map((item) => {
              const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div key={item.id} className="my-reports-card glass-card">
                  {item.image_url && (
                    <div className="my-reports-card__img">
                      <img src={item.image_url} alt={item.title} />
                    </div>
                  )}

                  <div className="my-reports-card__content">
                    <div className="my-reports-card__meta-top">
                      <Badge variant={item.type === 'lost' ? 'lost' : 'found'}>
                        {item.type}
                      </Badge>
                      <Badge
                        variant={
                          item.status === 'open'
                            ? 'warning'
                            : item.status === 'resolved'
                            ? 'success'
                            : 'info'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>

                    <h3 className="my-reports-card__title">{item.title}</h3>
                    <p className="my-reports-card__desc">{item.description}</p>

                    <div className="my-reports-card__meta-bottom">
                      <div className="meta-item">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="my-reports-card__actions">
                    <Button
                      variant={item.status === 'open' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleResolve(item.id)}
                      icon={item.status === 'open' ? <Check size={16} /> : <ArchiveRestore size={16} />}
                    >
                      {item.status === 'open' ? 'Mark Resolved' : 'Mark Open'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                      icon={<Trash2 size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="my-reports-page__empty glass-card">
            <FileText size={48} className="empty-icon" />
            <h3>No reports in this tab</h3>
            <p>You haven't logged any items under this status yet.</p>
            <Link to={activeTab === 'lost' ? '/report/lost' : '/report/found'}>
              <Button variant="primary">Create a Report</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
