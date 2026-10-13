import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

const page=readFileSync(new URL('./figma-recorder.html',import.meta.url));

export function handleRecorderRequest(request,response){
 if(request.headers.host!=='127.0.0.1:4393'&&request.headers.host!=='localhost:4393'){response.writeHead(403);response.end('Local access only');return}
 if(!['GET','HEAD'].includes(request.method)){response.writeHead(405,{Allow:'GET, HEAD'});response.end();return}
 if(request.url!=='/'&&request.url!=='/index.html'){response.writeHead(404);response.end('Not found');return}
 response.writeHead(200,{
  'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer',
  'Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; media-src blob:; connect-src 'none'; frame-ancestors 'none'",
  'Permissions-Policy':'microphone=(), camera=(), display-capture=(self)'
 });
 response.end(request.method==='HEAD'?undefined:page);
}

// Importing the handler for tests must not bind the live recording port.
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const server=createServer(handleRecorderRequest);
 server.listen(4393,'127.0.0.1',()=>console.log('Native recorder: http://127.0.0.1:4393 · PID '+process.pid));
 for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
}
