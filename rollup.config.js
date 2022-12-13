import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

export default {
    input: 'src/index.ts',
    plugins: [resolve(), commonjs(), typescript()],
    external: ['prettier', 'svelte'],
    output: {
        file: 'plugin.js',
        format: 'cjs',
        inlineDynamicImports: true,
        sourcemap: true,
    },
};
