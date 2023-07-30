import { StatusExecutorSchema } from './schema';
import runCommands, {
  RunCommandsOptions,
} from 'nx/src/executors/run-commands/run-commands.impl';
import { ExecutorContext } from 'nx/src/config/misc-interfaces';

export default async function runExecutor(
  options: StatusExecutorSchema,
  context: ExecutorContext
) {
  const runCommandsOptions: RunCommandsOptions = {
    cwd: 'apps/supabase',
    command: `npx supabase status`,
    __unparsed__: [],
  };

  return await runCommands(runCommandsOptions, context);
}
