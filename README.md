## Set Up Environment for Running `npx tsx`

### WebStorm

1. Go to **Tools** -> **External Tools**.
2. Click the **+** button to add a new tool.
3. Set the name to `npx tsx`.
4. Configure the Tool Settings as follows:
   - **Program**: `npx`
   - **Arguments**: `tsx $FilePathRelativeToProjectRoot$`
   - **Working directory**: `$ProjectFileDir$`

### VS Code

1. Install the **Code Runner** extension from the Extensions tab.
2. Open **Settings** in JSON format:
   - Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS) to open the Command Palette.
   - Search for `Preferences: Open Settings (JSON)` and select it.
3. Add the following configuration to your `settings.json` file:

   \`\`\`json
   {
       "code-runner.executorMap": {
           "typescript": "npx tsx ${file}"
       },
       "code-runner.runInTerminal": true
   }
   \`\`\`

   - `"typescript": "npx tsx ${file}"`: This tells VS Code to use `npx tsx` for TypeScript files and passes the full file path with `${file}`.
   - `"code-runner.runInTerminal": true`: Ensures the command runs in the terminal, preserving the correct file path.

4. To execute a file:
   - Open the file you want to run.
   - Right-click within the file editor and select **Run Code**.

This will run the current file using `npx tsx` directly in the terminal.


## Obtaining the `serviceAccountKey.json` File

The `serviceAccountKey.json` file is the service account key for your Firebase project. This file can be generated and downloaded from the Firebase console. Follow these steps to obtain your service account key:

### Generating and Downloading the Service Account Key

1. **Login to Firebase Console**: Login to the [Firebase Console](https://console.firebase.google.com/).

2. **Select Project**: Choose the Firebase project that uses Firestore.

3. **Navigate to Project Settings**: Click on "Project Settings" in the top left menu of the Firebase console.

4. **Service Accounts**: Select the "Service Accounts" tab from the top of the settings page.

5. **Generate New Private Key**:
   - Click on the "Generate New Private Key" button at the bottom of the page.
   - In the warning dialog, click "Generate Key".
   - A JSON file will be automatically downloaded.


## 포컷베이스 와 b2 같이 사용할때 
b2에서 keyID 가 Access Key이고 applicationKey 가 Secret Key이다. 그에 맞게 설정하면 된다.
Endpoint, Bucket, Region(예: us-west-001)을 설정하면 된다.


## Memcached
### macOS
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install memcached
memcached -d -p 11211
brew services start memcached
brew services list
