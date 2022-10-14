import { execSync } from 'child_process';

execSync('vite build --outDir dist/server --ssr client/entry-server.ts', {
  stdio: 'inherit',
});
//execSync('move .\\index.html .\\client', { stdio: 'inherit' });
