import app from './app.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
