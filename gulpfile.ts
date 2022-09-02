import gulp, { TaskFunctionCallback as CallBack } from 'gulp';
import paths from './gulp/paths';
import scriptsFx from './gulp/scripts';
import stylesFx from './gulp/styles';
import { del, copy, writeInteTime as writeInteTimeUtil, hashAssets as hashAssetsUtil } from './gulp/util';
import buildState from './gulp/states';

/* ---------- BASE ----------- */
let shouldBuildSourceMaps = true;

const inteInit = (cb: CallBack) => {
  shouldBuildSourceMaps = true; // Enable for now
  cb();
}

const cleanUp = () => del(paths.cleanUp);

/* ----------- STYLES ----------- */
const allStyles = () => stylesFx(paths.allStyles, shouldBuildSourceMaps);
const baseStyles = () => stylesFx(paths.baseStyles, shouldBuildSourceMaps);
const plStyles = () => stylesFx(paths.plStyles, shouldBuildSourceMaps);
const organismStyles = () => stylesFx(paths.organismStyles, shouldBuildSourceMaps);
const templateStyles = () => stylesFx(paths.templateStyles, shouldBuildSourceMaps);
const pluginStyles = () => stylesFx(paths.pluginStyles, shouldBuildSourceMaps);

/* ---------- SCRIPTS ----------- */
export const globalScripts = () => scriptsFx(paths.globalScripts, shouldBuildSourceMaps);
const organismScripts = () => scriptsFx(paths.organismScripts, shouldBuildSourceMaps);
const patternlabScripts = () => scriptsFx(paths.patternlabScripts, shouldBuildSourceMaps);
const pluginScripts = () => scriptsFx(paths.pluginScripts, shouldBuildSourceMaps);
const libScripts = () => scriptsFx(paths.libScripts, shouldBuildSourceMaps);
const patternExports = () => scriptsFx(paths.patternExports, shouldBuildSourceMaps);

/* ---------- MIGRATIONS ---------- */
const migrationScripts = () => scriptsFx(paths.migrationScripts, shouldBuildSourceMaps);

/* ---------- STATE ---------- */
const buildStates = () => buildState(paths.states);

/* ---------- BUILD ---------- */
export const build = gulp.series(
  cleanUp,
  allStyles,
  pluginStyles,
  baseStyles,
  plStyles,
  organismStyles,
  templateStyles,
  pluginScripts,
  globalScripts,
  organismScripts,
  migrationScripts,
  patternlabScripts,
  libScripts,
  patternExports,
  buildStates);

/* ----------- WATCH ---------- */
export const watch = () => {
  gulp.watch(paths.allStyles.watch!, allStyles);
  gulp.watch(paths.baseStyles.watch!, baseStyles);
  gulp.watch(paths.plStyles.watch!, plStyles);
  gulp.watch(paths.organismStyles.watch!, organismStyles);
  gulp.watch(paths.templateStyles.watch!, templateStyles);
  gulp.watch(paths.globalScripts.watch!, globalScripts);
  gulp.watch(paths.organismScripts.watch!, organismScripts);
  gulp.watch(paths.patternlabScripts.watch!, patternlabScripts);
  gulp.watch(paths.migrationScripts.watch!, migrationScripts);
  gulp.watch(paths.libScripts.watch!, libScripts);
  gulp.watch(paths.patternExports.watch!, patternExports);
  gulp.watch(paths.states.watch!, buildStates);
}

/* ---------- SERVE ---------- */
export const serve = gulp.series(build, watch);

/* ---------- INTE ---------- */
const deleteInteFolders = () => del(paths.inteFolders);
const copyInteAssets = () => copy(paths.inteAssets);
const copyInteMeta = () => copy(paths.inteMeta);
const copyIntePatterns = () => copy(paths.intePatterns);
const copyInteAtomStates = () => copy(paths.inteAtomStates);
const copyInteMoleculeStates = () => copy(paths.inteMoleculeStates);
const copyInteOrganismStates = () => copy(paths.inteOrganismStates);
const copyInteTemplateStates = () => copy(paths.inteTemplateStates);
const writeInteTime = (cb: CallBack) => writeInteTimeUtil(paths.inteTime, cb);
export const hashAssets = () => hashAssetsUtil(paths.hashAssets);

export const buildInte = gulp.series(
  inteInit,
  cleanUp,
  deleteInteFolders,
  pluginStyles,
  allStyles,
  baseStyles,
  organismStyles,
  templateStyles,
  pluginScripts,
  globalScripts,
  organismScripts,
  libScripts);

export const copyInte = gulp.series(
  copyInteAssets,
  copyInteMeta,
  copyIntePatterns,
  copyInteAtomStates,
  copyInteMoleculeStates,
  copyInteOrganismStates,
  copyInteTemplateStates,
  writeInteTime,
  hashAssets);

const postbuildPlaceHolder = (cb: CallBack) => {
  console.log("Post-build called!");
  cb();
}

export const postbuild = gulp.series(
  postbuildPlaceHolder);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
export default build;