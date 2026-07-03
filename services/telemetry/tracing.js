import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { logCollector } from './logCollector';

const LogCollectorExporter = {
  export(spans, resultCallback) {
    for (const span of spans) {
      logCollector.push({
        timestamp: new Date(Number(span.startTime[0]) * 1000 + span.startTime[1] / 1e6).toISOString(),
        traceId: span.spanContext().traceId,
        spanId: span.spanContext().spanId,
        operation: span.name,
        status: span.status?.code === 2 ? 'ERROR' : 'OK',
        duration_ms: Math.round(
          (span.endTime[0] - span.startTime[0]) * 1000 +
          (span.endTime[1] - span.startTime[1]) / 1e6
        ),
        attributes: span.attributes,
        events: span.events.map(e => ({
          name: e.name,
          time: new Date(Number(e.time[0]) * 1000 + e.time[1] / 1e6).toISOString(),
          attributes: e.attributes,
        })),
      });
    }
    resultCallback({ code: 0 });
  },
  shutdown() {
    return Promise.resolve();
  },
};

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'titan-dashboard',
  [ATTR_SERVICE_VERSION]: '1.0.0',
});

const provider = new WebTracerProvider({
  resource,
  spanProcessors: [
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
    new SimpleSpanProcessor(LogCollectorExporter),
  ],
});

provider.register();

export default provider;
