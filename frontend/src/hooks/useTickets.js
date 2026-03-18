import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTickets = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getTickets(filters);
      setTickets(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTicket = useCallback(async (body) => {
    const res = await api.createTicket(body);
    setTickets((prev) => [res.data, ...prev]);
    return res;
  }, []);

  const updateStatus = useCallback(async (id, status) => {
    const res = await api.updateStatus(id, status);
    setTickets((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    return res;
  }, []);

  return { tickets, loading, error, fetchTickets, createTicket, updateStatus };
};
