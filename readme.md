
# microsoft-teams-json-tab

[![Build Status](https://dev.azure.com/hapysachin91/json-tab/_apis/build/status/OfficeDev.microsoft-teams-json-tab?branchName=master)](https://dev.azure.com/hapysachin91/json-tab/_build/latest?definitionId=4&branchName=master)

## Running App Locally
1. Code Enlistment `git clone https://github.com/OfficeDev/microsoft-teams-json-tab.git`

2. Install dependencies `yarn install` in root folder of this repository

3. run locally with watch mode `yarn dev`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Few other commands:
### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

#### `yarn lint` 
will run all lint rules

### `yarn doctor`
will auto fix lint errors if possible

## Testing in Team
1. Get https url after running json tab locally using [ngrok](https://ngrok.com/)  
`./ngrok http 3000`

2. Replace {jsonTabUrl} with ngrok https url in <root>/manifest/dev/manifest.json file then create teams manifest zip file and side load to team.

3. Teams has logic to validate JSON Url against valid json url so we need to test againt container that support ngrok url generated in above step.
You can use one of container generated in this PR https://domoreexp.visualstudio.com/Teamspace/_git/Teamspace-Web/pullrequest/154432?_a=overview

4. Install JSON Tab either in personal scope or channel scope.

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
