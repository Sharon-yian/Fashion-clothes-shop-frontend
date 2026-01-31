import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import orderApi from '../../api/orderApi';
import Loader from '../../components/Loader';
import './AnalyticsDashboard.css';

// Register Chart.js components ONCE (outside component)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await orderApi.getAdminAnalytics(); // Implement this in orderApi.js
        setAnalytics(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <Loader />;
  if (error || !analytics) return <div className="alert alert-error">{error || 'No data available'}</div>;

  // ===== CHART CONFIGURATIONS =====
  // 1. Orders Trend (Line Chart)
  const ordersTrendData = {
    labels: analytics.ordersTrend.map(item => format(new Date(item.date), 'MMM d')),
    datasets: [{
      label: 'Orders',
      data: analytics.ordersTrend.map(item => item.count),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 3
    }]
  };

  const ordersTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  // 2. Status Distribution (Pie Chart)
  const statusPieData = {
    labels: analytics.statusDistribution.map(item => item.status),
    datasets: [{
      data: analytics.statusDistribution.map(item => item.count),
      backgroundColor: [
        'rgb(245, 158, 11)', // pending
        'rgb(59, 130, 246)',  // processing
        'rgb(16, 185, 129)',  // delivered
        'rgb(220, 38, 38)'    // cancelled
      ],
      borderWidth: 0
    }]
  };

  // 3. Revenue Trend (Bar Chart)
  const revenueTrendData = {
    labels: analytics.revenueTrend.map(item => format(new Date(item.date), 'MMM d')),
    datasets: [{
      label: 'Revenue ($)',
      data: analytics.revenueTrend.map(item => item.revenue),
      backgroundColor: 'rgba(139, 92, 246, 0.7)',
      borderRadius: 4
    }]
  };

  return (
    <div className="analytics-dashboard p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Order Analytics Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: analytics.summary.totalOrders, icon: '📦' },
          { label: 'Total Revenue', value: `$${analytics.summary.totalRevenue.toFixed(2)}`, icon: '💰' },
          { label: 'Avg. Order Value', value: `$${analytics.summary.avgOrderValue.toFixed(2)}`, icon: '📈' },
          { label: 'Pending Orders', value: analytics.summary.pendingOrders, icon: '⏳' }
        ].map((card, i) => (
          <div key={i} className="summary-card bg-white rounded-xl shadow p-5 border border-gray-100">
            <div className="text-3xl mb-1">{card.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{card.value}</div>
            <div className="text-gray-500 text-sm">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Trend */}
        <div className="chart-container bg-white rounded-xl shadow p-5 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded mr-2"></span>
            Orders Trend (Last 30 Days)
          </h2>
          <div style={{ height: '300px' }}>
            <Line data={ordersTrendData} options={ordersTrendOptions} />
          </div>
        </div>

        {/* Status Distribution */}
        <div className="chart-container bg-white rounded-xl shadow p-5 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-3 h-3 bg-amber-400 rounded mr-2"></span>
            Order Status Distribution
          </h2>
          <div style={{ height: '300px' }}>
            <Pie 
              data={statusPieData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
              }} 
            />
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="chart-container bg-white rounded-xl shadow p-5 border border-gray-100 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded mr-2"></span>
            Revenue Trend (Last 30 Days)
          </h2>
          <div style={{ height: '350px' }}>
            <Bar 
              data={revenueTrendData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                  x: { grid: { display: false } }
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;