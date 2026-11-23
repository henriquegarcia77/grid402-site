// Um endereço só (SEO): www e grid402-site.pages.dev redirecionam 301 para o domínio principal
const PRINCIPAL = 'grid402performance.com.br';
const REDIRECIONAR = ['www.grid402performance.com.br', 'grid402-site.pages.dev'];
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (REDIRECIONAR.includes(url.hostname)) {
    url.hostname = PRINCIPAL;
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
