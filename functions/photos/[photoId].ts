type MetaTagInjectorInput = {
    title: string;
    thumbnailUrl: string;
  };
  
  class MetaTagInjector {
    private input: MetaTagInjectorInput;
    
    constructor(
      input: MetaTagInjectorInput
    ) {
      this.input = input;
    }
    
    element(element) {
      element.append(`<meta property="og:title" content="${this.input.title}"/>`, {
        html: true,
      });
      element.append(`<meta property="og:image" content="${this.input.thumbnailUrl}"/>`, {
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
    if(url.pathname.startsWith("/photos/")) {
      const data = await fetch("https://jsonplaceholder.typicode.com"+url.pathname).then((res) => res.json());
      console.log(data.title);
      return new HTMLRewriter()
        .on("head", new MetaTagInjector(data))
        .transform(await next());
    } 
    return next();
  };