type MetaTagInjectorInput = {
  content: string;
  title: string;
  image: string;
};

class MetaTagInjector {
  private input: MetaTagInjectorInput;
  
  constructor(
    input: MetaTagInjectorInput
  ) {
    this.input = input;
  }
  
  escapeString(s: string) {
    const lookup = {
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
      "<": "&lt;",
      ">": "&gt;",
    };
    return s.replace(/[&"'<>]/g, (c) => lookup[c]);
  }
  
  element(element) {
    element.append(`<meta property="og:title" content="${this.escapeString(this.input.title)}"/>`, {
      html: true,
    });
    element.append(`<meta property="og:image" content="${this.escapeString(this.input.image)}"/>`, {
      html: true,
    });
  }
}

export const onRequest: PagesFunction<{}> = async ({
  request,
  env,
  next,
}) => {
  const url = new URL(request.url);
  if(url.pathname.startsWith("/posts/")) {
    const data = await fetch("https://indonesia-server-production.up.railway.app"+url.pathname.slice(0, url.pathname.length-1)).then((res) => res.json());
    return new HTMLRewriter()
      .on("head", new MetaTagInjector(data))
      .transform(await next());
  } 
  return next();
};