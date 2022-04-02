<h1 align="center">terraform-workspace-clone 👋</h1>


> `terraform-workspace-clone` is a command-line module to clone terraform workspace.
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.0.0-blue.svg" />
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
✔ TF api token  ****************              // For more details go to `API Token` section of https://www.terraform.io/cloud-docs/users-teams-organizations/users
✔ Destination TF organization name?  abc_org  // TF org name in which new workspace will be created.
✔ Do you want to clone with values? no / yes  // Yes, if you want to clone variables with values.
```

### Config file:
Input can be passed using pre-filled json file. Json file should have below info:

```
{
    "baseUrl": "https://app.terraform.io",
    "orgName": "abc_org",
    "sourceWSId": "ws-9xZ3c3iabcdefgh",
    "apiToken": "Zxcvbnm..............sjhsmD",
    "newWSName": "00-test-1",
    "isCloneValue": true or false
}
```
and then pass this file as a input

```sh
tf-ws-clone --config=<path to json file>/<filename>.json
```

Example:
```
tf-ws-clone --config=./tfconfig.json
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
