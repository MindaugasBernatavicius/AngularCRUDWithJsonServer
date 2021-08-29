import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [
    '.footer {\n' +
    '  position: fixed;\n' +
    '  bottom: 0;\n' +
    '  width: 100%;\n' +
    '  /* Set the fixed height of the footer here */\n' +
    '  height: 60px;\n' +
    '  line-height: 60px; /* Vertically center the text there */\n' +
    '  background-color: #f5f5f5;\n' +
    '}'
  ],
  template: `
   <footer class="footer">
     <div class="container">
       <span class="text-muted">Place sticky footer content here.</span>
     </div>
   </footer>`
})

export class FooterComponent {}
