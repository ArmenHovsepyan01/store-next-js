import axios from 'axios';

const CustomProvider = () => ({
  ...{
    id: 'custom',
    name: 'Custom Provider',
    type: 'credentials',
    credentials: {
      async authorize(credentials: any, req: any) {
        try {
          // Make a request to your login API route
          const response = await axios.post('/api/login', credentials);
          const user = response.data.user; // Adjust this based on your API response structure
          if (user) {
            // If authentication is successful, return the user object
            return user;
          } else {
            // If authentication fails, return null
            return null;
          }
        } catch (error) {
          console.error('Login failed:', error);
          return null;
        }
      }
    }
  }
});

export default CustomProvider;
