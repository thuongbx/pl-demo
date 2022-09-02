const destRootPath = "../firstmile.web";
const destAssetsBasePath = "../firstmile.web/wwwroot/assets";
const destPatternsPath = "../firstmile.patterns";

export interface PathItem {
  base?: string,
  src?: string | string[],
  dest?: string,
  watch?: string | string[],
  includePaths?: string[],
  includedBabelFunctions?: string,
  prefix?: string,
  suffix?: string,
  concat?: string,
  copyOnly?: boolean,
  fileName?: string,
  flatten?: boolean
}

export interface PathCollection {
  [name: string]: PathItem
}

const paths: PathCollection = {
  allStyles: {
    watch: [
      './source/assets/styles/**/*.scss',
      './source/_patterns/**/*.scss'],
    src: './source/assets/styles/style-all.scss',
    dest: './source/assets/css'
  },
  baseStyles: {
    watch: [
      './source/assets/styles/**/*.scss',
      './source/_patterns/atoms/**/*.scss',
      './source/_patterns/molecules/**/*.scss'],
    src: './source/assets/styles/style-base.scss',
    dest: './source/assets/css'
  },
  plStyles: {
    watch: [
      './source/assets/styles/**/*.scss'],
    src: './source/assets/styles/style-pl.scss',
    dest: './source/assets/css'
  },
  organismStyles: {
    watch: [
      './source/assets/styles/**/*.scss',
      './source/_patterns/organisms/**/*.scss'],
    includePaths: ['./source/assets/styles/style-nano.scss'],
    base: './source/assets/styles',
    prefix: 'b-',
    src: './source/_patterns/organisms/**/*.scss',
    dest: './source/assets/css'
  },
  templateStyles: {
    watch: [
      './source/assets/styles/**/*.scss',
      './source/_patterns/templates/**/*.scss'],
    includePaths: ['./source/assets/styles/style-nano.scss'],
    base: './source/assets/styles',
    prefix: 'p-',
    src: './source/_patterns/templates/**/*.scss',
    dest: './source/assets/css'
  },
  pluginStyles: {
    watch: ['./source/plugins/optimizely-pl-enhancement/**/*.scss'],
    src: [
      './source/plugins/optimizely-pl-enhancement/**/*.scss'
    ],
    dest: './source/plugins/optimizely-pl-enhancement'
  },
  organismScripts: {
    watch: ['./source/assets/scripts/organisms/**/*.{js,ts}'],
    src: [
      './source/assets/scripts/organisms/**/*.{js,ts}'
    ],
    dest: './source/assets/js'
  },
  globalScripts: {
    watch: ['./source/assets/scripts/global/**/*.{js,ts}'],
    src: [
      './source/assets/scripts/global/**/*.{js,ts}'
    ],
    concat: "main.js",
    includedBabelFunctions: './source/assets/js/includedBabelFunctions.js',
    dest: './source/assets/js'
  },
  patternlabScripts: {
    watch: ['./source/assets/scripts/patternlab/**/*.{js,ts}'],
    src: [
      './source/assets/scripts/patternlab/**/*.{js,ts}'
    ],
    dest: './source/assets/js'
  },
  libScripts: {
    watch: ['./source/assets/vendors/**'],
    src: [
      './source/assets/vendors/**'
    ],
    copyOnly: true,
    base: './source/assets/',
    dest: './source/assets'
  },
  patternExports: {
    watch: ['./pattern_exports/**/*'],
    src: [
      './pattern_exports/**/*'
    ],
    copyOnly: true,
    base: './pattern_exports/',
    dest: './public/patterns'
  },
  pluginScripts: {
    watch: [
      './source/plugins/optimizely-pl-enhancement/**/*.{js,ts}',
      '!./source/plugins/optimizely-pl-enhancement/**/*.min.js',],
    src: [
      './source/plugins/optimizely-pl-enhancement/**/*.{js,ts}',
      '!./source/plugins/optimizely-pl-enhancement/**/*.min.js',
    ],
    suffix: ".min",
    includedBabelFunctions: './source/assets/js/includedBabelFunctions.js',
    dest: './source/plugins/optimizely-pl-enhancement'
  },
  cleanUp: {
    src: [
      "./source/assets/css/**/*",
      "!./source/assets/css",
      "./source/assets/js/**/*",
      "!./source/assets/js",
      "./pattern_exports/**/*",
      "!./pattern_exports",
      "!./pattern_exports/.keep",
      "./public/**/*",
      "!./public"
    ]
  },
  migrationScripts: {
    src: [
      "./migration-scripts/**/*.ts",
      "!./migration-scripts/**/*.d.ts"
    ],
    watch: [
      "./migration-scripts/**/*.ts",
      "!./migration-scripts/**/*.d.ts"
    ],
    dest: './migration-scripts'
  },
  inteFolders: {
    src: [
      destAssetsBasePath + "/css",
      destAssetsBasePath + "/fonts",
      destAssetsBasePath + "/images",
      destAssetsBasePath + "/js",
      destAssetsBasePath + "/vendors",
      destPatternsPath
    ]
  },
  inteAssets: {
    src: [
      './source/assets/css/**/*.*',
      './source/assets/fonts/**/*.*',
      './source/assets/images/**/*.*',
      './source/assets/js/**/*.*',
      './source/assets/vendors/**/*.*',
      "!./**/.keep"
    ],
    base: './source/assets',
    dest: destAssetsBasePath
  },
  inteMeta: {
    src: [
      './source/_meta/**/*.hbs',
      "!./**/.keep"
    ],
    base: './source/_meta',
    dest: destPatternsPath
  },
  intePatterns: {
    src: [
      './pattern_exports/**/*.html',
      "!./**/.keep"
    ],
    base: './pattern_exports/',
    dest: destPatternsPath
  },
  inteAtomStates: {
    src: [
      './source/_patterns/atoms/**/*.states.json',
    ],
    prefix: 'atoms-',
    flatten: true,
    dest: destPatternsPath
  },
  inteMoleculeStates: {
    src: [
      './source/_patterns/molecules/**/*.states.json',
    ],
    prefix: 'molecules-',
    flatten: true,
    dest: destPatternsPath
  },
  inteOrganismStates: {
    src: [
      './source/_patterns/organisms/**/*.states.json',
    ],
    prefix: 'organisms-',
    flatten: true,
    dest: destPatternsPath
  },
  inteTemplateStates: {
    src: [
      './source/_patterns/templates/**/*.states.json',
    ],
    prefix: 'templates-',
    flatten: true,
    dest: destPatternsPath
  },
  inteTime: {
    fileName: "pl-build-time.txt",
    dest: destAssetsBasePath
  },
  hashAssets: {
    src: [
      destAssetsBasePath + "/css/**/*.css",
      destAssetsBasePath + "/js/**/*.js",
      destAssetsBasePath + "/images/**/*.svg"
    ],
    base: destRootPath,
    dest: destAssetsBasePath
  },
  states: {
    watch: [
      './source/_patterns/**/*.states.json',
    ],
    src: [
      './source/_patterns/**/*.states.json',
    ],
    dest: './source/assets/states'
  }
};

export default paths;