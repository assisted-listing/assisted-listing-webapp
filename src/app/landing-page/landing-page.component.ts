import { Component, HostListener, ElementRef, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Parallax effect for the background image
    const landing = this.el.nativeElement.querySelector('.landing');
    const scrollPosition = window.scrollY;
    landing.style.backgroundPositionY = `${scrollPosition * 0.4}px`;

    // Fading in and out for the fact cards
    const cards = this.el.nativeElement.querySelectorAll('.fact-card');
    cards.forEach((card: any) => {
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY || window.pageYOffset;

      if (rect.top <= windowHeight * 0.9 && rect.bottom >= 0) {
        this.renderer.addClass(card, 'fade-in');
        this.renderer.removeClass(card, 'fade-out');
      } else {
        this.renderer.addClass(card, 'fade-out');
        this.renderer.removeClass(card, 'fade-in');
      }
    });
  }
}