var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts){
        super(args, opts);

        this.argument("appname", {type: String, required: true});

        this.gcopyFile = (src, dest=src, bag) => {
            const b = bag || {
                appname: this.options.appname
            };


            this.fs.copyTpl(
                this.templatePath(src),
                this.destinationPath(dest),
                b
            );
        };
    }

    async start() {
        // create destination folder.
        this.destinationRoot(this.options.appname);
    }

    copyRootFiles() {
        // package.json

        this.gcopyFile('package.json');

        // gulpfile.json
        this.gcopyFile('gulpfile.js');

        // shadow-cljs.edn
        this.gcopyFile('shadow-cljs.edn');

        // .gitignore
        this.gcopyFile('.gitignore');
    }

    copyResourceFiles() {
        const rsrc = "resources";

        // main.scss
        this.gcopyFile('main.scss', `${rsrc}/sass/main.scss`);

        // index.html
        this.gcopyFile('index.html', `${rsrc}/public/index.html`);
    }

    copySrcFiles() {
        const src = `src/main/${this.options.appname}`.replace('-', '_');

        // core.cljs
        this.gcopyFile('core.cljs', `${src}/core.cljs`);

        // site.cljs
        this.gcopyFile('site.cljs', `${src}/layouts/site.cljs`);

        // home.cljs
        this.gcopyFile('home.cljs', `${src}/panels/home.cljs`);

        // routes.cljs
        this.gcopyFile('routes.cljs', `${src}/routes.cljs`);
    }
};
