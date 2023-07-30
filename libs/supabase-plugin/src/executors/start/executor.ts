import { StartExecutorSchema } from './schema';
import runCommands, {
  RunCommandsOptions,
} from 'nx/src/executors/run-commands/run-commands.impl';
import { ExecutorContext } from 'nx/src/config/misc-interfaces';

export default async function runExecutor(
  options: StartExecutorSchema,
  context: ExecutorContext
) {
  const runCommandsOptions: RunCommandsOptions = {
    cwd: 'apps/supabase',
    command: `npx supabase start`,
    __unparsed__: [],
    readyWhen: options.printStatus ? 'service_role key' : 'local',
  };

  return await runCommands(runCommandsOptions, context);
}
