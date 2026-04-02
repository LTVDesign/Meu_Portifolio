// Declarações de tipo para módulos Three.js examples
// Como o Three.js não inclui tipos para os exemplos, declaramos módulos de qualquer

declare module 'three/examples/jsm/controls/OrbitControls' {
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    export { OrbitControls };
    export default OrbitControls;
}

declare module 'three/examples/jsm/postprocessing/EffectComposer' {
    import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
    export { EffectComposer };
    export default EffectComposer;
}

declare module 'three/examples/jsm/postprocessing/RenderPass' {
    import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
    export { RenderPass };
    export default RenderPass;
}

declare module 'three/examples/jsm/postprocessing/UnrealBloomPass' {
    import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
    export { UnrealBloomPass };
    export default UnrealBloomPass;
}
