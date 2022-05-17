import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'domSecurity'
})
export class DomSecurityPipe implements PipeTransform {
  url = 'https://open.spotify.com/embed?uri=';

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: string): any {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.url + value);
  }

}
