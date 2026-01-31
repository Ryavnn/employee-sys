import { useState, useEffect } from "react";
import { Star, Plus, User, Calendar } from "lucide-react";
import { mockApi } from "../../services/mockApi";

export default function PerformanceTab() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // State for new review form
    const [employees, setEmployees] = useState([]);
    const [newReview, setNewReview] = useState({
        employeeId: "",
        rating: 5,
        feedback: "",
        reviewer: "HR Manager" // In real app, this comes from auth user
    });

    useEffect(() => {
        fetchReviews();
        fetchEmployees();
    }, []);

    const fetchReviews = async () => {
        try {
            setIsLoading(true);
            const data = await mockApi.getPerformanceReviews();
            if (data.success) setReviews(data.reviews);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const data = await mockApi.getEmployees();
            if (data.success) setEmployees(data.employees);
        } catch (err) { console.error(err); }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!newReview.employeeId) return alert("Please select an employee");

        try {
            const selectedEmployee = employees.find(e => e.id === parseInt(newReview.employeeId));

            const payload = {
                ...newReview,
                employeeName: selectedEmployee ? selectedEmployee.name : "Unknown",
                employeeId: parseInt(newReview.employeeId)
            };

            const data = await mockApi.addPerformanceReview(payload);
            if (data.success) {
                setReviews([data.review, ...reviews]);
                setShowModal(false);
                setNewReview({ ...newReview, feedback: "", rating: 5, employeeId: "" });
            }
        } catch (err) {
            alert("Failed to submit review");
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < Math.round(rating) ? "fill-star" : "empty-star"}
                    />
                ))}
                <span className="rating-text">{rating}/5</span>
            </div>
        );
    };

    return (
        <div className="performance-tab">
            <div className="tab-header">
                <h2 className="tab-title">Performance Reviews</h2>
                <button className="add-btn" onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    New Evaluation
                </button>
            </div>

            <div className="reviews-grid">
                {isLoading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="card-top">
                                <div className="user-info">
                                    <div className="avatar">{review.employeeName.charAt(0)}</div>
                                    <div>
                                        <h3 className="employee-name">{review.employeeName}</h3>
                                        <p className="review-date">
                                            {new Date(review.reviewDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                {renderStars(review.rating)}
                            </div>
                            <div className="card-body">
                                <p className="feedback-text">"{review.feedback}"</p>
                            </div>
                            <div className="card-footer">
                                <span className="reviewer">Reviewed by: {review.reviewer}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="modal-title">New Performance Evaluation</h3>
                        <form onSubmit={handleAddReview}>
                            <div className="form-group">
                                <label>Employee</label>
                                <select
                                    value={newReview.employeeId}
                                    onChange={(e) => setNewReview({ ...newReview, employeeId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Employee...</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Rating (1-5)</label>
                                <div className="rating-input">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={`star-btn ${newReview.rating >= star ? 'active' : ''}`}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                        >
                                            <Star size={24} className={newReview.rating >= star ? 'fill-star-btn' : ''} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Feedback</label>
                                <textarea
                                    rows="4"
                                    value={newReview.feedback}
                                    onChange={(e) => setNewReview({ ...newReview, feedback: e.target.value })}
                                    required
                                    placeholder="Enter detailed feedback..."
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="submit-btn" disabled={!newReview.employeeId}>Submit Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
        .tab-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 24px;
        }
        .tab-title { font-size: 20px; font-weight: bold; color: #1e293b; }
        
        .add-btn {
           display: flex;
           align-items: center;
           gap: 8px;
           background-color: #4f46e5;
           color: white;
           padding: 10px 16px;
           border-radius: 8px;
           border: none;
           font-weight: 500;
           cursor: pointer;
        }

        .reviews-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
           gap: 20px;
        }

        .review-card {
           background: white;
           padding: 20px;
           border-radius: 12px;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
           border: 1px solid #e2e8f0;
        }

        .card-top {
           display: flex;
           justify-content: space-between;
           align-items: flex-start;
           margin-bottom: 16px;
        }

        .user-info { display: flex; gap: 12px; align-items: center; }
        .avatar {
           width: 40px; height: 40px;
           background-color: #f3e8ff; color: #9333ea;
           border-radius: 50%;
           display: flex; justify-content: center; align-items: center;
           font-weight: bold;
        }
        .employee-name { font-weight: 600; font-size: 16px; margin: 0; color: #1e293b; }
        .review-date { font-size: 12px; color: #64748b; margin: 0; }

        .star-rating { display: flex; align-items: center; gap: 2px; }
        .fill-star { color: #eab308; fill: #eab308; }
        .empty-star { color: #cbd5e1; }
        .rating-text { margin-left: 6px; font-size: 14px; font-weight: 500; color: #1e293b; }

        .feedback-text {
           font-style: italic;
           color: #334155;
           font-size: 14px;
           line-height: 1.5;
           margin: 0 0 16px 0;
           min-height: 60px;
        }

        .card-footer {
           border-top: 1px solid #f1f5f9;
           padding-top: 12px;
           font-size: 12px;
           color: #94a3b8;
           text-align: right;
        }

        /* Modal Styles */
        .modal-overlay {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex; justify-content: center; align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: white; padding: 24px;
            border-radius: 12px; width: 100%; max-width: 500px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .modal-title { margin-top: 0; color: #1e293b; }
        
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #475569; }
        .form-group select, .form-group textarea {
            width: 100%; padding: 10px;
            border: 1px solid #cbd5e1; border-radius: 8px;
            font-size: 14px;
        }
        
        .rating-input { display: flex; gap: 8px; }
        .star-btn {
            background: none; border: none; cursor: pointer; color: #cbd5e1;
            transition: transform 0.1s;
        }
        .star-btn:hover { transform: scale(1.1); }
        .fill-star-btn { color: #eab308; fill: #eab308; }

        .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
        .cancel-btn {
            background: #f1f5f9; color: #475569;
            padding: 10px 20px; border-radius: 8px; border: none; font-weight: 500; cursor: pointer;
        }
        .submit-btn {
            background: #4f46e5; color: white;
            padding: 10px 20px; border-radius: 8px; border: none; font-weight: 500; cursor: pointer;
        }
        .submit-btn:disabled { background: #cbd5e1; cursor: not-allowed; }
      `}</style>
        </div>
    );
}
