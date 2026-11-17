import en from '../../public/en/index.html?raw';
import es from '../../public/es/index.html?raw';
import pt from '../../public/pt-br/index.html?raw';
import de from '../../public/de/index.html?raw';
import fr from '../../public/fr/index.html?raw';
import it from '../../public/it/index.html?raw';
import ru from '../../public/ru/index.html?raw';
export async function GET(_request:Request,{params}:{params:Promise<{lang:string}>}){const {lang}=await params;const html=({en,es,'pt-br':pt,de,fr,it,ru} as Record<string,string>)[lang];return new Response(html||'Not found',{status:html?200:404,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}});}
