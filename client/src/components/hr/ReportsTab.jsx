import { useState, useEffect } from "react";
import { PieChart, TrendingUp, Users, CheckCircle } from "lucide-react";
import { mockApi } from "../../services/mockApi";

export default function ReportsTab() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        try {
            setIsLoading(true);
            const data = await mockApi.getReportData();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="loading">Loading report analytics...</div>;
    if (!stats) return <div>No data available.</div>;

    return (
        <div className="reports-tab">
            <div className="tab-header">
                <h2 className="tab-title">Analytics & Reports</h2>
                <div className="date-picker">Last 30 Days</div>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon blue"><TrendingUp size={24} /></div>
                    <div className="metric-info">
                        <span className="metric-label">Avg Performance</span>
                        <span className="metric-value">{stats.avgPerformance}</span>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon green"><CheckCircle size={24} /></div>
                    <div className="metric-info">
                        <span className="metric-label">Task Completion</span>
                        <span className="metric-value">{stats.taskCompletionRate}%</span>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon purple"><Users size={24} /></div>
                    <div className="metric-info">
                        <span className="metric-label">On-Time Attendance</span>
                        <span className="metric-value">{stats.onTimeAttendance}%</span>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                {/* Department Distribution (CSS Bar Chart) */}
                <div className="chart-card large">
                    <h3>Department Distribution</h3>
                    <div className="bar-chart">
                        {Object.entries(stats.departmentBreakdown).map(([dept, count], index) => {
                            const percentage = (count / stats.totalEmployees) * 100;
                            return (
                                <div key={dept} className="bar-row">
                                    <div className="bar-label">{dept}</div>
                                    <div className="bar-track">
                                        <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                    <div className="bar-value">{count}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Placeholder for more complex visualization */}
                <div className="chart-card">
                    <h3>Performance Trends</h3>
                    <div className="trend-placeholder">
                        <div className="trend-line"></div>
                        <div className="trend-points">
                            <span style={{ bottom: '20%' }}></span>
                            <span style={{ bottom: '40%' }}></span>
                            <span style={{ bottom: '35%' }}></span>
                            <span style={{ bottom: '60%' }}></span>
                            <span style={{ bottom: '80%' }}></span>
                        </div>
                    </div>
                    <p className="chart-note">Employee efficiency up by 12%</p>
                </div>
            </div>

            <style jsx>{`
        .loading { padding: 40px; text-align: center; color: #64748b; }
        
        .tab-header {
            display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
        }
        .tab-title { font-size: 20px; font-weight: bold; color: #1e293b; margin: 0; }
        .date-picker { font-size: 14px; color: #64748b; background: #f1f5f9; padding: 6px 12px; border-radius: 6px; }

        .metrics-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px;
        }
        .metric-card {
            background: white; padding: 24px; border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            display: flex; align-items: center; gap: 16px;
        }
        .metric-icon { 
            width: 48px; height: 48px; border-radius: 10px; 
            display: flex; align-items: center; justify-content: center;
        }
        .metric-icon.blue { background: #eff6ff; color: #3b82f6; }
        .metric-icon.green { background: #f0fdf4; color: #22c55e; }
        .metric-icon.purple { background: #faf5ff; color: #a855f7; }

        .metric-info { display: flex; flex-direction: column; }
        .metric-label { font-size: 14px; color: #64748b; margin-bottom: 4px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #1e293b; }

        .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        
        .chart-card {
            background: white; padding: 24px; border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .chart-card h3 { margin: 0 0 20px 0; font-size: 16px; color: #334155; }

        .bar-chart { display: flex; flex-direction: column; gap: 16px; }
        .bar-row { display: flex; align-items: center; gap: 12px; font-size: 14px; }
        .bar-label { width: 100px; color: #64748b; }
        .bar-track { flex: 1; background: #f1f5f9; height: 8px; border-radius: 4px; overflow: hidden; }
        .bar-fill { height: 100%; background: #4f46e5; border-radius: 4px; }
        .bar-value { width: 30px; text-align: right; font-weight: 600; color: #1e293b; }

        /* Fake Trend Chart CSS */
        .trend-placeholder { 
            height: 150px; background: #f8fafc; border-radius: 8px; position: relative; 
            margin-bottom: 12px; overflow: hidden;
        }
        .trend-points span {
            position: absolute; width: 8px; height: 8px; background: #4f46e5; border-radius: 50%;
            left: 0;
        }
        .trend-points span:nth-child(1) { left: 10%; }
        .trend-points span:nth-child(2) { left: 30%; }
        .trend-points span:nth-child(3) { left: 50%; }
        .trend-points span:nth-child(4) { left: 70%; }
        .trend-points span:nth-child(5) { left: 90%; }
        
        .chart-note { font-size: 13px; color: #16a34a; margin: 0; text-align: center; }
      `}</style>
        </div>
    );
}
