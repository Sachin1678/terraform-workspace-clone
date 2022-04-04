<h1 align="center">terraform-workspace-clone 👋</h1>


> `terraform-workspace-clone` is a command-line module to clone terraform workspace.
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.1.0-blue.svg" />
  <img alt="Version" src="https://img.shields.io/badge/license-MIT-orange.svg" />
</p>

# Getting started
> Clone existing terraform workspace.

### 🏠 [Homepage](https://github.com/Sachin1678/terraform-workspace-clone#readme)

## Install

```sh
npm install -g terraform-workspace-clone
```

## Usage
`terraform-workspace-clone` needs few details before cloning the workspace. Input can be provided using cli prompts or can pass pre-filled json file as command-line argument. 
### Cli prompts:
Run below command in cli.
```
terraform-workspace-clone
```

Can also use `tf-ws-clone` , It is a shorthand command.

Example:
```
✔ TF domain name?  https://app.terraform.io   // Terraform domain, can be cloud or enterprise
✔ Source workspace ID? ws-9xZ3c3iabcdefgh     // Workspace id which you need to clone
✔ New workspace name? 00-test-1               // New workspace name
✔ Destination TF organization name?  abc_org  // TF org name in which new workspace will be created.
✔ TF api token  ****************              // User api token. For more details go to `API Token` section of https://www.terraform.io/cloud-docs/users-teams-organizations/users.
✔ Do you want to clone with values? no / yes  // Yes, if you want to clone variables with values.
```

**NOTE:** User should have permission to access source and destination org. To generate user api token, </br> go to **User Settings -> Tokens -> click on "Create an API token" button -> Create API token -> Copy token -> Done**. </br>
![User API token](https://github.com/sachin1678/terraform-workspace-clone/blob/main/user_api_token.png?raw=true)

### Config file:
Input can be passed using pre-filled json file. JSON file should have below info:

```
{
    "baseUrl": "https://app.terraform.io",
    "sourceWorkspaceId": "ws-9xZ3c3iabcdefgh",
    "newWorkspaceName": "00-test-1",
    "destinationOrgName": "abc_org",
    "apiToken": "Zxcvbnm..............sjhsmD",
    "isCloneValue": true or false
}
```
and then pass this file as a input.

```sh
tf-ws-clone --config=<path to json file>/<filename>.json
```

This template can be generated using cli command. It will create a config template file with all the required keys **`tf_ws_clone_config.json`** at same path from where `tf-ws-clone` command is executed.

```sh
tf-ws-clone initconfig
```

Example:
```
tf-ws-clone --config=./tf_ws_clone_config.json
```

### Running on-demand using npx:
Using `npx` you can run the script on-demand:
```
npx terraform-workspace-clone
```

```
npx terraform-workspace-clone --config=./tfconfig.json
```

## Run tests

```sh
npm run test
```

## New planned features
* Clone across multiple domains.
* Allow config file path also for the required details.
## Author

👤 **Sachin <rajput.sachingla@gmail.com>**

* Github: [@Sachin1678](https://github.com/Sachin1678)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Sachin1678/terraform-workspace-clone/issues). You can also take a look at the [contributing guide](https://github.com/Sachin1678/terraform-workspace-clone/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Sachin <rajput.sachingla@gmail.com>](https://github.com/Sachin1678).<br />
This project is [MIT](https://github.com/Sachin1678/terraform-workspace-clone/blob/master/LICENSE) licensed.
