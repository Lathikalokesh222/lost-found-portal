import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ItemCard } from '../components/ui/ItemCard';
import type { Item } from '../types/database';
import './HomePage.css';

// Mock recent items for preview
const MOCK_RECENT_ITEMS: Item[] = [
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
    contact_info: 'Contact emily.watson@college.edu or science block admin desk',
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
];

export function HomePage() {
  const [itemsFound, setItemsFound] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [dailyReports, setDailyReports] = useState(0);
  const [recoveryRate, setRecoveryRate] = useState(0);

  useEffect(() => {
    // Simple animated count-up effect on mount
    const duration = 1200; // ms
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setItemsFound(Math.floor(progress * 524));
      setActiveUsers(Math.floor(progress * 287));
      setDailyReports(Math.floor(progress * 42));
      setRecoveryRate(Math.floor(progress * 94));

      if (currentStep >= steps) {
        clearInterval(timer);
        setItemsFound(524);
        setActiveUsers(287);
        setDailyReports(42);
        setRecoveryRate(94);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="homepage page-container">
      {/* Hero Section */}
      <section className="homepage__hero">
        <div className="homepage__hero-bg">
          <div className="orb orb--1" />
          <div className="orb orb--2" />
        </div>
        <div className="container homepage__hero-content animate-fade-in-up">
          <h1 className="homepage__hero-title">
            Never Lose Track <br />
            <span className="gradient-text">Of Your Belongings</span>
          </h1>
          <p className="homepage__hero-subtitle">
            Findly is the smart, responsive Lost & Found platform designed specifically for college campuses.
            Report misplaced items, browse found logs, and reunite with your gear instantly.
          </p>
          <div className="homepage__hero-actions">
            <Link to="/report/lost">
              <Button size="lg" variant="primary">
                Report Lost Item
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="secondary">
                Search Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="homepage__how container">
        <div className="homepage__section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Reconnecting you with your items in three simple steps.
          </p>
        </div>

        <div className="homepage__how-grid">
          <div className="glass-card homepage__how-card animate-fade-in stagger-1">
            <div className="homepage__how-icon-wrapper color-red">
              <FileText size={24} />
            </div>
            <div className="homepage__how-number">01</div>
            <h3 className="homepage__how-card-title">Report Misplaced Items</h3>
            <p className="homepage__how-card-desc">
              Log lost or found items with photos, precise campus locations, categories, and descriptions.
            </p>
          </div>

          <div className="glass-card homepage__how-card animate-fade-in stagger-2">
            <div className="homepage__how-icon-wrapper color-purple">
              <Search size={24} />
            </div>
            <div className="homepage__how-number">02</div>
            <h3 className="homepage__how-card-title">Search & Verify</h3>
            <p className="homepage__how-card-desc">
              Browse our live database. Filter by tags, dates, and locations to find what you are looking for.
            </p>
          </div>

          <div className="glass-card homepage__how-card animate-fade-in stagger-3">
            <div className="homepage__how-icon-wrapper color-green">
              <Users size={24} />
            </div>
            <div className="homepage__how-number">03</div>
            <h3 className="homepage__how-card-title">Safe Handover</h3>
            <p className="homepage__how-card-desc">
              Securely communicate to verify ownership and arrange a safe campus meetup or desk pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="homepage__stats container">
        <div className="homepage__stats-grid">
          <div className="glass-card homepage__stat-card">
            <div className="homepage__stat-num gradient-text">{itemsFound}+</div>
            <div className="homepage__stat-label">Items Reunited</div>
          </div>
          <div className="glass-card homepage__stat-card">
            <div className="homepage__stat-num gradient-text">{activeUsers}+</div>
            <div className="homepage__stat-label">Active Campus Users</div>
          </div>
          <div className="glass-card homepage__stat-card">
            <div className="homepage__stat-num gradient-text">{dailyReports}</div>
            <div className="homepage__stat-label">Daily Logs Resolved</div>
          </div>
          <div className="glass-card homepage__stat-card">
            <div className="homepage__stat-num gradient-text">{recoveryRate}%</div>
            <div className="homepage__stat-label">Successful Matches</div>
          </div>
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="homepage__recent container">
        <div className="homepage__section-header">
          <h2 className="section-title">Recently Reported</h2>
          <p className="section-subtitle">
            Take a look at the latest items reported lost or found around the campus grounds.
          </p>
        </div>

        <div className="homepage__recent-grid">
          {MOCK_RECENT_ITEMS.map((item, idx) => (
            <div key={item.id} className={`animate-fade-in stagger-${(idx % 3) + 1}`}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        <div className="homepage__recent-actions">
          <Link to="/search">
            <Button variant="secondary">View All Items</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
