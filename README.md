# Dashboard App

A modern, full-stack web dashboard application built with Next.js, React, TypeScript, and Tailwind CSS. Features a responsive design, interactive data visualizations, user authentication, and comprehensive API endpoints.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with dark/light mode support
- **Authentication**: Secure login/logout with JWT-based authentication simulation
- **Data Visualization**: Interactive charts and graphs using Recharts
- **Real-time Updates**: Live data fetching and automatic refresh
- **API Integration**: RESTful API endpoints with mock data
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized for speed and SEO

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn**
- **Docker** (optional, for containerized deployment)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd dashboard-app
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Configuration

Copy the example environment file and configure your settings:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your specific configuration:

\`\`\`env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_TELEMETRY_DISABLED=1
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔐 Demo Credentials

Use these credentials to test the authentication system:

- **Admin User**: 
  - Email: `admin@example.com`
  - Password: `admin123`

- **Regular User**: 
  - Email: `user@example.com`
  - Password: `user123`

## 📁 Project Structure

\`\`\`
dashboard-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── login/             # Login page
│   ├── analytics/         # Analytics page
│   ├── users/             # Users management page
│   ├── reports/           # Reports page
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── auth-guard.tsx    # Authentication guard
│   ├── dashboard-layout.tsx # Main layout
│   └── ...
├── contexts/             # React contexts
│   └── auth-context.tsx  # Authentication context
├── lib/                  # Utility functions
│   ├── api.ts           # API client
│   └── utils.ts         # General utilities
├── public/              # Static assets
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile          # Docker configuration
├── vercel.json         # Vercel deployment config
└── README.md           # This file
\`\`\`


## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose` - Run with Docker Compose
- `npm run clean` - Clean build artifacts

## 🌐 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3000` | No |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` | No |

## 📊 API Endpoints

The application includes the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Analytics
- `GET /api/analytics/traffic` - Get traffic data

### Users
- `GET /api/users` - Get users list
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Reports
- `GET /api/reports` - Get reports list
- `POST /api/reports` - Generate new report

### Health Check
- `GET /api/health` - Application health status

## 🎨 Customization

### Theming

The application uses Tailwind CSS with custom design tokens. Modify `app/globals.css` to customize colors:

\`\`\`css
:root {
  --primary: your-primary-color;
  --secondary: your-secondary-color;
  /* ... other variables */
}
\`\`\`

### Adding New Pages

1. Create a new page in the `app/` directory
2. Add navigation link in `components/dashboard-layout.tsx`
3. Implement the page component with `AuthGuard`

## 🔒 Security Considerations

- Authentication is simulated for demo purposes
- In production, implement proper JWT validation
- Use HTTPS in production environments
- Validate all user inputs
- Implement rate limiting for API endpoints
- Use environment variables for sensitive data

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   \`\`\`bash
   lsof -ti:3000 | xargs kill -9
   \`\`\`

2. **Node modules issues**:
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

3. **Build errors**:
   \`\`\`bash
   npm run clean
   npm run build
   \`\`\`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Recharts](https://recharts.org/) - Chart library
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the troubleshooting section

---

