'use strict';

const pluginName = 'optimizely-pl-enhancement';

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const _ = require('lodash');

function writeConfigToOutput(patternlab, pluginConfig) {

  var pluginFiles = path.resolve(patternlab.config.paths.source.root, "plugins");
  var pluginConfigPathName = path.resolve(patternlab.config.paths.public.root, 'patternlab-components');
  console.log("pluginConfigPathName", pluginConfigPathName);
  try {
    fs.outputFileSync(pluginConfigPathName + '/' + pluginName + '.json', JSON.stringify(pluginConfig, null, 2));
  } catch (ex) {
    console.trace(pluginName + ': Error occurred while writing pluginFile configuration');
  }
  fs.copySync(pluginFiles, pluginConfigPathName);
}

/**
 * A single place to define the frontend configuration
 * This configuration is outputted to the frontend explicitly as well as included in the plugins object.
 *
 */
function getPluginFrontendConfig() {
  var defaults = {
    "name": "optimizely-pl-enhancement",
    "onready": "PluginUIExtension.init()",
    "stylesheets": [
      "style.css"
    ],
    "javascripts": [
      "/patternlab-components/" + pluginName + "/script.min.js"
    ],
    "callback": ""
  };

  var pluginConfig = require('./config.json');
  return _.extend({}, defaults, pluginConfig);
}

/**
 * The entry point for the plugin. You should not have to alter this code much under many circumstances.
 * Instead, alter getPluginFrontendConfig() and registerEvents() methods
 */
function pluginInit(patternlab) {

  if (!patternlab) {
    console.error('patternlab object not provided to plugin-init');
    process.exit(1);
  }

  var pluginConfig = getPluginFrontendConfig();

  writeConfigToOutput(patternlab, pluginConfig);

  //add the plugin config to the patternlab-object for later export
  if (!patternlab.plugins) {
    patternlab.plugins = [];
  }

  patternlab.plugins.push(pluginConfig);

  //write the plugin dist folder to public/pattern-lab
  var pluginFiles = glob.sync(__dirname + '/dist/**/*');

  if (pluginFiles && pluginFiles.length > 0) {

    for (var i = 0; i < pluginFiles.length; i++) {
      try {
        var fileStat = fs.statSync(pluginFiles[i]);
        if (fileStat.isFile()) {

          try {

            var relativePath = path.relative(__dirname, pluginFiles[i]).replace('dist', ''); //dist is dropped

            var writePath = path.join(process.cwd(), patternlab.config.paths.public.root, 'plugins',
              pluginName, relativePath);

            fs.copySync(pluginFiles[i], writePath);

          } catch (err) {

            console.log(err);

          }

        }
      } catch (ex) {
        console.trace(pluginName + ': Error occurred while copying pluginFile', pluginFiles[i]);
        console.log(ex);
      }
    }
  }

  //setup listeners if not already active
  if (patternlab.config[pluginName] !== undefined && !patternlab.config[pluginName]) {

    //register events
    registerEvents(patternlab);

    //set the plugin key to true to indicate it is installed and ready
    patternlab.config[pluginName] = true;
  }

}

module.exports = pluginInit;