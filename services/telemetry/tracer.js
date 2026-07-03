import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('titan-dashboard', '1.0.0');

/**
 * Wraps an async operation in an OTel span.
 * Usage: const result = await traceOp('auth.login', { email }, async (span) => { ... });
 */
export async function traceOp(name, attributes, fn) {
  return tracer.startActiveSpan(name, async (span) => {
    try {
      if (attributes) span.setAttributes(attributes);
      const result = await fn(span);
      span.setStatus({ code: 1 }); // OK
      return result;
    } catch (err) {
      span.setStatus({ code: 2, message: err.message }); // ERROR
      span.recordException(err);
      throw err;
    } finally {
      span.end();
    }
  });
}

export { tracer };
