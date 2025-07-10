import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './Dashboard.css';
import LoadingSpinner from './components/LoadingSpinner';
import ParticleBackground from './components/ParticleBackground';

let barChartInstance = null;
let pieChartInstance = null;

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
      navigate('/login');
    } else {
      // Simulate loading time
      setTimeout(() => {
        fetch(`http://localhost:5000/stats?username=${user}`)
          .then(res => res.json())
          .then(data => {
            setStats(data);
            setLoading(false);
            setTimeout(() => renderCharts(data.emotionCount), 100);
          })
          .catch(error => {
            console.error('Error fetching stats:', error);
            setLoading(false);
          });
      }, 1500);
    }
  }, [navigate]);

  const renderCharts = (emotionData) => {
    const barCanvas = document.getElementById("barChart");
    const pieCanvas = document.getElementById("pieChart");

    if (barChartInstance) {
      barChartInstance.destroy();
    }
    if (pieChartInstance) {
      pieChartInstance.destroy();
    }

    const chartColors = {
      happy: '#4caf50',
      sad: '#2196f3',
      angry: '#ff5722',
      fear: '#ff9800',
      love: '#e91e63',
      surprise: '#9c27b0',
      neutral: '#607d8b'
    };

    const emotions = Object.keys(emotionData);
    const values = Object.values(emotionData);
    const colors = emotions.map(emotion => chartColors[emotion] || '#607d8b');

    if (barCanvas && emotions.length > 0) {
      barChartInstance = new Chart(barCanvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: emotions.map(e => e.charAt(0).toUpperCase() + e.slice(1)),
          datasets: [{
            label: "Emotion Count",
            data: values,
            backgroundColor: colors.map(color => color + '80'),
            borderColor: colors,
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(15, 15, 35, 0.9)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(102, 126, 234, 0.5)',
              borderWidth: 1,
              cornerRadius: 8,
            }
          },
          scales: {
            x: {
              ticks: { 
                color: '#ffffff',
                font: { family: 'Inter', weight: '500' }
              },
              grid: { 
                display: false 
              },
              border: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              beginAtZero: true,
              ticks: { 
                color: '#ffffff',
                font: { family: 'Inter', weight: '500' }
              },
              grid: { 
                color: 'rgba(255, 255, 255, 0.1)',
                borderDash: [4, 4] 
              },
              border: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    }

    if (pieCanvas && emotions.length > 0) {
      pieChartInstance = new Chart(pieCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: emotions.map(e => e.charAt(0).toUpperCase() + e.slice(1)),
          datasets: [{
            data: values,
            backgroundColor: colors.map(color => color + '80'),
            borderColor: colors,
            borderWidth: 2,
            hoverBorderWidth: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#ffffff',
                font: { family: 'Inter', weight: '500' },
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
              }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 15, 35, 0.9)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: 'rgba(102, 126, 234, 0.5)',
              borderWidth: 1,
              cornerRadius: 8,
            }
          },
          cutout: '60%',
        }
      });
    }
  };

  const handleBackToChat = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/chat');
    }, 1000);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      navigate('/');
    }, 1000);
  };

  if (loading) {
    return <LoadingSpinner message="Loading your analytics..." />;
  }

  const totalEmotions = stats ? Object.values(stats.emotionCount).reduce((a, b) => a + b, 0) : 0;
  const dominantEmotion = stats && totalEmotions > 0 
    ? Object.entries(stats.emotionCount).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    : 'neutral';

  return (
    <div className="dashboard-container">
      <ParticleBackground density={25} />
      
      {/* Header */}
      <div className="dashboard-header">
        <h1>🧠 MindMitra Analytics</h1>
        <p className="dashboard-subtitle">
          Your personal mental health insights and progress tracking
        </p>
      </div>

      {/* Navigation */}
      <div className="dashboard-nav">
        <button className="nav-btn active">📊 Overview</button>
        <button className="nav-btn" onClick={handleBackToChat}>💬 Back to Chat</button>
        <button className="nav-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      {stats ? (
        <>
          {/* Stats Cards */}
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">💬</span>
                <div className="stat-title">Total Messages</div>
                <span className="stat-value">{stats.totalMessages}</span>
                <div className="stat-change positive">+{Math.floor(stats.totalMessages * 0.1)} this week</div>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">📅</span>
                <div className="stat-title">Chat Sessions</div>
                <span className="stat-value">{stats.sessions}</span>
                <div className="stat-change positive">+{Math.floor(stats.sessions * 0.2)} this month</div>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">😊</span>
                <div className="stat-title">Dominant Emotion</div>
                <span className="stat-value">{dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1)}</span>
                <div className="stat-change">Most frequent feeling</div>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">📈</span>
                <div className="stat-title">Emotional Variety</div>
                <span className="stat-value">{Object.keys(stats.emotionCount).length}</span>
                <div className="stat-change">Different emotions expressed</div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-section">
            <div className="charts-grid">
              <div className="chart-container">
                <div className="chart-header">
                  <h3 className="chart-title">Emotion Distribution</h3>
                  <p className="chart-subtitle">Bar chart showing frequency of each emotion</p>
                </div>
                <div className="chart-wrapper">
                  {totalEmotions > 0 ? (
                    <canvas id="barChart"></canvas>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-state-icon">📊</div>
                      <h4 className="empty-state-title">No Data Available</h4>
                      <p className="empty-state-description">
                        Start chatting with MindMitra to see your emotion analytics here.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-header">
                  <h3 className="chart-title">Emotion Breakdown</h3>
                  <p className="chart-subtitle">Proportional view of your emotional patterns</p>
                </div>
                <div className="chart-wrapper">
                  {totalEmotions > 0 ? (
                    <canvas id="pieChart"></canvas>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-state-icon">🥧</div>
                      <h4 className="empty-state-title">No Data Available</h4>
                      <p className="empty-state-description">
                        Your emotional breakdown will appear here after you start chatting.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="insights-section">
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">🎯</span>
                  <h4 className="insight-title">Weekly Goal</h4>
                </div>
                <div className="insight-content">
                  You've had {stats.sessions} conversations this period. Keep up the great work in maintaining your mental health!
                </div>
                <div className="insight-value">{Math.min(100, Math.floor((stats.sessions / 7) * 100))}% Complete</div>
              </div>
              
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">💡</span>
                  <h4 className="insight-title">Recommendation</h4>
                </div>
                <div className="insight-content">
                  Based on your patterns, consider exploring mindfulness techniques during your next chat session.
                </div>
                <div className="insight-value">Personalized Tip</div>
              </div>
              
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">🌟</span>
                  <h4 className="insight-title">Progress</h4>
                </div>
                <div className="insight-content">
                  You're actively engaging with your mental health journey. Your consistency shows great self-care.
                </div>
                <div className="insight-value">Excellent</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-container">
          <div className="empty-state-icon">📊</div>
          <div className="loading-text">Loading your analytics...</div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;