import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state safely on page refresh
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token') || localStorage.getItem('emailKey');
      const storedRole = localStorage.getItem('userRole');
      const storedUserData = localStorage.getItem('userData') || 
                             localStorage.getItem('user') || 
                             localStorage.getItem('owner');

      if (storedToken) {
        setToken(storedToken);
        setRole(storedRole || 'user');
        if (storedUserData) {
          try {
            setUser(JSON.parse(storedUserData));
          } catch (e) {
            setUser(null);
          }
        }
      }
    } catch (err) {
      console.error('Failed to restore auth session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, authToken, userRole = 'user') => {
    setUser(userData);
    setToken(authToken);
    setRole(userRole);

    localStorage.setItem('token', authToken);
    localStorage.setItem('emailKey', authToken); // backward compatibility
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Role-specific storage for legacy component support
    if (userRole === 'owner') {
      localStorage.setItem('owner', JSON.stringify(userData));
    } else if (userRole === 'user') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);

    localStorage.removeItem('token');
    localStorage.removeItem('emailKey');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
    localStorage.removeItem('owner');
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('userData', JSON.stringify(updated));
      if (role === 'owner') {
        localStorage.setItem('owner', JSON.stringify(updated));
      } else if (role === 'user') {
        localStorage.setItem('user', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const value = {
    user,
    token,
    role,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
