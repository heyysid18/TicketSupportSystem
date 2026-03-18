const BASE = '/api/tickets';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const msg = data.errors?.join(', ') || 'Something went wrong';
    throw new Error(msg);
  }
  return data;
};

export const api = {
  getTickets: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE}${query ? `?${query}` : ''}`).then(handleResponse);
  },

  createTicket: (body) =>
    fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handleResponse),

  updateStatus: (id, status) =>
    fetch(`${BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then(handleResponse),
};
