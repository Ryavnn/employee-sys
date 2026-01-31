import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { Lock, User, Briefcase, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate network delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 800));

      const data = await mockApi.login(username, password);
      console.log("Login response:", data);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            role: data.role,
          })
        );
        switch (data.role) {
          case "hr":
            navigate("/dashboard-hr");
            break;
          case "manager":
            navigate("/dashboard-manager");
            break;
          case "employee":
            navigate("/dashboard-employee");
            break;
          default:
            setError("Unknown user role");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100%",   // Changed from 100vw to 100% to prevent horz scroll
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#f1f5f9",
      padding: "0",
      overflow: "hidden", // Strictly hide overflow
      boxSizing: "border-box", // Ensure consistent sizing
    },
    loginCard: {
      display: "flex",
      width: "100%",      // Full width
      height: "100%",     // Full height
      maxWidth: "none",   // No max width
      maxHeight: "none",  // No max height
      backgroundColor: "white",
      borderRadius: "0",  // No outer radius for full screen
      boxShadow: "none",  // Remove shadow
      overflow: "hidden",
    },
    brandSection: {
      flex: "1",
      // Changed to Primary Blue gradient to match buttons/accents
      backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px",
      color: "white",
      position: "relative",
      borderTopRightRadius: "30px",    // Restoring inner rounded corners
      borderBottomRightRadius: "30px", // Restoring inner rounded corners
    },
    brandContent: {
      position: "relative",
      zIndex: 10,
      maxWidth: "400px",
    },
    brandTitle: {
      fontSize: "42px",
      fontWeight: "800",
      marginBottom: "20px",
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      color: "white",
    },
    brandDescription: {
      fontSize: "16px",
      color: "rgba(255, 255, 255, 0.9)",
      lineHeight: "1.6",
    },
    decorativeCircle: {
      position: "absolute",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)",
      top: "-100px",
      right: "-100px",
    },
    formSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px",
      backgroundColor: "white",
    },
    formCard: {
      width: "100%",
      maxWidth: "380px",
    },
    header: {
      marginBottom: "32px",
      textAlign: "center",
    },
    welcomeText: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "8px",
    },
    subText: {
      color: "#64748b",
      fontSize: "14px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#475569",
      marginLeft: "4px",
    },
    inputWrapper: {
      position: "relative",
    },
    icon: {
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#94a3b8",
      transition: "color 0.2s ease",
    },
    input: {
      width: "100%",
      padding: "12px 16px 12px 42px",
      borderRadius: "10px",
      border: "1px solid #e2e8f0",
      fontSize: "14px",
      color: "#1e293b",
      outline: "none",
      transition: "all 0.2s ease",
      backgroundColor: "#f8fafc",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      marginTop: "10px",
      boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1)",
    },
    errorBox: {
      backgroundColor: "#fef2f2",
      border: "1px solid #fee2e2",
      color: "#ef4444",
      padding: "10px",
      borderRadius: "8px",
      fontSize: "13px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "16px",
    },
    copyright: {
      marginTop: "30px",
      textAlign: "center",
      fontSize: "12px",
      color: "#94a3b8",
    },
  };

  const getInputBorder = (field) => {
    if (focusedInput === field) return "2px solid #3b82f6";
    if (username && field === "username") return "1px solid #cbd5e1";
    if (password && field === "password") return "1px solid #cbd5e1";
    return "1px solid #e2e8f0";
  };

  const getInputIconColor = (field) => {
    return focusedInput === field ? "#3b82f6" : "#94a3b8";
  };

  return (
    <div style={styles.container}>
      {/* Centered Login Card */}
      <div style={styles.loginCard}>
        {/* Brand Side */}
        <div className="hidden-mobile" style={styles.brandSection}>
          <div style={styles.decorativeCircle}></div>
          <div style={styles.brandContent}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              {/* Text Only Logo */}
              <span style={{ fontSize: "28px", fontWeight: "800", color: "white", tracking: "wider" }}>EMS</span>
            </div>
            <h1 style={styles.brandTitle}>Manage your workforce with confidence.</h1>
            <p style={styles.brandDescription}>
              Streamline specific operations, track performance, and empower your team.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div style={styles.formSection}>
          <div style={styles.formCard}>
            <div style={styles.header}>
              <h2 style={styles.welcomeText}>Welcome back</h2>
              <p style={styles.subText}>Please enter your details to sign in.</p>
            </div>

            {error && (
              <div style={styles.errorBox}>
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="username">Username</label>
                <div style={styles.inputWrapper}>
                  <User
                    size={18}
                    style={{ ...styles.icon, color: getInputIconColor("username") }}
                  />
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    style={{ ...styles.input, border: getInputBorder("username") }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedInput("username")}
                    onBlur={() => setFocusedInput(null)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <div style={styles.inputWrapper}>
                  <Lock
                    size={18}
                    style={{ ...styles.icon, color: getInputIconColor("password") }}
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    style={{ ...styles.input, border: getInputBorder("password") }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.button,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                  transform: loading ? "none" : "translateY(0)"
                }}
                disabled={loading}
                onMouseOver={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseOut={(e) => !loading && (e.currentTarget.style.transform = "translateY(0)")}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div style={styles.copyright}>
              &copy; 2026 EMS Pro. All rights reserved.
            </div>
          </div>
        </div>
      </div>
      {/* Form Section */}


      <style jsx>{`
        @media (max-width: 900px) {
          .hidden-mobile {
            display: none !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
