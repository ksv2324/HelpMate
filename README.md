
# HelpMate Mobile App Prototype

This is a code bundle for HelpMate Mobile App Prototype. The original project is available at https://www.figma.com/design/eZIslS1acDxexU1wSkGtzl/HelpMate-Mobile-App-Prototype.  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ### Android Development

  See [CAPACITOR.md](./CAPACITOR.md) for detailed instructions on building and running the Android app.

  Quick start:
  ```bash
  npm install
  npm run build
  npm run sync:android
  npm run open:android
  ```

  ## GitHub Actions Workflows

  - **Android Build**: Automatically builds APK when commits contain `[Update]`
  - **GitHub Pages**: Automatically deploys web version to GitHub Pages

  ## Documentation

  - [CAPACITOR.md](./CAPACITOR.md) - Android app setup and development guide
  - [AI Summaries](./ai_summaries/) - AI-generated documentation and guides
  