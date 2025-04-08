/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			pakistan_green: {
  				'50': '#E8FBE8',
  				'100': '#D1F7D1',
  				'200': '#A3EFA3',
  				'300': '#75E775',
  				'400': '#47DF47',
  				'500': '#2AB72A',
  				'600': '#218E21',
  				'700': '#186518',
  				'800': '#0F3C0F',
  				'900': '#061306',
  				'950': '#020602',
  				DEFAULT: '#134611'
  			},
  			india_green: {
  				'50': '#EDFBE8',
  				'100': '#DBF7D1',
  				'200': '#B7EFA3',
  				'300': '#93E775',
  				'400': '#6FDF47',
  				'500': '#4FB72A',
  				'600': '#3D8E21',
  				'700': '#2B6518',
  				'800': '#193C0F',
  				'900': '#071306',
  				'950': '#020602',
  				DEFAULT: '#3e8914'
  			},
  			pigment_green: {
  				'50': '#EEFBF2',
  				'100': '#DDF7E5',
  				'200': '#BBEFCB',
  				'300': '#99E7B1',
  				'400': '#77DF97',
  				'500': '#55B77D',
  				'600': '#428E61',
  				'700': '#2F6545',
  				'800': '#1C3C29',
  				'900': '#09130D',
  				'950': '#020604',
  				DEFAULT: '#3da35d'
  			},
  			light_green: {
  				'50': '#F4FBF0',
  				'100': '#E9F7E1',
  				'200': '#D3EFC3',
  				'300': '#BDE7A5',
  				'400': '#A7DF87',
  				'500': '#91B769',
  				'600': '#718E52',
  				'700': '#51653B',
  				'800': '#313C24',
  				'900': '#11130D',
  				'950': '#040604',
  				DEFAULT: '#96e072'
  			},
  			nyanza: {
  				'50': '#FCFEF9',
  				'100': '#F9FDF3',
  				'200': '#F3FBE7',
  				'300': '#EDF9DB',
  				'400': '#E7F7CF',
  				'500': '#E1F5C3',
  				'600': '#B1BF98',
  				'700': '#7F896D',
  				'800': '#4D5342',
  				'900': '#1B1D17',
  				'950': '#0A0B09',
  				DEFAULT: '#e8fccf'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
  			'slow-bounce': {
  				'0%, 20%, 50%, 80%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'40%': {
  					transform: 'translateY(15px)'
  				},
  				'60%': {
  					transform: 'translateY(10px)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'slow-bounce': 'slow-bounce 3s cubic-bezier(0.4, 0, 0.2, 1) infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}; 