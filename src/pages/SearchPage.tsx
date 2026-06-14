import { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Tag, User, HelpCircle, PackageOpen } from 'lucide-react';
import { ItemCard } from '../components/ui/ItemCard';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ITEM_CATEGORIES, type Item } from '../types/database';
import './SearchPage.css';

// Mock items database
const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    user_id: 'u1',
    type: 'lost',
    title: 'MacBook Pro 14" (Space Grey)',
    description: 'Left it on the third floor of the Library, near the window desks. Has a sticker of a rocket on the back.',
    category: 'Electronics',
    location: 'Library',
    date: '2026-06-12',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Email: student1@college.edu',
    status: 'open',
    created_at: '2026-06-12T10:00:00Z',
    updated_at: '2026-06-12T10:00:00Z',
  },
  {
    id: '2',
    user_id: 'u2',
    type: 'found',
    title: 'Keyring with 3 Keys and Gym Badge',
    description: 'Found near the Cafeteria entrance benches. One key has a blue plastic cover.',
    category: 'Keys',
    location: 'Cafeteria',
    date: '2026-06-13',
    image_url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Drop off at library front desk',
    status: 'open',
    created_at: '2026-06-13T08:30:00Z',
    updated_at: '2026-06-13T08:30:00Z',
  },
  {
    id: '3',
    user_id: 'u3',
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
    id: '4',
    user_id: 'u4',
    type: 'found',
    title: 'Student ID Card - Emily Watson',
    description: 'Found on the ground outside the Science Block. Emily, please collect this at your convenience.',
    category: 'ID Cards & Documents',
    location: 'Science Block',
    date: '2026-06-13',
    image_url: 'https://images.unsplash.com/photo-1578358378071-77d29b6807d4?auto=format&fit=crop&w=600&q=80',
    contact_info: 'science block admin desk',
    status: 'open',
    created_at: '2026-06-13T09:15:00Z',
    updated_at: '2026-06-13T09:15:00Z',
  },
  {
    id: '5',
    user_id: 'u5',
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
    id: '6',
    user_id: 'u6',
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
  {
    id: '7',
    user_id: 'u7',
    type: 'lost',
    title: 'Black Casio G-Shock Watch',
    description: 'Left on the sink edge in the main Cafeteria restroom. Digital clock display with red accents.',
    category: 'Accessories',
    location: 'Cafeteria',
    date: '2026-06-09',
    image_url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Text or call 555-4921',
    status: 'open',
    created_at: '2026-06-09T10:15:00Z',
    updated_at: '2026-06-09T10:15:00Z',
  },
  {
    id: '8',
    user_id: 'u8',
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
    id: '9',
    user_id: 'u9',
    type: 'lost',
    title: 'Eastpak Backpack (Olive Green)',
    description: 'Contains a yellow water bottle and physics textbook. Forgotten near the parking lot benches.',
    category: 'Bags & Wallets',
    location: 'Parking Lot',
    date: '2026-06-08',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Call 555-8833',
    status: 'resolved',
    created_at: '2026-06-08T09:40:00Z',
    updated_at: '2026-06-11T15:30:00Z',
  },
  {
    id: '10',
    user_id: 'u10',
    type: 'found',
    title: 'Wireless Charging Pad (Black)',
    description: 'Found plugged in at Library Study Room 4. Brand is Anker.',
    category: 'Electronics',
    location: 'Library',
    date: '2026-06-13',
    image_url: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Leave message or drop by room 4',
    status: 'open',
    created_at: '2026-06-13T10:45:00Z',
    updated_at: '2026-06-13T10:45:00Z',
  },
  {
    id: '11',
    user_id: 'u11',
    type: 'lost',
    title: 'Wilson Basketball',
    description: 'Left on the outdoor basketball court next to the sports locker rooms.',
    category: 'Sports Equipment',
    location: 'Sports Complex',
    date: '2026-06-07',
    image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Email: bballfan@college.edu',
    status: 'claimed',
    created_at: '2026-06-07T18:00:00Z',
    updated_at: '2026-06-08T12:00:00Z',
  },
  {
    id: '12',
    user_id: 'u12',
    type: 'found',
    title: 'Gold Ring',
    description: 'Found inside Lab 3B on the Engineering block. Please verify with description of engravings inside.',
    category: 'Other',
    location: 'Lab',
    date: '2026-06-11',
    image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    contact_info: 'Claim at engineering reception',
    status: 'open',
    created_at: '2026-06-11T13:10:00Z',
    updated_at: '2026-06-11T13:10:00Z',
  },
];

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<'all' | 'lost' | 'found'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<'all' | 'open' | 'resolved' | 'claimed'>('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Compute filtered items list
  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = activeType === 'all' || item.type === activeType;
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesStatus = activeStatus === 'all' || item.status === activeStatus;

      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
  }, [searchQuery, activeType, activeCategory, activeStatus]);

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="search-page page-container">
      <div className="container">
        {/* Header */}
        <div className="search-page__header">
          <h1 className="section-title">Search Items</h1>
          <p className="section-subtitle">
            Search and filter the live database of lost and found logs on campus.
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-page__bar glass">
          <Search className="search-page__bar-icon" size={20} />
          <input
            type="text"
            className="search-page__input"
            placeholder="Search by title, keyword, or detail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters Panel */}
        <div className="search-page__filters glass-card">
          {/* Type Filter */}
          <div className="filter-group">
            <span className="filter-group__label">Type:</span>
            <div className="filter-group__chips">
              {(['all', 'lost', 'found'] as const).map((type) => (
                <button
                  key={type}
                  className={`filter-chip ${activeType === type ? 'filter-chip--active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <span className="filter-group__label">Status:</span>
            <div className="filter-group__chips">
              {(['all', 'open', 'resolved', 'claimed'] as const).map((status) => (
                <button
                  key={status}
                  className={`filter-chip ${activeStatus === status ? 'filter-chip--active' : ''}`}
                  onClick={() => setActiveStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <span className="filter-group__label">Category:</span>
            <div className="filter-group__chips select-chips">
              <button
                className={`filter-chip ${activeCategory === 'all' ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All Categories
              </button>
              {ITEM_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${activeCategory === cat ? 'filter-chip--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="search-page__results-meta">
          <span>Showing {filteredItems.length} items</span>
        </div>

        {/* Results Grid */}
        {filteredItems.length > 0 ? (
          <div className="search-page__grid">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onClick={handleCardClick} />
            ))}
          </div>
        ) : (
          <div className="search-page__empty glass-card">
            <PackageOpen size={64} className="search-page__empty-icon" />
            <h3 className="search-page__empty-title">No items found</h3>
            <p className="search-page__empty-desc">
              We couldn't find any matches. Try adjusting your query or resetting filters.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setActiveType('all');
                setActiveCategory('all');
                setActiveStatus('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedItem} onClose={handleCloseModal} title="Item Details">
        {selectedItem && (
          <div className="item-detail animate-scale-in">
            {selectedItem.image_url && (
              <div className="item-detail__image">
                <img src={selectedItem.image_url} alt={selectedItem.title} />
              </div>
            )}

            <div className="item-detail__content">
              <div className="item-detail__badges">
                <Badge variant={selectedItem.type === 'lost' ? 'lost' : 'found'}>
                  {selectedItem.type === 'lost' ? 'Lost' : 'Found'}
                </Badge>
                <Badge
                  variant={
                    selectedItem.status === 'open'
                      ? 'warning'
                      : selectedItem.status === 'resolved'
                      ? 'success'
                      : 'info'
                  }
                >
                  {selectedItem.status}
                </Badge>
              </div>

              <h2 className="item-detail__title">{selectedItem.title}</h2>

              <p className="item-detail__desc">
                {selectedItem.description || 'No description provided.'}
              </p>

              <div className="item-detail__meta">
                <div className="meta-row">
                  <Tag size={16} />
                  <span>
                    <strong>Category:</strong> {selectedItem.category}
                  </span>
                </div>
                <div className="meta-row">
                  <MapPin size={16} />
                  <span>
                    <strong>Location:</strong> {selectedItem.location}
                  </span>
                </div>
                <div className="meta-row">
                  <Calendar size={16} />
                  <span>
                    <strong>Date reported:</strong>{' '}
                    {new Date(selectedItem.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="meta-row">
                  <User size={16} />
                  <span>
                    <strong>Reporter ID:</strong> {selectedItem.user_id}
                  </span>
                </div>
              </div>

              <div className="item-detail__contact glass">
                <div className="contact-header">
                  <HelpCircle size={16} />
                  <h3>How to claim/contact</h3>
                </div>
                <p className="contact-body">
                  {selectedItem.contact_info ||
                    'Please contact campus reception desk or raise a dispute with the administration.'}
                </p>
              </div>

              <div className="item-detail__actions">
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close Window
                </Button>
                {selectedItem.type === 'lost' ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert('A notification has been sent to the owner.');
                      handleCloseModal();
                    }}
                  >
                    I Found This Item
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert('Claim request sent to administrators. Please carry your student ID.');
                      handleCloseModal();
                    }}
                  >
                    Claim Ownership
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
