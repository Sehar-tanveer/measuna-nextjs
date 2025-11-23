# Deploy to Vercel Without Git

## Step 1: Login to Vercel

Run this command in your terminal:
```bash
vercel login
```

This will open your browser to authenticate with Vercel.

## Step 2: Deploy Your Project

From your project directory, run:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Type `Y` and press Enter
- **Which scope?** → Select your account
- **Link to existing project?** → Type `N` and press Enter (for first deployment)
- **What's your project's name?** → Press Enter for default or type a name
- **In which directory is your code located?** → Press Enter (it's `./`)

## Step 3: Deploy to Production

After the preview deployment succeeds, deploy to production:
```bash
vercel --prod
```

## That's It!

Your site will be live at: `https://your-project-name.vercel.app`

## Future Updates

To update your site, just run:
```bash
vercel --prod
```

## Alternative: Install Git (Optional)

If you want to use Git later for version control:

1. Download Git from: https://git-scm.com/download/win
2. Install it (use default options)
3. Restart PowerShell
4. Then you can use Git commands



