import { trace } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node';

const serviceName = process.env.OTEL_SERVICE_NAME || 'Levelify';

if (!process.env.OTEL_SERVICE_NAME) {
	console.warn(
		'⚠️ OTEL_SERVICE_NAME não definida — usando fallback:',
		serviceName,
	);
}

const sdk = new NodeSDK({
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.on('SIGTERM', () => {
	sdk.shutdown().then(() => console.log('[otel] SDK shutdown'));
});

// Exporta um tracer que você pode usar nos controllers se quiser
export const tracer = trace.getTracer(serviceName);
('');
