import express from 'express'
import colors from 'colors'
import cors from 'cors'

const port = process.env.PORT || 3000;
import posts from './routes/posts.js'
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js'
const app = express();

// Body parser middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger)

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/posts', posts)

// Error message for route not found
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`.bgGreen)
);
