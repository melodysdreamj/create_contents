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

   ```json
   {
     "code-runner.executorMap": {
       "typescript": "npx tsx ${file}"
     },
     "code-runner.runInTerminal": true
   }
   ```

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

## client-DynamoDB

To interact with DynamoDB from this client, you need to set up AWS credentials and region information.

### Required Environment Variables

Make sure to set the following environment variables in your project:

```plaintext
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
```

### How to Obtain These Values

1. **Create an IAM User** in the AWS Console:

   - Go to [AWS IAM Console](https://console.aws.amazon.com/iam/) and create a new user with **programmatic access**.
   - Attach the required permissions, such as \`AmazonDynamoDBFullAccess\` or \`AmazonDynamoDBReadOnlyAccess\`, depending on your application's needs.
   - Once the user is created, you will see the **Access Key ID** and **Secret Access Key**. **Save these securely**, as you won't be able to view the Secret Access Key again.

2. **Set the AWS Region**:
   - Choose the AWS region where your DynamoDB table is located.
   - Common region codes include:
     - \`us-east-1\` for US East (N. Virginia)
     - \`us-west-1\` for US West (N. California)
     - \`ap-northeast-2\` for Asia Pacific (Seoul)
   - Set this region code as the value of \`AWS_REGION\`.

### Example .env File

For local development, you can create a \`.env\` file in the project root:

```dotenv
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
```

Ensure that your environment is configured securely and that sensitive credentials are never exposed in public repositories.

### Qdrant docker create

```bash
docker volume create qdrant_data
docker run -d \
  -p 6333:6333 \
  -p 6334:6334 \
  -v qdrant_data:/qdrant/storage \
  -e QDRANT__SERVICE__API_KEY="my-super-secret-key" \
  --name qdrant-server \
  qdrant/qdrant:latest
```

docker run -d \
 -p 6333:6333 \
 -p 6334:6334 \
 -v poster_qdrant_data:/qdrant/storage \
 -e QDRANT**SERVICE**API_KEY="my-super-secret-key" \
 --name qdrant-server \
 qdrant/qdrant:latest

### When Use Vertex ai

```bash
gcloud auth application-default login
```
