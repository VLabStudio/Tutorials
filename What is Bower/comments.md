# Bower

#### Get help
```shell
bower help
```

#### Get version
```shell
bower -v (or --version)
```

#### Create bower.json
```shell
bower init
```

#### Installing local packages
```shell
bower install jquery -S (or bower i jquery -S)
bower install jquery --save
bower install normalize-css --save-dev
```

#### Installing git repository and files
```shell
bower install VLabStudio/Tutorials -S
bower install https://github.com/VLabStudio/Tutorials/blob/master/README.md --save
```

#### Installing a specific version
```shell
bower install jquery#3.4.1 --save
bower install jquery#3.4.1
```

#### Removing local packages
```shell
bower uninstall jquery -S
bower uninstall jquery
```

#### Update
```shell
bower update jquery -S
bower update jquery
```

#### Display information of a package
```shell
bower info jquery
```