import { StopExecutorSchema } from './schema';
import runCommands, {
  RunCommandsOptions,
} from 'nx/src/executors/run-commands/run-commands.impl';
import { ExecutorContext } from 'nx/src/config/misc-interfaces';

export default async function runExecutor(
  options: StopExecutorSchema,
  context: ExecutorContext
) {
  const runCommandsOptions: RunCommandsOptions = {
    cwd: 'apps/supabase',
    command: `npx supabase stop`,
    __unparsed__: [],
    readyWhen: 'Stopped supabase local development setup.',
  };

  return await runCommands(runCommandsOptions, context);
}
