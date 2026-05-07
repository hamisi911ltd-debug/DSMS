# DSMS - Driving School Management System

A modern, responsive web application for managing driving school operations with a clean white & blue theme and dark mode support.

## Features

- 🎨 **Modern UI**: Clean white & blue theme with dark mode toggle
- 📱 **Responsive Design**: Works on all devices
- 🔐 **Authentication System**: Role-based access control
- 🎯 **Dashboard**: Comprehensive overview for students, instructors, and admins
- 🌙 **Theme Toggle**: Switch between light and dark modes
- ⚡ **Fast Performance**: Built with Vue 3 and Vite

## Tech Stack

- **Frontend**: Vue 3, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **Routing**: Vue Router
- **State Management**: Pinia

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hamisi911ltd-debug/DSMS.git
cd DSMS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Demo Credentials

Use any email and password to login. The system will automatically assign you a student role for demonstration purposes.

## Theme System

- **Default**: Light mode with white & blue color scheme
- **Toggle**: Click the theme button in the sidebar to switch to dark mode
- **Persistence**: Theme preference is saved in localStorage

## Project Structure

```
src/
├── components/          # Reusable Vue components
├── stores/             # Pinia stores for state management
├── router/             # Vue Router configuration
├── pages/              # Page components
│   ├── customer/       # Public pages (login, splash)
│   ├── student/        # Student dashboard
│   ├── admin/          # Admin dashboard
│   └── instructor/     # Instructor dashboard
└── utils/              # Utility functions
```

## Migration from React

This project was successfully migrated from React to Vue 3 for better Cloudflare Pages compatibility:

- **React Context** → **Pinia Stores**
- **React Router** → **Vue Router**
- **JSX Components** → **Vue Single File Components**
- **React Hooks** → **Vue Composition API**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.