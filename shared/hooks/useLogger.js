import { useCallback } from "react";
import Logger from "../../services/logger/Logger";

/**
 * Hook that returns scoped logging helpers for a component.
 * Usage: const log = useLogger('LoginPage');
 *        log.click('submit-btn');
 *        log.info('form validated');
 */
export function useLogger(component) {
  const click = useCallback(
    (target, meta) =>
      Logger.interaction({ action: "click", target, component, meta }),
    [component],
  );

  const change = useCallback(
    (target, meta) =>
      Logger.interaction({ action: "change", target, component, meta }),
    [component],
  );

  const submit = useCallback(
    (target, meta) =>
      Logger.interaction({ action: "submit", target, component, meta }),
    [component],
  );

  const info = useCallback(
    (...args) => Logger.info(component, ...args),
    [component],
  );

  const warn = useCallback(
    (...args) => Logger.warn(component, ...args),
    [component],
  );

  const error = useCallback(
    (...args) => Logger.error(component, ...args),
    [component],
  );

  const debug = useCallback(
    (...args) => Logger.debug(component, ...args),
    [component],
  );

  return { click, change, submit, info, warn, error, debug };
}
