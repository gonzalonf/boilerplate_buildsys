const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')


var inProduction = (process.env.NODE_ENV === 'production');


module.exports = {
    entry:{
        app: [
            'babel-polyfill',
            './scripts/main.js',
            './styles/main.scss'
        ]
    },
    output:{
        path: path.resolve(__dirname , "./../js"),
        filename: 'bundle.js'
    },
    module : {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use:[
                        {

                            loader: 'css-loader',

                            options: {url:false}
                        },

                    'sass-loader'

                    ],

                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./../css/style.css'),

        // habilitar para jquery global...

        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),

        // mira el css sin aplicar al archivo indicado y no lo pasa...
        
        // new PurifyCSSPlugin({
        //     paths: glob.sync(path.join(__dirname, '../views/*.php')),
        //     minimize: inProduction
        // }),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
  ]

};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}
