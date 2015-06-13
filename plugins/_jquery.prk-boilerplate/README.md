#PRK Plugin Boilerplate
This boilerplate is based directly off https://github.com/jquery-boilerplate/jquery-boilerplate

It has been modified to utilise Gulp as the build system.

##Setup
Once this folder is cloned or copied, you will need to run `npm install` to download Gulp's dependencies.


##Build Process
The available commands are:

* `$ gulp js-dev` - Generates an uncompressed, unminified version of the script for development environments.
* `$ gulp js-prod` - Generates a compressed, minified version of the script for production environments.
* `$ gulp build` - Runs both `js-dev` and `js-prod` tasks.
* `$ gulp clean` - This will delete all the files inside the `dist` folder. Keeps it nice and clean.
* `$ gulp watch` - This will run the `build` task whenever a change is detected to one of the files in `src`.

For the sake of simplicity, all you need to do is run `$ gulp watch`, but the other commands are available to you should you need to use them.
