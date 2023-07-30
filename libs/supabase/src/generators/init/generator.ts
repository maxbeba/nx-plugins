import { logger, Tree, updateJson } from '@nx/devkit';
import { InitGeneratorSchema } from './schema';

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  if (!options.skipPackageJson) {
    updateDependencies(tree);
  } else {
    logger.info('Skipped dependency installation.');
  }
}

function updateDependencies(tree: Tree) {
  updateJson(tree, 'package.json', (json) => {
    if (!json.devDependencies) {
      json.devDependencies = {};
    }
    json.devDependencies['supabase'] = '^1.82.2';
    return json;
  });
}

export default initGenerator;
