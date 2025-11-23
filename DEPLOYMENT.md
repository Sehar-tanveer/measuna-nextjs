# Deploying to Vercel

This guide will help you deploy the Mea Suna Madeira Next.js project to Vercel.

## Prerequisites

1. A GitHub account (or GitLab/Bitbucket)
2. A Vercel account (free tier works perfectly)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Create a new repository (e.g., `measuna-nextjs`)
   - Don't initialize with README

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/measuna-nextjs.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in (or create an account)

2. Click **"Add New Project"**

3. Import your GitHub repository:
   - Select the repository you just created
   - Click **"Import"**

4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. Click **"Deploy"**

6. Wait for deployment to complete (usually 2-3 minutes)

7. Your site will be live at: `https://your-project-name.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? (Press Enter for default)
- Directory? `./` (Press Enter)
- Override settings? **No**

### Step 4: Deploy to Production

```bash
vercel --prod
```

## Environment Variables

If you need to add environment variables:

1. Go to your project on Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add any required variables

## Custom Domain (Optional)

1. Go to your project on Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches (creates preview URLs)

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify `next.config.js` is correct

### Images Not Loading

1. Verify image domains are in `next.config.js`
2. Check that external image URLs are accessible
3. Review browser console for CORS errors

### GSAP/ScrollTrigger Issues

1. Ensure GSAP is properly imported in client components
2. Check that `'use client'` directive is present
3. Verify ScrollTrigger is registered

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify images are loading
- [ ] Check horizontal scroll section works
- [ ] Test gallery card interactions
- [ ] Verify page loader animation
- [ ] Test on mobile devices
- [ ] Check performance in Vercel Analytics

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support

