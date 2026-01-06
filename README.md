# Portfolio

Personal portfolio website showcasing projects, skills, and experience with AI-powered chatbot integration.

## Features

- 🎨 Modern, animated UI with smooth transitions
- 🤖 AI-powered chatbot for interactive portfolio exploration
- 🌐 Multilingual support (English/French)
- 📱 Fully responsive design
- 📧 Contact form with EmailJS integration
- 🎯 Project showcase with detailed pages

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **AI:** DeepSeek API for chatbot
- **Email:** EmailJS for contact form

## Getting Started

### Prerequisites

- Node.js 18+ and yarn
- EmailJS account (for contact form)
- DeepSeek API key (for AI chatbot)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/soymustamahti/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# EmailJS Configuration
# Sign up at https://www.emailjs.com/ and create a service + template
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id

# DeepSeek API Key
# Get your API key from https://platform.deepseek.com/
DEEPSEEK_API_KEY=sk-your_api_key
```

**Environment Variables Explained:**

- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS public key from the dashboard
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Email service ID (e.g., Gmail, Outlook)
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Template ID for the contact form emails
- `DEEPSEEK_API_KEY`: API key for the AI chatbot functionality

4. Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Build for Production

```bash
yarn build
yarn start
```

## Customization

To use this portfolio for yourself:

1. **Update Content:**
   - Edit translations in `src/i18n/messages/en.ts` and `src/i18n/messages/fr.ts`
   - Update project data in `src/constants/projects.ts`
   - Modify skills in `src/constants/skills.ts`
   - Change contact info in `src/constants/contact.ts`

2. **Add Your Projects:**
   - Add project images to `public/project/[project-slug]/`
   - Update project configurations in the constants file

3. **Customize Styling:**
   - Edit colors in `tailwind.config.ts`
   - Modify global styles in `src/app/globals.css`

4. **Add Your Resume:**
   - Place PDF files as `public/en_resume.pdf` and `public/fr_resume.pdf`

## License

Feel free to use this portfolio as a template for your own website!

## Contact

Mustapha El Hachmi Mahti - mustaelhachmimahti@gmail.com

