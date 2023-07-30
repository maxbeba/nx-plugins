import { readJson, Tree, updateJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {InitGeneratorSchema} from './schema';

import generator from './generator';
import {SUPABASE_PACKAGE_NAME, SUPABASE_PACKAGE_VERSION} from './config';

describe('init generator', () => {
  let appTree: Tree;
  const options: InitGeneratorSchema = {};

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should add dependency if missing', async () => {
    await generator(appTree, options);
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson.devDependencies[SUPABASE_PACKAGE_NAME]).toBe(SUPABASE_PACKAGE_VERSION);
  });

  it('should update dependency if existing', async () => {
    updateJson(appTree, 'package.json', (json) => {
      json.devDependencies[SUPABASE_PACKAGE_NAME] = '^1.0.0';
      return json;
    });
    await generator(appTree, options);
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson.devDependencies[SUPABASE_PACKAGE_NAME]).toBe(SUPABASE_PACKAGE_VERSION);
  });

  it('should not change dep version if skip option is turned on', async () => {
    updateJson(appTree, 'package.json', (json) => {
      json.devDependencies[SUPABASE_PACKAGE_NAME] = '^1.0.0';
      return json;
    });
    const options: InitGeneratorSchema = { skipPackageJson: true };
    await generator(appTree, options);
    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson.devDependencies[SUPABASE_PACKAGE_NAME]).toBe('^1.0.0');
  });
});
