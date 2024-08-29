## Set Webstorm environment 
1. Go to **Tools** -> **External Tools**.
2. Click the **+** button to add a new tool.
3. Set the name to `npx tsx`.
4. Configure the Tool Settings as follows:
    - **Program**: `npx`
    - **Arguments**: `tsx $FilePathRelativeToProjectRoot$`
    - **Working directory**: `$ProjectFileDir$`

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