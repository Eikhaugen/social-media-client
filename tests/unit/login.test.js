import { login } from '../../src/js/api/auth/login.js';

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

global.fetch = jest.fn();

describe('login function with localStorage', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  it('should store token and profile in localStorage on successful login', async () => {
    const mockToken = 'mockToken123';
    const mockProfile = { name: 'John Doe', accessToken: mockToken };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile
    });

    const email = 'test@example.com';
    const password = 'password123';

    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    const profile = await login(email, password);

    expect(setItemSpy).toHaveBeenCalledWith('token', JSON.stringify(mockToken));

    const savedProfile = { ...mockProfile };
    delete savedProfile.accessToken;
    expect(setItemSpy).toHaveBeenCalledWith(
      'profile',
      JSON.stringify(savedProfile)
    );

    expect(profile).toEqual(savedProfile);
  });

  it('should throw an error if login fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized'
    });

    const email = 'test@example.com';
    const password = 'wrongpassword';

    await expect(login(email, password)).rejects.toThrow('Unauthorized');
  });
});
