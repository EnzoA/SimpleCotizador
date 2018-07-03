"use strict";

var gulp = require("gulp");

var dependencias = {
    "angular": {
        "angular.js": "",
        "angular.js.map": "",
        "bower.json": "",
        "package.json": "",
        "angular-csp.css": "",
        "index.js": ""
    },
    "angular-route": {
        "angular-route.js": "",
    }
};

gulp.task("scripts", function () {
    var streams = [];

    for (var propiedad in dependencias) {
        for (var item in dependencias[propiedad]) {
            streams.push(gulp.src("node_modules/" + propiedad + "/" + item)
                   .pipe(gulp.dest("wwwroot/lib/" + propiedad + "/" + dependencias[propiedad][item])));
        }
    }

    return merge(streams);
});