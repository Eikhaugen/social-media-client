import { logout } from '../../src/js/api/auth/logout.js';

global.localStorage = {
  store: {},

  getItem(key) {
    return this.store[key] || null;
  },

  setItem(key, value) {
    this.store[key] = String(value);
  },

  clear() {
    this.store = {};
  },

  removeItem(key) {
    delete this.store[key];
  }
};

describe('logout function with localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should remove token and profile from localStorage on logout', () => {
    localStorage.setItem('token', 'someToken');
    localStorage.setItem('profile', JSON.stringify({ name: 'John Doe' }));

    const removeItemSpy = jest.spyOn(localStorage, 'removeItem');

    logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('profile')).toBeNull();

    removeItemSpy.mockRestore();
  });
});
