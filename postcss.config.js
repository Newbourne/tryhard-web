module.exports = (ctx) => {
   return {
     //...options // PostCSS Options [optional]
     plugins: [
        //require("postcss-import")({ addDependencyTo: ctx.webpack }),
        require("precss")(),
        require('postcss-font-magician')(),
        require("postcss-cssnext")({ browsers: [ "last 3 versions" ] })
     ]
   }
}