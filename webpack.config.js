var path = require('path');
var webpack = require('webpack');
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    entry : {
        javascript : "./src/main.tsx"
    },
    output : {
        /* path is the physical folder where compilation output will be placed */
        path : path.resolve(__dirname, "dist"),
        /* public path is the virtual directory in which resources can be accessed when served */
        publicPath : "/assets/",
        filename : 'bundle.js'
    },

    devtool : 'source-map',
    resolve : {
        extensions : ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module : {
        loaders : [
            {
                test : /\.tsx?$/,
                loader : "ts-loader"
            }
        ],
        preLoaders : [
            {
                test : /\.js$/,
                loader : "source-map-loader"
            },
            { 
                test: /\.tsx?$/, 
                loader: 'tslint', 
                exclude: /node_modules/ 
            }
        ]
    },
     // Individual Plugin Options
    tslint: {
        emitErrors: true,
        failOnHint: true
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // see http://stackoverflow.com/questions/35016229/how-to-config-minified-reactreactdom-with-webpack with a good explanation on how it works
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    plugins: [
        new CircularDependencyPlugin({
            // some node modules themselves have circular dependencies: ignore them
            exclude: /a\.js|node_modules/,
            failOnError: true
        },
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }))
    ]
}