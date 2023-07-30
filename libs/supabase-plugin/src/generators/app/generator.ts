import {
  addProjectConfiguration,
  formatFiles,
  logger,
  Tree,
  workspaceRoot,
} from '@nx/devkit';
import { AppGeneratorSchema } from './schema';
import { execSync } from 'child_process';

export async function appGenerator(tree: Tree, options: AppGeneratorSchema) {
  const projectRoot = `apps/supabase`;

  const command = `npx supabase init --workdir apps --with-vscode-workspace=false`;
  execSync(command, {
    cwd: workspaceRoot,
  });

  logger.info('Created supabase app using cli.');

  generateProjectConfiguration(tree, 'supabase', projectRoot);

  await formatFiles(tree);
}

function generateProjectConfiguration(
  tree: Tree,
  name: string,
  projectRoot: string
) {
  addProjectConfiguration(tree, name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}`,
    targets: {
      start: {
        executor: '@nx-plugins/supabase-plugin:start',
      },
      'start-silent': {
        executor: '@nx-plugins/supabase-plugin:start',
        options: {
          printStatus: false,
        },
      },
      stop: {
        executor: '@nx-plugins/supabase-plugin:stop',
      },
      status: {
        executor: '@nx-plugins/supabase-plugin:status',
      },
    },
  });
}

export default appGenerator;
