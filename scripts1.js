  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: { DEFAULT:'#1F4D3A', light:'#2C6B4F', dark:'#153629' },
          secondary: '#2C2C2C',
          cream: '#F8F8F6',
          gold: { DEFAULT:'#C9A227', light:'#E0BE4F', dark:'#9C7D1A' },
          charcoal: '#1B1B1B',
        },
        fontFamily: {
          serif: ['"Playfair Display"','serif'],
          sans: ['Poppins','sans-serif'],
        },
        borderRadius: { xl2: '1.25rem' },
        boxShadow: {
          soft: '0 10px 40px -10px rgba(27,27,27,0.12)',
          softer: '0 4px 20px -4px rgba(27,27,27,0.08)',
          gold: '0 8px 30px -8px rgba(201,162,39,0.45)',
        }
      }
    }
  }