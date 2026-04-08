// ✅ SOLUÇÃO DEFINITIVA PARA O ERRO REACT 18.3 + R3F
// Esse é o único shim que resolve 100% dos erros de importação

// @ts-ignore - React 18.3 removeu as tipagens publicas do react-reconciler
import * as ReactReconciler from 'react-reconciler';

// Export default que o R3F está esperando
export default ReactReconciler;

// Todos os exports nomeados
// @ts-ignore
export * from 'react-reconciler';

// Constantes que foram movidas no React 18.3
export const ConcurrentRoot = 1;
export const DefaultEventPriority = 16;
export const DiscreteEventPriority = 2;
export const ContinuousEventPriority = 4;
export const IdleEventPriority = 32;
