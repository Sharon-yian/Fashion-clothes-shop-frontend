# Fashion & Clothes Shop Frontend

A modern React-based e-commerce frontend for a fashion and clothing store, built with Redux Toolkit for state management.

## Features

### MVP Features
- **User Authentication**: Login and registration system
- **Product Catalog**: Browse fashion items by categories (Men, Women, Kids, Accessories)
- **Shopping Cart**: Add, remove, and manage items in cart
- **Checkout Process**: Complete order with shipping and payment information
- **Payment Integration**: M-Pesa payment processing

### Technical Stack
- **Frontend**: React 19 + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── cart/          # Shopping cart
│   ├── checkout/      # Checkout process
│   └── products/      # Product catalog
├── store/             # Redux store configuration
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to project directory:
```bash
cd Fashion-clothes-frontend
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Shopping Cart
- Add/remove items
- Quantity management
- Real-time total calculation
- Persistent cart state

### Checkout Process
- Shipping address form
- M-Pesa payment integration
- Order summary display
- Payment confirmation

### Payment Integration
- M-Pesa STK Push
- Phone number validation
- Payment status tracking
- Error handling

## Tech Stack

- React 19
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Vite
- React Hook Form
- React Hot Toast

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
