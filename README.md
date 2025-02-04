# AI-Book: Linear Algebra and Applications

## Overview

Understanding Linear Algebra can be challenging for students, requiring both theoretical knowledge and practical application.

To address this, AI-Book was developed as an AI-powered learning assistant that enhances engagement through interactive reading and dynamic practice exercises.

This AI-Book application is an **AI-powered learning tool** that uses **Retrieval-Augmented Generation (RAG)** to provide contextual explanations and generate customized quizzes for **Linear Algebra**, enhancing learning and engagement.

This product is ideal for:

- **Students** looking to improve their grasp of linear algebra concepts.
- **Professors** seeking a tool to assist in teaching and testing students.
- **Self-learners** who want an interactive way to study Linear Algebra.

## Features

### AI Chat

- Uses a **Retrieval-Augmented Generation (RAG) AI Agent** to provide insights and explanations directly from the book.
- Enables users to **ask any content-related questions** about Linear Algebra.
- Returns responses that help clarify concepts, definitions, and problem-solving approaches.

### Dynamic Practice Quizzes

- Automatically **generates multiple-choice and true/false questions** from different book chapters.
- Offers quizzes at **varying difficulty levels** to accommodate different learning needs.

### Future Expansion

- The long-term vision is to **integrate multiple books** into an AI-powered book-learning platform.
- Open-sourcing the project allows for **community-driven innovation**, enabling developers to explore new features and enhance the interactive reading experience.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **AI Agent:** [CozeAI](https://coze.com/) with RAG and fine-tuning
- **API Integration:** CozeAI API for AI-generated responses and quiz generation
- **Hosting:** [Vercel](https://vercel.com/)
- **Platform Requirements:** Works on any modern web browser and standard devices (desktop, tablet, mobile)

## Installation & Setup

**If you wish to clone or contribute, follow these steps:**

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Install [Git](https://git-scm.com/) for version control.

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/TheDLCrimson/ai-book.git
   cd ai-book
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:3000`

### Deployment (Vercel)

This app is optimized for **Vercel** deployment:

1. Create a [Vercel account](https://vercel.com/).
2. Install the Vercel CLI:
   ```sh
   npm install -g vercel
   ```
3. Deploy the app:
   ```sh
   vercel
   ```

## Contributions

We welcome contributions to enhance AI-Book's features! To contribute:

- Open an **issue** on GitHub to discuss a feature or a bug fix.
- Submit **pull requests** with detailed explanations.
- For inquiries, contact me via [email](thedlcrimson22@gmail.com).

## Check Out My MVP

Curious about how AI-Book works? Check out the [live demo](https://ai-book-linear-algebra-and-applications.vercel.app/) to see AI-powered learning in action!

## License

This project is licensed under the **MIT License**. See the LICENSE file for details.

## 📢 Acknowledgments

- **NaviAI**: [https://naviai.io.vn/](https://naviai.io.vn/) – Original AI provider and collaborator.
- **Professor [Laurent El Ghaoui](https://vinuni.edu.vn/people/laurent-el-ghaoui-phd-2/)**: Author of _Linear Algebra and Applications_.

---

_**Side Note**: Originally developed as a private project between NaviAI and Professor Laurent El Ghaoui, AI-Book was intended as a B2C (Business-to-Consumer) educational tool. However, due to unforeseen circumstances, the deal was not finalized. As a result, part of the project is now open to the public, offering an opportunity for contributors to expand its potential into a broader AI-powered book-learning platform._
