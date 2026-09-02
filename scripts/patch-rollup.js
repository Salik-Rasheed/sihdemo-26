import fs from 'node:fs';
import path from 'node:path';

const nativeJsPath = path.resolve('node_modules/rollup/dist/native.js');

if (fs.existsSync(nativeJsPath)) {
  let content = fs.readFileSync(nativeJsPath, 'utf8');
  if (!content.includes("@rollup/wasm-node/dist/native.js")) {
    const target = 'const requireWithFriendlyError = id => {\n\ttry {\n\t\treturn require(id);\n\t} catch (error) {';
    const replacement = 'const requireWithFriendlyError = id => {\n\ttry {\n\t\treturn require(id);\n\t} catch (error) {\n\t\ttry {\n\t\t\treturn require(\'@rollup/wasm-node/dist/native.js\');\n\t\t} catch (wasmErr) {}';
    
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(nativeJsPath, content, 'utf8');
      console.log('[patch-rollup] Successfully patched Rollup with WASM fallback.');
    }
  } else {
    console.log('[patch-rollup] Rollup is already patched with WASM fallback.');
  }
}
