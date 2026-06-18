# Scott Maiwald Portfolio - Maintenance & Update Guide

This guide outlines the step-by-step processes for updating your portfolio, whether you are simply changing text/images via the Admin panel, or making structural code changes with Antigravity.

---

## Scenario A: Updating Content (Text, Projects, Agents, Hero Section)
*Use this method when you just want to change the words, swap out project data, or update the "Meet the Agents" section without changing any actual code.*

### 1. Start Your Local Server
1. Open your **Terminal** app.
2. Navigate to your project folder (if you aren't already there) by pasting:
   ```bash
   cd "/Users/scottmaiwald/Library/Mobile Documents/com~apple~CloudDocs/Acid Green/Scott Maiwald Portfolio Claude"
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```

### 2. Make Your Edits
1. Open your web browser and go to: [http://localhost:3000/admin](http://localhost:3000/admin)
2. Use the graphical interface to change any text, add new projects, or update your agents.
3. Click the green **Save Changes** button at the bottom of the admin page.
4. Go to [http://localhost:3000](http://localhost:3000) to preview your changes and make sure everything looks perfect.

### 3. Publish to the Live Site
Once you are happy with the changes, you need to send them to GitHub so Vercel can update the live site.
1. Go back to your **Terminal**.
2. Stop the local server by pressing `Control + C` on your keyboard.
3. Run these three commands one by one to push the changes:
   ```bash
   git add .
   git commit -m "Update portfolio content via admin panel"
   git push
   ```
4. **That's it!** Vercel will automatically detect the push and update your live site (`scottmaiwald.com`) within about 60 seconds. You do **not** need to log into Vercel or GitHub.

---

## Scenario B: Updating Code, Design, or Adding Features
*Use this method when you want to add a completely new page, change the colors, fix a bug, or add a new feature (like a blog or new interactive animation).*

### 1. Open Antigravity
1. Open **Antigravity** (the AI assistant).
2. Tell the AI exactly what you want to change. For example: *"I want to change the primary button color from green to blue,"* or *"I want to add a new section below the hero that shows client logos."*
3. The AI will make the code changes directly to your local files.

### 2. Preview the Changes
1. Open your **Terminal** and make sure you are in your project folder:
   ```bash
   cd "/Users/scottmaiwald/Library/Mobile Documents/com~apple~CloudDocs/Acid Green/Scott Maiwald Portfolio Claude"
   ```
2. Start the local server to see what the AI did:
   ```bash
   npm run dev
   ```
3. Check [http://localhost:3000](http://localhost:3000). If you want adjustments, ask Antigravity to tweak it until it's perfect.

### 3. Publish to the Live Site
1. Go back to your **Terminal** and stop the server by pressing `Control + C`.
2. Run the deployment commands:
   ```bash
   git add .
   git commit -m "Update site features via Antigravity"
   git push
   ```
3. Vercel will automatically rebuild the site and push it live to `scottmaiwald.com`.

---

## Troubleshooting & Important Links

* **Live Website:** [https://scottmaiwald.com](https://scottmaiwald.com)
* **Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard) 
  *(Log in with your GitHub account. Check this if a deployment fails or you want to see analytics).*
* **GitHub Repository:** [https://github.com/AcidGreenDesignLab/scott-maiwald-portfolio](https://github.com/AcidGreenDesignLab/scott-maiwald-portfolio)
  *(This acts as the permanent, secure backup of all your code).*

> **The Golden Rule:** Vercel is constantly "listening" to your GitHub repository. Any time you successfully run `git push` in your terminal, your live website will automatically update. You never have to manually upload files anywhere!
