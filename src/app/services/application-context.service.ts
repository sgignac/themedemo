import { IapplicationContext } from './../interfaces/iapplication-context';
import { Injectable } from '@angular/core';

declare var document: any;

@Injectable()
export class ApplicationContextService {

    /**
       * Theme setup
       */
    private themes: any = {
        theme1: { loaded: false, src: 'themes/theme1.bundle.js' },
        theme2: { loaded: false, src: 'themes/theme2.bundle.js' },
        theme3: { loaded: false, src: 'themes/theme3.bundle.js' }
    }

    constructor() { }

    /**
     * Getter and setter for the appContext
     */
    private _appContext: IapplicationContext;
    get appContext(): IapplicationContext {
        return this._appContext
    }
    set appContext(ctx: IapplicationContext) {
        this._appContext = ctx;
    }


    /**
    * Initialize the context at bootstrap
    * returning a Promise is mandatory for APP_INITIALIZER
    */
    initContext(): Promise<any> {
        console.log('init_context');
        return new Promise((resolve, reject) => {
            this.appContext = {
                language : 'fr',
                theme: this.getTheme()
            }
            this.loadTheme();
            resolve();
        });
    }

    /**
    * Get the theme parameters
    */
    getTheme(): string {
        let params: string[] = window.location.pathname.split("/");
        let theme = typeof (params[1]) === "string" ? params[1].toLowerCase() : '';

        if (!!this.themes[theme] === false) {
            theme = Object.keys(this.themes)[0];
        }
        return theme
    }


    /**
     * This function lazy-load scripts in the page
     * @param name Name of the script
     */
    loadTheme() {
        let name: string = this.appContext.theme;
        return new Promise((resolve, reject) => {
            //resolve if already loaded
            if (this.themes[name].loaded) {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            }
            else {
                //load script
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.themes[name].src;
                if (script.readyState) {  //IE
                    script.onreadystatechange = () => {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            this.themes[name].loaded = true;
                            resolve({ script: name, loaded: true, status: 'Loaded' });
                        }
                    };
                } else {  //Others
                    script.onload = () => {
                        this.themes[name].loaded = true;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    };
                }
                script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        });
    }


}
